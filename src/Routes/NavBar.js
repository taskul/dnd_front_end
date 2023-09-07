import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import "./NavBar.css";
import "../GeneralComponents/Buttons.css"

export default function NavBar({ logout }) {
    const [isOpen, setIsOpen] = useState(false);
    const { currentUser } = useContext(AuthContext)

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeNavbar = () => {
        setIsOpen(false)
    }

    const handleLogout = () => {
        logout()
        closeNavbar()
    }

    return (
        <nav className="NavBar">

            <div
                className={`NavBar-mobile-menu ${isOpen ? "active" : ""}`}
                onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
            <div className="NavBar-logo">
                <NavLink to='/'>
                    <img
                        className="NavBar-logo-img"
                        src={process.env.PUBLIC_URL + "dnd_game_logo_small.png"}
                        alt="logo of a wizard hat"
                    />
                </NavLink>
            </div>
            <div className="NavBar-logo">
                <NavLink to='/'>
                    <img
                        className="NavBar-text-logo"
                        src={process.env.PUBLIC_URL + "dnd_den_smaller.png"}
                        alt="dnd den text logo"
                    />
                </NavLink>
            </div>
            <ul className={`NavBar-links ${isOpen ? "active" : ""}`}>
                {currentUser ?
                    // if user logged in show profile and logout links
                    <div className="NavBar-userNav">
                        <li className="NavBar-link" onClick={closeNavbar}>
                            <NavLink to='/profile'>Profile</NavLink>
                        </li>
                        <li className="NavBar-link" onClick={handleLogout}>
                            <NavLink to='/'>Logout</NavLink>
                        </li>
                    </div>
                    :
                    // if user not logged in show login and register links
                    <div className="NavBar-userNav">
                        <li className="NavBar-link" onClick={closeNavbar}>
                            <NavLink to='/login'>Login</NavLink>
                        </li>
                        <li className="NavBar-link" onClick={closeNavbar}>
                            <NavLink to='/signup'>Sign up</NavLink>
                        </li>
                    </div>
                }
                <div className="NavBar-button-background">
                    <div className="NavBar-button-foreground">
                        <li className="NavBar-link button-link" onClick={closeNavbar}>
                            <NavLink to={currentUser ? "/dashboard" : "/mapbuilder"}>
                                {currentUser ? "Dashboard" : "Map Builder Demo"}
                            </NavLink>
                        </li>
                    </div>
                </div>
            </ul>
        </nav>
    )
}