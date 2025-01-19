"use client";
import React, { useEffect, useRef, useState } from "react";
import { initIonClient } from "../../../lib/ion";
import { v4 as uuidv4 } from "uuid";
import { IonSFUJSONRPCSignal } from "ion-sdk-js/lib/signal/json-rpc-impl";
import { Client } from "ion-sdk-js";
import { Configuration } from "ion-sdk-js/lib/client";

const Chatroom: React.FC = () => {
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const dataChannelRef = useRef<RTCDataChannel | null>(null);
  //  const NEXT_PUBLIC_SFU_WS_URL = "wss://adityaadiraju.com:7000/ws";
  const NEXT_PUBLIC_SFU_WS_URL = "ws://localhost:7000/ws";

  useEffect(() => {
    if (joined) {
      const config = {
        iceServers: [
          {
            urls: "stun:stun.l.google.com:19302",
          },
        ],
      };
      const signal = new IonSFUJSONRPCSignal(NEXT_PUBLIC_SFU_WS_URL);
      const client = new Client(signal, config as Configuration);
      signal.onopen = () => {
        client.join(room, uuidv4());

        const dataChannel = client.createDataChannel("chat");
        dataChannelRef.current = dataChannel;

        dataChannel.onmessage = (event) => {
          setMessages((prev) => [...prev, event.data]);
        };

        dataChannel.onopen = () => console.log("Data channel open");
        dataChannel.onclose = () => console.log("Data channel closed");
      };
      return () => {
        client.close();
      };
    }
  }, [joined]);

  const joinRoom = () => {
    if (room.trim()) {
      setJoined(true);
    }
  };

  const sendMessage = () => {
    if (dataChannelRef.current && message.trim()) {
      dataChannelRef.current.send(`chatter: ${message}`);
      setMessages((prev) => [...prev, `You: ${message}`]);
      setMessage("");
    }
  };

  return (
    <div>
      {!joined ? (
        <div>
          <h1>Join a Chatroom</h1>
          <input
            type="text"
            placeholder="Room name"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={joinRoom}>Join</button>
        </div>
      ) : (
        <div>
          <h1>Room: {room}</h1>
          <div
            style={{
              height: "300px",
              overflowY: "scroll",
              border: "1px solid #ccc",
              marginBottom: "10px",
              padding: "10px",
            }}
          >
            {messages.map((msg, idx) => (
              <div key={idx}>{msg}</div>
            ))}
          </div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            style={{ width: "calc(100% - 60px)", marginRight: "10px" }}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      )}
    </div>
  );
};

export default Chatroom;
