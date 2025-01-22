"use client";
import { useEffect, useRef, useState } from "react";
import { IonSFUJSONRPCSignal } from "ion-sdk-js/lib/signal/json-rpc-impl";
import { v4 as uuidv4 } from "uuid";
import { Configuration } from "ion-sdk-js/lib/client";
import ChatWindow from "../ChatWindow";
import StreamCard from "../StreamCard";

import { Constraints } from "ion-sdk-js";

type Message = {
  text: string;
  sender: string;
  color: string;
};

export default function Broadcast({ name = "streamer" }: { name: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const NEXT_PUBLIC_SFU_WS_URL = "wss://adityaadiraju.com:7000/ws";
  // const NEXT_PUBLIC_SFU_WS_URL = "ws://localhost:7000/ws";

  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");

  const dataChannelRef = useRef<RTCDataChannel | null>(null);
  useEffect(() => {
    async function audioHelper() {
      const LocalStream = await import("ion-sdk-js").then((module) => module.LocalStream);
      const Client = await import("ion-sdk-js").then((module) => module.Client);
      const config = {
        iceServers: [
          {
            urls: "stun:stun.l.google.com:19302",
          },
        ],
      };
      const signal = new IonSFUJSONRPCSignal(NEXT_PUBLIC_SFU_WS_URL);
      const client = new Client(signal, config as Configuration);
      signal.onopen = async () => {
        client.join("ion", uuidv4());

        const dataChannel = client.createDataChannel("chat");
        dataChannelRef.current = dataChannel;

        dataChannel.onmessage = (event) => {
          const msg = JSON.parse(event.data);
          setMessages((prev) => [...prev, msg]);
        };

        dataChannel.onopen = () => console.log("Data channel open");
        dataChannel.onclose = () => console.log("Data channel closed");

        const local = LocalStream.getUserMedia({
          audio: true,
          video: false,
          simulcast: true,
        } as Constraints);

        if (audioRef.current) {
          audioRef.current.srcObject = await local;
          audioRef.current.muted = true;
        }
        client.publish(await local);
      };
    }

    audioHelper();
    return () => {
      // Clean up data channel and resources on component unmount
      if (dataChannelRef.current) {
        dataChannelRef.current.close();
      }
    };
  }, []);

  return (
    <div className="flex flex-row space-x-20 items-center">
      <div className="flex flex-col items-center justify-center p-4 rounded-lg shadow-md w-80">
        <StreamCard
          streamCover="user-assets/hand-reach.jpg"
          streamName="Mind Matters (ep. 21)"
          streamCreator="MindMattersPod"
          streamPfp="user-assets/colourful.jpg"
          streamTags={["mental-health", "education"]}
        />
        <audio ref={audioRef} muted={true} />
      </div>
      <ChatWindow
        messages={messages ? messages : []}
        userMessage={message}
        setMessages={setMessages}
        setUserMessage={setMessage}
        username={name}
        dataChannelRef={dataChannelRef}
      />
    </div>
  );
}
