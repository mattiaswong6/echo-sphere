"use client"

import Header from "./components/Header";
import NavBar from "./components/NavBar";
import {Link, Routes, BrowserRouter as Router, Route} from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <Header/>
      <Router>
        <NavBar/>
        <Routes>
          <Route path='/'/>
        </Routes>
      </Router>
    </div>
  );
}
