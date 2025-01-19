import { useEffect, useRef } from "react";
import { IonSFUJSONRPCSignal, Client } from "@ion/sdk";

const Broadcast = () => {
  const audioRef = useRef(null);
  const clientRef = useRef(null);

  useEffect(() => {
    const startBroadcast = async () => {
      const signal = new IonSFUJSONRPCSignal(process.env.NEXT_PUBLIC_SFU_WS_URL);
      const client = new Client(signal);

      signal.onopen = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: false,
            audio: true,
          });

          if (audioRef.current) {
            audioRef.current.srcObject = stream;
            audioRef.current.autoplay = true;
            audioRef.current.muted = true;
          }

          await client.publish(stream);
          console.log("Broadcast started.");
        } catch (error) {
          console.error("Error starting broadcast:", error);
        }
      };

      clientRef.current = client;
    };

    startBroadcast();

    // Cleanup on component unmount
    return () => {
      if (clientRef.current) {
        clientRef.current.close();
      }
    };
  }, []);

  return (
    <div>
      <h1>Broadcaster</h1>
      <audio ref={audioRef} style={{ width: "100%", maxHeight: "500px" }}></audio>
    </div>
  );
};

export default Broadcast;
