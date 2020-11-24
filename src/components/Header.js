import React from 'react';
import logo from "../images/logo.svg";

function Header() {
    return(
        <header className="header root__section">
        <img src={logo} className="logo" alt = "Место"/>
      </header>
    )
}

export default Header