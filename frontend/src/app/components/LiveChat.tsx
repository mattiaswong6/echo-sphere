import React from 'react'
import { IoMdSend } from "react-icons/io";

function LiveChat() {
  return (
    <>
    <div className='border-solid rounded-md border-2 pb-[475px] ml-5 mr-7'>
    </div>
    <div className='flex pt-6'>
        <input className='chatbar w-3/4 h-10 ml-5 rounded-full'/>
        <IoMdSend className='ml-6 mt-1 w-9 h-9 bg-[#79C2CD] rounded-full border-8 border-[#79C2CD] text-black'/>
    </div>
    </>
  )
}

export default LiveChat
