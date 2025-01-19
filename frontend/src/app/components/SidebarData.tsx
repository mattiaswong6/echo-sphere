import React from 'react'
import * as AiIcons from 'react-icons/ai';
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { RiNeteaseCloudMusicLine } from "react-icons/ri";
import { FaRegFolder } from "react-icons/fa";
import { PiMicrophoneStage } from "react-icons/pi";

const hoverBehavior = " hover:bg-[#A0A0A0] hover:scale-110 hover:ease-in hover:rounded-tr-lg hover:rounded-br-lg hover:-ml-32;"
const defaultStyling = " pl-8 -ml-3.5 mr-5"

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiOutlineHome/>,
        cName: 'nav-text ' + hoverBehavior + defaultStyling
    },
    {
        title: 'Discover',
        path: '/discover',
        icon: <AiIcons.AiOutlineSearch/>,
        cName: 'nav-text' + hoverBehavior + defaultStyling
    },
    {
        title: 'Subscriptions',
        path: '/subscriptions',
        icon: <HiOutlineMenuAlt2/>,
        cName: 'nav-text' + hoverBehavior + defaultStyling
    },
    {
        title: 'My Sphere',
        path: '/mySphere',
        icon: <RiNeteaseCloudMusicLine/>,
        cName: 'nav-text' + hoverBehavior + defaultStyling
    },
    {
        title: 'My Files',
        path: '/myFiles',
        icon: <FaRegFolder/>,
        cName: 'nav-text' + hoverBehavior + defaultStyling
    },
    {
        title: 'Soundboard',
        path: '/soundboard',
        icon: <AiIcons.AiOutlineControl/>,
        cName: 'nav-text' + hoverBehavior + defaultStyling
    },
    {
        title: 'Broadcast',
        path: '/broadcast',
        icon: <PiMicrophoneStage/>,
        cName: 'nav-text text-black pl-9 pb-2 !mt-32 ml-1 mr-6 bg-[#79C2CD] rounded-full hover:bg-[#408796]'
    } 
] 