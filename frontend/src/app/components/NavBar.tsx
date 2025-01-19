"use client"

import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css'

function NavBar() {

  return (
    <>
      <nav className='nav-menu'>
        <ul className = 'nav-menu-items'> 
            {SidebarData.map((item: any, index: any) => {
              return(
                <li key={index} className={item.cName + ' pt-2'}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              )
            })}
        </ul>
      </nav>
    </>
  )
}

export default NavBar
