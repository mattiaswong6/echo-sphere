import Header from "./components/Header";
import StreamCard from "./components/StreamCard";

export default function Home() {
  return (
    <div>
      <Header/>
      <main>
        <StreamCard
          streamName="Jazzy Pop"
          streamCreator="Bobby Jr"
          streamPfp="globe.svg"
          streamCover="shroom-astronaught.jpg"
          streamTags={["music", "lgbtq", "podcast", "music"]}
        />
      </main>
      <footer>

      </footer>
    </div>
  );
}
