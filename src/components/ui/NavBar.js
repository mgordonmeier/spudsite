import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import anotherLogo from "../../img/AnotherLogo.png";
import "./NavBar.css";

const links = [
    { to: "/spuds", label: "Spuds" },
    { to: "/music", label: "Music" },
    { to: "/games", label: "Games" },
    { to: "/shows", label: "Shows" },
    { to: "/merch", label: "Merch" },
    { to: "/contact", label: "Contact" },
];

function NavBar() {

    return (
        <header className="site-nav-shell">
            <nav className="navbar navbar-expand-lg navbar-light site-nav" aria-label="Primary navigation">
                <div className="container-fluid site-nav-inner">
                    <Link className="navbar-brand site-nav-brand" to="/" aria-label="Funk N Spuds home">
                        <img src={anotherLogo} alt="" className="site-nav-logo" />
                    </Link>
                    <button className="navbar-toggler site-nav-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#primaryNav" aria-controls="primaryNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse site-nav-collapse" id="primaryNav">
                        <ul className="navbar-nav site-nav-list">
                            {links.map((link) => (
                                <li className="nav-item site-nav-item" key={link.to}>
                                    <NavLink
                                        to={link.to}
                                        className={({ isActive }) => `nav-link site-nav-link${isActive ? " is-active" : ""}`}
                                    >
                                        {link.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default NavBar;
