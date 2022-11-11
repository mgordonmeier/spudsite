import { Link } from "react-router-dom";
import React from "react";
// import logo from "../img/FnSLogo.svg";

function NavBar() {

    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between" style={{ borderRadius: "20px" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        {/* <img src={logo} alt="Fresh Spuds Logo"/> */}
                        Funk N Spuds
                        </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/spuds" className="nav-link active">Spuds</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/music" className="nav-link active">Music</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/shows" className="nav-link active">Shows</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/contact" className="nav-link active">Contact</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;