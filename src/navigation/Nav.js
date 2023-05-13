import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Home from "../pages/Home";
import Registration from "../pages/Registration";
import Map from "../pages/Map";
import Info from "../pages/Info";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import CreateInitiatives from "../pages/CreateInitiatives";
import Initiatives from "../pages/initiatives";
import {IsAuthenticated} from "../services/UserService";
import EditInitiative from "../pages/EditInitiative";

function Nav() {
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        IsAuthenticated()
            .then((data) => {setAuth(data)})
    }, [])

    return (
        <Router>
            <div>
                <title>City Initiatives</title>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"/>
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
                                <a className="nav-link" href="/initiatives">Initiatives</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/map">Map</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Get Involved</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href={auth ? "/profile" : "/login"}>
                                    {auth ? 'Личный кабинет' : 'Вход' }</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path="/initiatives" element={<Initiatives />}/>
                <Route path="/register" element={<Registration/>}/>
                <Route path="/map" element={<Map />}/>
                <Route path="/info/:itemId" element={<Info />}/>
                <Route path="/edit/:itemId" element={<EditInitiative />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/profile" element={<Profile />}/>
                <Route path="/create" element={<CreateInitiatives />}/>
            </Routes>
        </Router>
    );
}

export default Nav;
