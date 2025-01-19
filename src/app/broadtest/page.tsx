"use client";
import { useEffect, useRef } from "react";
import { Client, Constraints, LocalStream} from "ion-sdk-js";
import { IonSFUJSONRPCSignal } from "ion-sdk-js/lib/signal/json-rpc-impl";

export default function Broadcast() {
  const audioRef = useRef<HTMLAudioElement>(null);
  //  const NEXT_PUBLIC_SFU_WS_URL = "wss://adityaadiraju.com:7000/ws";
  const NEXT_PUBLIC_SFU_WS_URL = "ws://localhost:7000/ws";

  useEffect(() => {

    async function helper() {
      const signal = new IonSFUJSONRPCSignal(NEXT_PUBLIC_SFU_WS_URL);
      const client = new Client(signal);
      signal.onopen = () => client.join("ion", "random uid");

      const local = await LocalStream.getUserMedia({
        audio: true,
        video: false,
        simulcast: true,
      } as Constraints);

      if (audioRef.current) {
        audioRef.current.srcObject = local;
        audioRef.current.muted = true;
      }
      client.publish(local);
    }

    helper();
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
