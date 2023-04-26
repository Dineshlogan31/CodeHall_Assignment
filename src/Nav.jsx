import React from 'react'
import style from "./css/nav.module.css"

const Nav = () => {
  return (
    <div id={style.nav} >
        <nav>
        <li><a href="/#">Home</a></li>
        <li><a href="/#">Search</a></li>
        <li><a href="/#">About</a></li>
        <li><a href="/#">Help Center</a></li>
    </nav>
    </div>
  )
}

export default Nav