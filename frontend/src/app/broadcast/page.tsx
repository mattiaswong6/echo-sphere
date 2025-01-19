"use client"

import Header from "../components/Header";
import NavBar from "../components/NavBar";
import {Routes, BrowserRouter as Router, Route} from 'react-router-dom'
import { useState } from 'react';
import UserItem from './user-item';
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
import { IconType } from 'react-icons';
import * as fa from "react-icons/fa";
import LiveChat from "../components/LiveChat";
type User = {
  id: number;
  name: string;
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
    <div className="grid grid-cols-6">
      <div className="col-span-6">
        <Header/>
      </div>
      <div>
        <Router>
          <NavBar/>
          <Routes>
          </Routes>
        </Router>
      </div>
      <div className='max-w-2xl h-10 grid gap-2 my-10 col-start-2 col-span-2 ml-20'>
        <h2 className='text-2xl font-bold mb-4'>Queue</h2>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext
            items={userList}
            strategy={verticalListSortingStrategy}
          >
            {userList.map((user, index) => (
              <UserItem key={user.id} user={user} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
      <div className="col-start-4 col-span-3 h-100">
        <LiveChat/>
      </div>
    </div>
)};

export default UserList;

//bruh