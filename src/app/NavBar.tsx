"use client"

import React from 'react'
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css'

function NavBar() {

  return (
    <>
      <nav className='nav-menu'>
        <ul className = 'nav-menu-items'> 
            {SidebarData.map((item, index) => {
              return(
                <li key={index} className={item.cName + ' pt-2'}>
                  <a href={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </a>
                </li>
              )
            })}
        </ul>
      </nav>
    </>
  )
}

export default NavBar
