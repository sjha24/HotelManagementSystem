import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Logout from '../auth/Logout';
import { AuthContext } from '../auth/AuthProvider';

const Navbar = () => {
    const [showAccount,setShowAccount] = useState(false);

    const {user} = useContext(AuthContext);

    const handleAccountClick=()=>{
        setShowAccount(!showAccount);
    }

    const isLoggedIn = user !== null;
    const userRole = localStorage.getItem("userRole");

  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary px-5 shadow sticky-top'>
        <div className='container-fluid'>
            <Link to={"/"} className='navbar-brand'>
                <span className='hotel-color'>Luxrious Hotel</span>
            </Link>
            <button className='navbar-toggler' type='button'
                data-bs-toggle = "collapse"
                data-bs-target = "#navbarScroll"
                arial-aria-controls='navbarScroll'
                arial-aria-expanded='false'
                aria-label='Toggle navigation'>

                    <span className='navbar-toggler-icon'>
                    </span>
            </button>
            <div className='collapse navbar-collapse' id='navbarScroll'>
                <ul className='navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll'>
                    <li className='nav-item'>
                        <Link className='nav-link' aria-current='page' to={"/broswe-all-room"}>
                            Broswe All Room
                        </Link>
                    </li>

                    {isLoggedIn && userRole === "ROLE_ADMIN" && (
                        <li className='nav-item'>
                            <Link className='nav-link' aria-current='page' to={"/admin"}>
                                Admin
                            </Link>
                        </li>
                    )}

                </ul>
                
                <ul className='d-flex navbar-nav'>
                    <li className='nav-item'>
                        <Link className='nav-link' to={"/find-booking"}>
                            Find My Booking
                        </Link>
                    </li>
                    <li className='nav-item dropdown'>
                        <a className={`nav-link dropdown-toggle ${setShowAccount ? "show" : ""}`}
                            href='#'
                            role='button'
                            data-bg-toggle="dropdown"
                            aria-expanded="false"
                            onClick={handleAccountClick}>
                            {" "}
                            Account
                        </a>

                        <ul className={`dropdown-menu ${showAccount ? "show" : ""}`}
                            aria-labelledby='navbarDropdown'
                        >

                            {!isLoggedIn ? (

                                <li>
                                    <Link to={"/login"} className='dropdown-item'>
                                        Login
                                    </Link>
                                </li>
                            ):(
                                <li>
                                    <Logout/>
                                </li>,
                                <li>
                                    <Link to={"/profile"} className='dropdown-item'>
                                        Profile
                                    </Link>
                                </li>
                            )}
                            
                        </ul>
                    </li>

                </ul>
            </div>
        </div>        
    </nav>
  )
}

export default Navbar