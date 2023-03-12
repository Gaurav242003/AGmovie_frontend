import {React,useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";
import "./main.css";

const Main = () => {
    const navigate=useNavigate();
    useEffect(() => {
        fetch("http://localhost:8000/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.isLoggenIn)
                    navigate("/browse",{state: {userid: data.userName}})
            })
    }, [])

    return (

        <div className="container-fluid outermost">
            <nav className="navbar navbar-expand-lg  " >
                <div className="container-fluid">
                    <Link className="navbar-brand  mb-0 h1 agmovie fw-bold" to="/" >AGmovies</Link>


                    <ul className="navbar-nav">

                        <li className="nav-item">
                            <Link className="btn btn-md btn-danger  newbtn" to="/login"  >Log In</Link>
                        </li>

                    </ul>

                </div>

            </nav>
            <div className="container-fluid mainhead">
                Unlimited daily contests! vote for your favourite movies.
                <p>Register yourself and vote for your favourite movies.</p>
                <div className="d-grid gap-2">
                    <Link className="btn btn-lg btn-danger newbtn" to="/signup"  style={{marginTop:"20px",marginBottom:"173px"}}>Sign up! and participate in contest</Link>

                </div>
            </div>

        </div>



    )
}

export default Main;
