import Header from "./Header";
import NavBar from "./NavBar";
import StreamCard from "./StreamCard";

export default function Home() {
  return (
    <div>
      <div className="flex justify-center">
        <Header/>
      </div>
        <div className="flex flex-row justify-evenly">
            <NavBar/>
            <div className="flex flex-col w-9/12 gap-y-4">
              <h1 className="font-bold text-5xl pl-8">
                Listen Now
              </h1>
              <div className="flex flex-row flex-wrap justify-evenly w-full gap-y-8">
                <StreamCard
                  streamCover="user-assets/hand-reach.jpg"
                  streamName="Mind Matters (ep. 21)"
                  streamCreator="MindMattersPod"
                  streamPfp="user-assets/colourful.jpg"
                  streamTags={["mental-health", "education"]}
                />

                <StreamCard
                  streamCover="user-assets/ubc-cube.jpg"
                  streamName="CPSC 213 Week 3 Discussion"
                  streamCreator="BrainiacWalter"
                  streamPfp="user-assets/default-profile.svg"
                  streamTags={["education", "ubc", "popular"]}
                />
                <StreamCard
                  streamCover="user-assets/soul-artist.jpg"
                  streamName="new mix 01/18"
                  streamCreator="novaskye"
                  streamPfp="user-assets/record.jpg"
                  streamTags={["music", "r&b", "poc-artist"]}
                />
                <StreamCard
                  streamCover="user-assets/religious.jpg"
                  streamName="religious existentialism"
                  streamCreator="EverythingEverywheretv"
                  streamPfp="user-assets/prayer.jpg"
                  streamTags={["religion", "podcast", "spiritual"]}
                />
                <StreamCard
                  streamCover="user-assets/balatro.jpg"
                  streamName="GAME REVIEW #20: Balatro"
                  streamCreator="danTDM"
                  streamPfp="user-assets/danTDM.jpeg"
                  streamTags={["gaming", "podcast", "popular"]}
                />
                <StreamCard
                    streamCover="user-assets/shroom-astronaught.jpg"
                    streamName="psychedelic rap"
                    streamCreator="yungchickenwing"
                    streamPfp="user-assets/chicken.jpg"
                    streamTags={["music", "new-artist"]}
                  />
                </div>
            </div>
        </div>
    </div>
  );
}
