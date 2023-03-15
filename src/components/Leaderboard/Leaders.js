import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import LeaderList from '../LeaderList/LeaderList';
import { GiPodiumWinner } from "react-icons/gi"
import './Leaders.css';
import Header from '../header/header';
import Clock from '../Clock/clock';
import { useLocation, useNavigate } from 'react-router-dom';



function Leaders() {


  const [chk, setchk] = useState();
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
  const navigate = useNavigate();
  const { state } = useLocation();
  let userid;
  if (state === null)
    userid = { userid: chk }
  else
    userid = state;

  const [arr, SetArr] = useState([]);

  useEffect(() => {
    fetch("https://agmoviesbackend.onrender.com/leaderDb")
      .then(res => res.json())
      .then(res => SetArr(res))
  }, [])


  arr.sort((a, b) => {
    return b.Votes - a.Votes;
  })



  return (

    <>
      <Header name={"Home"} userEmail={userid.userid} />
      <Clock />
      <div className='leaderboard'>Leaderboard <GiPodiumWinner /></div>
      {arr.slice(0, 3).map((detail, index) => (<LeaderList id={detail.movieId} it={index} />))}
    </>
  )
}

export default Leaders;