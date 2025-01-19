'use client'

import { Component, JSX } from "react";
import Tag from "./Tag";

interface StreamCard {
    streamCover: string;
    streamName: string;
    streamCreator: string;
    streamPfp: string;
    streamTags: string[];
}

export default function StreamCard(props:StreamCard) {
    const tooManyTags = props.streamTags.length > 3;
    const numExtraTags = props.streamTags.length - 3;

    const renderTags = () => {
        const arr = [];
        for (var x = 0; x < props.streamTags.length; x++) {
            arr.push(<Tag tagType={props.streamTags[x]} key={x}/>);
        }
        return arr;
    }

  return (
    <div className={"stream-card-container rounded-2xl flex justify-center"}>
        <div className={"album-cover rounded-2xl flex"}>
            <img src={props.streamCover} alt="Astronaught" className="object-cover rounded-2xl hover:animate-pulse"></img>
        </div>
        <div className="pt-2 pl-3 text-xl flex">
            <h2>{props.streamName}</h2>
        </div>
        <div className="sc-creatorline flex flex-row justify-start items-center pl-2">
            <img src={props.streamPfp} alt="Creator Profile" className="creator-pfp rounded-full"></img>
            <h2 className="pl-2">{props.streamCreator}</h2>
        </div>
        <div className="tags-container pt-1 flex flex-row">
            {tooManyTags
                ? <div className="flex flex-row justify-evenly w-full">
                  <Tag tagType={props.streamTags[0]}/>
                  <Tag tagType={props.streamTags[1]}/>
                  <Tag tagType={props.streamTags[2]}/>
                  <div className="rounded-3xl bg-slate-200 px-2 flex items-center">
                    +{numExtraTags}
                  </div>
                  </div>
                : <div className="flex flex-row justify-evenly w-full">
                    {renderTags()}
                  </div>
            }
        </div>
        
    </div>
  )
}