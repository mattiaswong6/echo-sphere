import Header from "../Header";
import NavBar from "../NavBar";
import StreamCard from "../StreamCard";


type Stream = {
  streamCover: string;
  streamName: string;
  streamCreator: string;
  streamPfp: string;
  streamTags: string[];
}

const streams: Stream[] = [{
  streamCover: "../..//user-assets/hand-reach.jpg",
  streamName: "Mind Matters (ep. 21)",
  streamCreator: "MindMattersPod",
  streamPfp: "../..//user-assets/colourful.jpg",
  streamTags: ["mental-health", "education"]
},

{
  streamCover: "../..//user-assets/ubc-cube.jpg",
  streamName: "CPSC 213 Week 3 Discussion",
  streamCreator: "BrainiacWalter",
  streamPfp: "../..//user-assets/default-profile.svg",
  streamTags: ["education", "ubc", "popular"]
},
{
  streamCover: "../..//user-assets/soul-artist.jpg",
  streamName: "new mix 01/18",
  streamCreator: "novaskye",
  streamPfp: "../..//user-assets/record.jpg",
  streamTags: ["music", "r&b", "poc-artist"]
},
{
  streamCover: "../..//user-assets/religious.jpg",
  streamName: "religious existentialism",
  streamCreator: "EverythingEverywheretv",
  streamPfp: "../..//user-assets/prayer.jpg",
  streamTags: ["religion", "podcast", "spiritual"]
},
{
  streamCover: "../..//user-assets/balatro.jpg",
  streamName: "GAME REVIEW #20: Balatro",
  streamCreator: "danTDM",
  streamPfp: "../..//user-assets/danTDM.jpeg",
  streamTags: ["gaming", "podcast", "popular"]
},
{
    streamCover: "../..//user-assets/shroom-astronaught.jpg",
    streamName: "psychedelic rap",
    streamCreator: "yungchickenwing",
    streamPfp: "../..//user-assets/chicken.jpg",
    streamTags: ["music", "new-artist"]
  }];
 

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
                Broadcast Now
              </h1>
              <div className="flex flex-row flex-wrap justify-evenly w-full gap-y-8">
                <StreamCard
                  streamCover="/user-assets/hand-reach.jpg"
                  streamName="Mind Matters (ep. 21)"
                  streamCreator="MindMattersPod"
                  streamPfp="/user-assets/colourful.jpg"
                  streamTags={["mental-health", "education"]}
                  broadcast
                />
                <StreamCard
                  streamCover="/user-assets/ubc-cube.jpg"
                  streamName="CPSC 213 Week 3 Discussion"
                  streamCreator="BrainiacWalter"
                  streamPfp="/user-assets/default-profile.svg"
                  streamTags={["education", "ubc", "popular"]}
                  broadcast
                />
                <StreamCard
                  streamCover="/user-assets/soul-artist.jpg"
                  streamName="new mix 01/18"
                  streamCreator="novaskye"
                  streamPfp="/user-assets/record.jpg"
                  streamTags={["music", "r&b", "poc-artist"]}
                  broadcast
                />
                <StreamCard
                  streamCover="/user-assets/religious.jpg"
                  streamName="religious existentialism"
                  streamCreator="EverythingEverywheretv"
                  streamPfp="/user-assets/prayer.jpg"
                  streamTags={["religion", "podcast", "spiritual"]}
                  broadcast
                />
                <StreamCard
                  streamCover="/user-assets/balatro.jpg"
                  streamName="GAME REVIEW #20: Balatro"
                  streamCreator="danTDM"
                  streamPfp="/user-assets/danTDM.jpeg"
                  streamTags={["gaming", "podcast", "popular"]}
                  broadcast
                />
                <StreamCard
                    streamCover="/user-assets/shroom-astronaught.jpg"
                    streamName="psychedelic rap"
                    streamCreator="yungchickenwing"
                    streamPfp="/user-assets/chicken.jpg"
                    streamTags={["music", "new-artist"]}
                  broadcast
                  />
                </div>
            </div>
        </div>
    </div>
  );
}
