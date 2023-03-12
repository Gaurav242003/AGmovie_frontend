import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import 'react-loading-skeleton/dist/skeleton.css'

import Call from "../call/call";
import { AiOutlineStar } from "react-icons/ai"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import "./mycarousel.css";

function Mycarousel(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [nomState, setnomState] = useState("Nominate");
    const [nomDb, setnomDb] = useState([]);
    const [nomArray, setnomArray] = useState([]);
    const [flag, setFlag] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8000/databaseCall")
            .then(res => res.json())
            .then(data => setnomDb(data.votedmovie))
    }, [])

    let newarr = [];
    const nomObject = nomDb.find((obj) => obj.userName === props.userid);
    if (nomObject) {
        newarr = (nomObject.movieId);
    }




    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }, [])

    function handleClick(event) {
        if (event.target.innerText === "Nominate") {
            if (newarr.length >= 5) {
                alert("You cannot vote for more than 5 movies");
                return;
            } else {
                newarr.push(event.target.name);
            }
        } else {
            let i = 0;
            while (i < newarr.length) {
                if (newarr[i] === event.target.name) {
                    newarr.splice(i, 1);
                } else {
                    ++i;
                }
            }
        }
        const postURL = "http://localhost:8000/nominate" //Our previously set up route in the backend
        fetch(postURL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ // We should keep the fields consistent for managing this data later
                userName: props.userid,
                movieId: event.target.name,
                nom: event.target.innerText
            })

        })

        const postURL2 = "http://localhost:8000/leaders" //Our previously set up route in the backend
        fetch(postURL2, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ // We should keep the fields consistent for managing this data later
                movieId: event.target.name,
                nom: event.target.innerText
            })

        })

        if (event.target.innerText === "Nominate") {
            event.target.innerText = "Nominated";
            event.target.className = "btn btn-danger btn-lg nominate";
        } else {
            event.target.innerText = "Nominate";
            event.target.className = "btn btn-outline-light btn-lg nominate";
        }
    }
    return (
        isLoading
            ?
            <div className="cards">
                <SkeletonTheme baseColor="#202020" highlightColor="#444">
                    <Skeleton height={550} duration={1.5} />
                </SkeletonTheme>

            </div>
            :
            <Carousel
                autoPlay={true}
                infiniteLoop={true}
                showThumbs={false}
                showStatus={false}
                transitionTime={3}
                key={props.typemov.length}
                className="posterImage"
            >

                {
                    props.typemov.map(movie => {
                        return (
                            <div>

                                <Link style={{ textDecoration: "none", color: "white" }} >
                                    <div className="posterImage"  >
                                        <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} />
                                    </div>
                                </Link>
                                <div className="posterImage__overlay">
                                    <div className="title">{movie ? movie.original_title : ""}</div>
                                    <div className="runtime">
                                        {movie ? movie.release_date : ""}

                                        <span className="rating">
                                            {movie ? Math.ceil(movie.vote_average) : ""}
                                            <AiOutlineStar />
                                            <Call movie={movie} />
                                            {newarr.find(id => id == movie.id) != undefined
                                                ?
                                                <button className="btn btn-danger btn-lg nominate" name={movie.id} onClick={handleClick}>Nominated</button>
                                                :
                                                <button className="btn btn-outline-light btn-lg nominate" name={movie.id} onClick={handleClick}>Nominate</button>}
                                        </span>

                                    </div>
                                    <div className="description">{movie ? movie.overview : ""}</div>
                                </div>



                            </div>
                        )
                    })

                }

            </Carousel>
    )
}

export default Mycarousel;