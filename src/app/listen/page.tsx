"use client"

import Header from "../Header";
import NavBar from "../NavBar";
import {Routes, BrowserRouter as Router} from 'react-router-dom'
import { useState } from 'react';
import UserItem from '../broadcast/user-item';
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import * as fa from "react-icons/fa";
import ChatWindow from "../ChatWindow";
import Broadcast from "../broadtest/page";
import View from "../listentest/page";
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
        <Router>
          <NavBar/>
          <Routes>
          </Routes>
        </Router>
      </div>
      <div>

      </div>
      <div className="col-start-2 col-span-2 row-start-2">
        <View name={"viewer"} />
      </div>
    </div>
)};

export default UserList;

