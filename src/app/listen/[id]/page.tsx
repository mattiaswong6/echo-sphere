"use client"

import Header from "../../Header";
import NavBar from "../../NavBar";
import Listen from "../Listen";

export default async function ListenView({params}: {params: Promise<{id: string}>}) {
  const streamId = (await params).id;
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
      <div className="col-start-2 col-span-2 row-start-2">
        <Listen name={"listener"} streamId={streamId}/>
      </div>
    </div>
)};


