import React from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import NommovieList from "../nommovielist/nommovielist";
import { GiVote } from "react-icons/gi";
import Header from "../header/header";
import Clock from "../Clock/clock";
import "./nominated.css";
function Nominated() {
    const [chk,setchk]=useState();
    useEffect(() => {
        fetch("https://agmoviesbackend.onrender.com/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(data => {
                if (!data.isLoggenIn)
                    navigate("/login")
                else
                    setchk(data.userName)
            })
    }, [])
    const navigate=useNavigate();
    let {state} = useLocation();
    let userid;
    if(state===null)
    userid = {userid: chk}
    else
    userid = state;
    const [nomDb, setnomDb] = useState([]);

    useEffect(() => {
        fetch("https://agmoviesbackend.onrender.com/databaseCall")
            .then(res => res.json())
            .then(data => setnomDb(data.votedmovie))
    }, [])

    let nomObject = nomDb.find((obj) => obj.userName === userid.userid);
    let newarr = [];
    if (nomObject) {
        newarr = (nomObject.movieId);
    }

    return (
       
        <div className="mydiv">
        <Header name={"Home"}  userEmail={userid.userid}/> 
        <Clock/>
        <h1 className="myh1">Movies Nominated by you <GiVote/></h1>
       
       <div className="list__cards">
       
        {
            newarr.map(movid => (
                <NommovieList id={movid} />
            ))
        }
    </div>
    </div>


       

    );
}

export default Nominated;