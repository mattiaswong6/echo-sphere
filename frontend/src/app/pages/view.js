import { useEffect } from "react";
import { IonSFUJSONRPCSignal, Client } from "@ion/sdk";

const View = () => {
  useEffect(() => {
    const startViewing = async () => {
      const signal = new IonSFUJSONRPCSignal(process.env.NEXT_PUBLIC_SFU_WS_URL);
      const client = new Client(signal);

      signal.onopen = () => {
        client.ontrack = (track, stream) => {
          const videoElement = document.createElement("video");
          videoElement.srcObject = stream;
          videoElement.autoplay = true;
          videoElement.style.width = "100%";
          document.body.appendChild(videoElement);
        };

        client.subscribe();
      };
    };

    startViewing();
  }, []);

  return (
    <div>
      <h1>Viewer</h1>
      {/* The video elements will be appended dynamically */}
    </div>
  );
};

export default View;
