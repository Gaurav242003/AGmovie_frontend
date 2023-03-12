import React from "react";
import { Link } from "react-router-dom";

const Header=(props) =>{
    const userEmail = props.userEmail;
    return(
        <nav className="navbar navbar-expand-lg  " >
                <div className="container-fluid">
                    <Link className="navbar-brand  mb-0 h1 agmovie fw-bold" >AGmovies</Link>


                    <ul className="navbar-nav">

                        <li className="nav-item">
                            <Link className="btn btn-md btn-danger  newbtn" to="/browse" state={{userid: userEmail}} >{props.name}</Link>
                        </li>

                    </ul>

                </div>

            </nav>
    )
}

export default Header;