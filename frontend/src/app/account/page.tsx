import { Route, Router, Routes } from 'react-router-dom';
import './Account.css'

export default function Account() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <a href="/">
                <img src="./echosphere-public.png" alt="Logo" width={150} height={150} className="-mb-8"/>
            </a>
            <h1 className="text-white font-bold text-6xl mb-8">
                echosphere
            </h1>
            <h2 className="font-semibold text-xl mb-12">
                interactive livestreamed radio stations, curated just for you.
            </h2>
            <a href="./account/sign-up" className="auth-button bg-[#79C2CD] mb-4 text-black font-semibold button">
                Get Started
            </a>
            <a href="./account/sign-in" className="auth-button bg-[#FFFFF] text-[#79C2CD] font-semibold border-[#79C2CD] border-2 button">
                Sign In
            </a>
            <Routes>
                <Route path='/account/sign-in'/>
            </Routes>
        </div>
    );
}