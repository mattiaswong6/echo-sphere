"use client";
import { useEffect, useRef, useState } from "react";
import { IonSFUJSONRPCSignal } from "ion-sdk-js/lib/signal/json-rpc-impl";
import { v4 as uuidv4 } from "uuid";
import { Configuration } from "ion-sdk-js/lib/client";
import ChatWindow from "../ChatWindow";
import StreamCard from "../StreamCard";

type Stream = {
  streamCover: string;
  streamName: string;
  streamCreator: string;
  streamPfp: string;
  streamTags: string[];
}

const streams: Stream[] = [{
  streamCover: "../../user-assets/hand-reach.jpg",
  streamName: "Mind Matters (ep. 21)",
  streamCreator: "MindMattersPod",
  streamPfp: "../../user-assets/colourful.jpg",
  streamTags: ["mental-health", "education"]
},

{
  streamCover: "../../user-assets/ubc-cube.jpg",
  streamName: "CPSC 213 Week 3 Discussion",
  streamCreator: "BrainiacWalter",
  streamPfp: "../../user-assets/default-profile.svg",
  streamTags: ["education", "ubc", "popular"]
},
{
  streamCover: "../../user-assets/soul-artist.jpg",
  streamName: "new mix 01/18",
  streamCreator: "novaskye",
  streamPfp: "../../user-assets/record.jpg",
  streamTags: ["music", "r&b", "poc-artist"]
},
{
  streamCover: "../../user-assets/religious.jpg",
  streamName: "religious existentialism",
  streamCreator: "EverythingEverywheretv",
  streamPfp: "../../user-assets/prayer.jpg",
  streamTags: ["religion", "podcast", "spiritual"]
},
{
  streamCover: "../../user-assets/balatro.jpg",
  streamName: "GAME REVIEW #20: Balatro",
  streamCreator: "danTDM",
  streamPfp: "../../user-assets/danTDM.jpeg",
  streamTags: ["gaming", "podcast", "popular"]
},
{
    streamCover: "../../user-assets/shroom-astronaught.jpg",
    streamName: "psychedelic rap",
    streamCreator: "yungchickenwing",
    streamPfp: "../../user-assets/chicken.jpg",
    streamTags: ["music", "new-artist"]
  }];

export default function Listen({ name = "listener", streamId}: { name?: string, streamId: string }) {
  // wss server
  const NEXT_PUBLIC_SFU_WS_URL = process.env.WS_SFU_SERVER

  const audioRef = useRef<HTMLAudioElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const dataChannelRef = useRef<RTCDataChannel | null>(null);

  useEffect(() => {
    const startViewing = async () => {
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
      signal.onopen = () => client.join("ion" + streamId, uuidv4());

      client.ondatachannel = (channelEvent) => {
        channelEvent.channel.onmessage = (event) => {
          setMessages((prev) => [...prev, JSON.parse(event.data)]);
        };
        dataChannelRef.current = channelEvent.channel;

        channelEvent.channel.onopen = () => console.log("Data channel open");
        channelEvent.channel.onclose = () => console.log("Data channel closed");
      };

      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      client.ontrack = (track: any, stream: any) => {
        if (audioRef.current) {
          audioRef.current.srcObject = stream;
          audioRef.current.autoplay = true;
          audioRef.current.muted = false;
        }
      };
    };

    startViewing();
  }, []);



  let stream = streams.find((e) => e.streamCreator === streamId);
  stream = stream ? stream : streams[0] 
  return (
    <div className="flex flex-row space-x-20 items-center">
      <div className="flex flex-col items-center justify-center p-4 rounded-lg shadow-md w-80">
        <StreamCard
          streamName={stream.streamName}
          streamCover={stream.streamCover}
          streamCreator={stream.streamCreator}
          streamPfp={stream.streamPfp}
          streamTags={stream.streamTags}
        />
        <audio ref={audioRef} muted={false} />
      </div>
      <ChatWindow
        messages={messages}
        userMessage={message}
        setMessages={setMessages}
        setUserMessage={setMessage}
        username={name}
        dataChannelRef={dataChannelRef}
      />
    </div>
  );
}
