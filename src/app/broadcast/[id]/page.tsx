
import Header from "../../Header";
import NavBar from "../../NavBar";
import Broadcast from "../Broadcast";
import SortableList from "../SortableList";

export default async function BroadcastView ({params}: {params: Promise<{id: string}>}) {

  const streamerId = (await params).id;

  return (
    <div className="grid grid-cols-[2fr 4fr 4fr] grid-rows-[0.5fr 1fr 1fr] p-4">
      <div className="col-span-3">
        <Header/>
      </div>
      <div className="">
        <NavBar/>
      </div>
      <div>

      </div>
      <div className='max-w-2xl h-10 grid gap-2 my-10 col-start-2 col-span-1 row-start-3 ml-20'>
        <SortableList />
      </div>
      <div className="col-start-2 col-span-2 row-start-2">
        <Broadcast name={"streamer"} streamerId={streamerId}/>
      </div>
    </div>
)};


