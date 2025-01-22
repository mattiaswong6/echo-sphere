"use client"

import Header from "../Header";
import NavBar from "../NavBar";
import { useState } from 'react';
import View from "../listentest/page";
import {
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import * as fa from "react-icons/fa";

type User = {
  id: number;
  name: string;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  icon: any;
};
const dummyData: User[] = [
  {
    id: 1,
    name: '[A Night to remember - Laufey & Beabadoobe]',
    icon: <fa.FaMusic/>,
  },
  {
    id: 2,
    name: '[Tweak - GELO]',
    icon: <fa.FaMusic/>,
  },
  {
    id: 3,
    name: 'Live Mic',
    icon: <fa.FaMicrophone/>,
  },
];


const UserList = () => {
  const [userList, setUserList] = useState<User[]>(dummyData);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setUserList((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
  console.log(userList);

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
        <View name={"viewer"} />
      </div>
    </div>
)};

export default UserList;

