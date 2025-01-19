"use client";

import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Tag from "../Tag";
import SearchBar from "../SearchBar";
import "./YourSphere.css";

export default function YourSphere() {
  const [leftTags, setLeftTags] = useState<string[]>([]); // Tags in left-container
  const [rightTags, setRightTags] = useState<string[]>([
    "Pop",
    "Hip Hop",
    "Rock",
    "R&B",
    "Jazz",
    "Metal",
    "Country",
    "EDM",
    "Classical",
    "Funk",
    "Reggae",
    "Blues",
    "Soul",
    "Punk",
    "Ska",
    "Bluegrass",
    "Synthwave",
    "Grunge",
    "True Crime",
    "Books",
    "Cooking",
    "Sports",
    "Travel",
    "Humour",
    "Fashion",
    "Gaming",
    "History",
    "Technology",
    "Health & Wellness",
    "Science",
    "Parenting",
    "Business",
    "Education",
    "Music",
  ]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    console.log("handled drag");

    // if (!over) return;
    console.log(event);
    setLeftTags((prev) => [...prev, active.id]);
    setRightTags((prev) => prev.filter((tag) => tag !== active.id));

    if (over.id === "left-container") {
      // Move tag to the left-container
      setLeftTags((prev) => [...prev, active.id]);
      setRightTags((prev) => prev.filter((tag) => tag !== active.id));
      console.log(leftTags);
    }
  };

  const DraggableTag = ({ tag }: { tag: string }) => {
    const { attributes, listeners, setNodeRef, transform } = useSortable({
      id: tag,
    });

    const style: React.CSSProperties = {
      transform: CSS.Translate.toString(transform),
      cursor: "grab",
    };

    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <Tag tagType={tag} />
      </div>
    );
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex flex-row w-full">
        {/* Left Container (Droppable Area) */}
        <div
          id="left-container"
          className="left-container flex w-1/2 flex-col items-center justify-start h-full p-4">
          <h1 className="font-bold mb-56">Create Your Sphere</h1>
          <img
            src="sphere.png"
            alt="sphere"
            width={800}
            height={800}
            className="mt-20 absolute inset-0 object-contain -z-10"
          />
          <div className="tag-container  flex flex-wrap justify-center items-center align-middle [&>*]:rounded-xl [&>*]:bg-gray-200 [&>*]:text-black [&>*]:mx-2 [&>*]:my-2">
            {leftTags.map((tag) => (
              <div key={tag} className="flex flex-wrap items-center justify-center align-middle">
                <Tag tagType={tag} /> {/* Fixed tags */}
              </div>
            ))}
          </div>
        </div>

        {/* Right Container (Draggable Tags) */}
        <div
          id="right-container"
          className="right-container flex w-1/2 flex-col p-4"
        >
          <div className="right-box rounded-xl flex flex-col">
            <div className="mt-8 flex justify-center">
              <SearchBar />
            </div>
            <div className="flex flex-col">
              <h2>Available Tags</h2>
              <div className="tag-container flex flex-wrap [&>*]:rounded-xl [&>*]:bg-white [&>*]:text-black [&>*]:mx-2 [&>*]:my-2">
                <SortableContext items={rightTags}>
                  {rightTags.map((tag) => (
                    <DraggableTag key={tag} tag={tag} />
                  ))}
                </SortableContext>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DndContext>
  );
}
