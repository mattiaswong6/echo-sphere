"use client"

import Header from "./components/Header";
import NavBar from "./components/NavBar";
import {Routes, BrowserRouter as Router, Route} from 'react-router-dom'
import Discover from './pages/Discover'
import Broadcast from './pages/Broadcast'

export default function Home() {
  return (
    <div>
      <Header/>
      <Router>
        <NavBar/>
        <Routes>
          <Route path='/discover' Component={Discover}/>
          <Route path='/broadcast' Component={Broadcast}/>
        </Routes>
      </Router>
    </div>
  );
}
