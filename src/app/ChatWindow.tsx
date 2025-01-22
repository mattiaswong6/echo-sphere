import React, { Dispatch, SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";

type Message = {
  text: string;
  sender: string;
  color: string
};
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


export default function ChatWindow({
  messages = [],
  userMessage,
  setMessages,
  setUserMessage,
  dataChannelRef,
  username = "streamer",
}: {
  messages: Message[];
  userMessage: string;
  setMessages: Dispatch<SetStateAction<Message[]>>;
  setUserMessage: Dispatch<SetStateAction<string>>;
  dataChannelRef: any;
  username?: string;
}) {
  const sendMessage = () => {
    if (dataChannelRef.current && userMessage.trim()) {
      const msg = { text: userMessage, sender: username, color: getRandomColor().toLowerCase() };
      dataChannelRef.current.send(JSON.stringify(msg));
      setMessages((prev) => [...prev, msg]);
      setUserMessage("");
    }
  };

  const handleInputChange = (event) => {
    setUserMessage(event.target.value);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };
  return (
    <div>
      <div className="border-white border-2 border-r-4 min-h-96 max-w-56 rounded-2xl">
        {messages.map((message) => (
          <p key={uuidv4()}>
            <strong className={`text-[${message.color}] !important`} style={{color: message.color}}>{message.sender}:</strong> {message.text}
          </p>
        ))}
      </div>
      <br/>
      <input
        className="text-slate-600 max-w-56 rounded-2xl"
        type="text"
        value={userMessage}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
