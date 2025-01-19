"use client";
import { useEffect, useRef, useState } from "react";
import { Client, RemoteStream } from "ion-sdk-js";
import { IonSFUJSONRPCSignal } from "ion-sdk-js/lib/signal/json-rpc-impl";
import { v4 as uuidv4 } from "uuid";
import { Configuration } from "ion-sdk-js/lib/client";

export default function View() {
  const NEXT_PUBLIC_SFU_WS_URL = "wss://adityaadiraju.com:7000/ws";
  // const NEXT_PUBLIC_SFU_WS_URL = "ws://localhost:7000/ws";
  const audioRef = useRef<HTMLAudioElement>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const dataChannelRef = useRef<RTCDataChannel | null>(null);

  useEffect(() => {
    const startViewing = async () => {
      const config = {
        iceServers: [
          {
            urls: "stun:stun.l.google.com:19302",
          },
        ],
      };
      const signal = new IonSFUJSONRPCSignal(NEXT_PUBLIC_SFU_WS_URL);
      const client = new Client(signal, config as Configuration);
      signal.onopen = () => client.join("ion", uuidv4());

      client.ondatachannel = (channelEvent) => {
        channelEvent.channel.onmessage = (event) => {
          setMessages((prev) => [...prev, event.data]);
        };
        dataChannelRef.current = channelEvent.channel;

        channelEvent.channel.onopen = () => console.log("Data channel open");
        channelEvent.channel.onclose = () => console.log("Data channel closed");
      };

      client.ontrack = (track: MediaStreamTrack, stream: RemoteStream) => {
        if (audioRef.current) {
          audioRef.current.srcObject = stream;
          audioRef.current.autoplay = true;
          audioRef.current.muted = false;
        }
      };
    };

    startViewing();
  }, []);

  const sendMessage = () => {
    if (dataChannelRef.current && message.trim()) {
      dataChannelRef.current.send(`chatter: ${message}`);
      setMessages((prev) => [...prev, `You: ${message}`]);
      setMessage("");
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md w-80">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Audio Player
        </h2>
        <audio ref={audioRef} muted={false} />
        <button
          className={`mt-4 px-4 py-2 rounded-full text-white transition bg-green-500 hover:bg-green-600`}
        >
          {"play"}
        </button>
      </div>

      <div>
        <div>
          <h1>chat</h1>
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
      </div>
    </div>
  );
}
