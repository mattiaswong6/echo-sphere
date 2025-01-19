"use client"
import React, { useEffect, useRef, useState } from 'react';
import { initIonClient, getClient } from '../../../lib/ion';
import {v4 as uuidv4} from 'uuid';

interface Message {
  sender: string;
  content: string;
}

const Chatroom: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const dataChannelRef = useRef<RTCDataChannel | null>(null);

  useEffect(() => {
    const client = initIonClient('ws://localhost:7000/ws');

    client.join('chatroom', uuidv4())

    const dataChannel = client.createDataChannel('chat');
    dataChannelRef.current = dataChannel;

    dataChannel.onmessage = (event) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'Peer', content: event.data },
      ]);
    };

    dataChannel.onopen = () => console.log('Data channel open');
    dataChannel.onclose = () => console.log('Data channel closed');

    return () => {
      client.close();
    };
  }, []);

  const sendMessage = () => {
    if (dataChannelRef.current && message.trim()) {
      dataChannelRef.current.send(message);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'You', content: message },
      ]);
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Chatroom</h1>
      <div
        style={{
          height: '300px',
          overflowY: 'scroll',
          border: '1px solid #ccc',
          marginBottom: '10px',
          padding: '10px',
        }}
      >
        {messages.map((msg, idx) => (
          <div key={idx}>
            <strong>{msg.sender}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
        style={{ width: 'calc(100% - 60px)', marginRight: '10px' }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chatroom;
