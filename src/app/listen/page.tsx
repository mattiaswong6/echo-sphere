"use client";
import { useEffect, useRef } from "react";
import { Client, RemoteStream } from "ion-sdk-js";
import { IonSFUJSONRPCSignal } from "ion-sdk-js/lib/signal/json-rpc-impl";

export default function View() {
  if (typeof window === "undefined") return; // Ensure code only runs on the client
  // const NEXT_PUBLIC_SFU_WS_URL = "wss://adityaadiraju.com:7000/ws";
  const NEXT_PUBLIC_SFU_WS_URL = "ws://localhost:7000/ws";
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const startViewing = async () => {
      const signal = new IonSFUJSONRPCSignal(NEXT_PUBLIC_SFU_WS_URL);
      const client = new Client(signal);
      signal.onopen = () => client.join("ion", "another uid");

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

return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md w-80">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Audio Player
      </h2>
      <audio ref={audioRef} muted={false}/>
      <button
        className={`mt-4 px-4 py-2 rounded-full text-white transition bg-green-500 hover:bg-green-600`}>
          {"play"}
      </button>
    </div>
  );
}