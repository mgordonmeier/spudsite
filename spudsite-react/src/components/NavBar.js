import { Link } from "react-router-dom";
import React from "react";
import logo from "../img/AnotherLogo.png";

function NavBar() {

    return (
        <div className="container text-center" >
            <nav className="navbar navbar-expand-lg navbar-light justify-content-between specialCard" style={{ borderRadius: "20px", display: "inline-block" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt="Fresh Spuds Logo" className="img-responsive headerLink ms-1" style={{height: "auto", width: "100px"}}/>
                        </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse m-1" id="navbarTogglerDemo02">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 spudNavBar">
                            <li className="nav-item m-1">
                                <Link to="/spuds" className="nav-link active navLink">Spuds</Link>
                            </li>
                            <li className="nav-item m-1">
                                <Link to="/music" className="nav-link active navLink">Music</Link>
                            </li>
                            {/* <li className="nav-item m-1">
                                <Link to="/games" className="nav-link active navLink">Games</Link>
                            </li> */}
                            <li className="nav-item m-1">
                                <Link to="/shows" className="nav-link active navLink">Shows</Link>
                            </li>
                            <li className="nav-item m-1">
                                <Link to="/contact" className="nav-link active navLink lastLink">Contact</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;