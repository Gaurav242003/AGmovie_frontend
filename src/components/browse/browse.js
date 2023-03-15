import React, { useEffect, useState, } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import MovieList from "../movielist/movielist";
import { BiSearchAlt } from "react-icons/bi";
import Clock from "../Clock/clock";
import "./browse.css";
import Mycarousel from "../mycarousel/mycarousel";




const Browse = () => {
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

    const [trending, setTrending] = useState([]);
    const [romance, setRomance] = useState([]);
    const [action, setAction] = useState([]);
    const [anime, setAnime] = useState([]);
    const [movieName, setmovieName] = useState("");
    const [moviesSearch, setmovies] = useState([]);


    function handleChange(event) {
        setmovieName(event.target.value);
    }

    function handleClick(event) {

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${window.env.API_URL}&query=${movieName}`)
            .then(res => res.json())
            .then(data => setmovies(data.results));

        setmovieName("");
        event.preventDefault();


    }

    function handeljwt() {
        localStorage.removeItem("token");
    }


    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${window.env.API_URL}&language=en-US&page=1`)
            .then(res => res.json())
            .then(data => setTrending(data.results))
    }, [])

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${window.env.API_URL}&language=en-US&page=1&with_genres=10749`)
            .then(res => res.json())
            .then(data => setRomance(data.results))
    }, [])

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${window.env.API_URL}&language=en-US&page=1&with_genres=28`)
            .then(res => res.json())
            .then(data => setAction(data.results))
    }, [])

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${window.env.API_URL}&language=en-US&page=1&with_genres=16`)
            .then(res => res.json())
            .then(data => setAnime(data.results))
    }, [])



    return (

        <div className="container-fluid navbrowse">

            <nav className="navbar navbar-expand-lg  navbar-dark " >
                <div className="container-fluid ">
                    <Link className="navbar-brand  mb-0 h1 agmovie fw-bold" to="/" >AGmovies</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon" ></span>
                    </button>
                    <div className="container-fluid collapse navbar-collapse justify-content-end" id="navbarSupportedContent" >
                        <form class="d-flex mb-2" role="search">
                            <input class="form-control me-2 newnav  " type="search" placeholder="Search" aria-label="Search" onChange={handleChange} />
                            <button class="btn btn-md  btn-outline-light" type="submit" style={{ marginRight: "10px" }} onClick={handleClick} ><BiSearchAlt style={{ fontSize: "20px" }} /></button>

                        </form>

                        <ul className="navbar-nav   ml-auto ">

                            <li className="nav-item ">
                                <Link className="btn btn-md btn-outline-light mb-2 " to="/leaderBoard" style={{ marginRight: "10px" }} state={{ userid: userid.userid }}  >Leaderboard</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="btn btn-md btn-outline-light mb-2 " to="/nominated" style={{ marginRight: "10px" }} state={{ userid: userid.userid }} >Nominated</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="btn btn-md btn-outline-danger" to="/" onClick={handeljwt} >Log Out</Link>
                            </li>



                        </ul>

                    </div>

                </div>

            </nav>
            <Clock />
            {moviesSearch.length === 0 ? null :
                <div>
                    <MovieList movieList={moviesSearch} userEmail={userid.userid} />
                </div>}
            <div className="container-fluid">
                <h5 className="genre">
                    TRENDING
                </h5>
            </div>
            <Mycarousel typemov={trending} userid={userid.userid} />
            <div className="container-fluid">
                <h5 className="genre">
                    ACTION
                </h5>
            </div>
            <Mycarousel typemov={action} userid={userid.userid} />
            <div className="container-fluid">
                <h5 className="genre">
                    ROMANCE
                </h5>
            </div>
            <Mycarousel typemov={romance} userid={userid.userid} />
            <div className="container-fluid">
                <h5 className="genre">
                    ANIMATION
                </h5>
            </div>
            <Mycarousel typemov={anime} userid={userid.userid} />




        </div>

    )
}

export default Browse;