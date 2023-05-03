import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Home from "../pages/Home";
import Registration from "../pages/Registration";
import Map from "../pages/Map";
import Info from "../pages/Info";
import Login from "../pages/Login";
function Nav() {
    return (
        <Router>
            <html>
            <head>
                <title>City Initiatives</title>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"/>
            </head>
            <body>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <a className="navbar-brand" href="/">Городские Инициативы</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/info">Initiatives</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/map">Map</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Get Involved</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/login">Login</a>
                        </li>
                    </ul>
                </div>
            </nav>
            </body>
            </html>

            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path="/register" element={<Registration/>}/>
                <Route path="/map" element={<Map />}/>
                <Route path="/info" element={<Info />}/>
                <Route path="/login" element={<Login />}/>
            </Routes>
        </Router>
    );
}

export default Nav;
