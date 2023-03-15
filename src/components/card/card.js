import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Call from "../call/call";
import "./card.css";

const Card = ({ movie, flag, userEmail }) => {
    const [nomDb, setnomDb] = useState([]);
    useEffect(() => {
        fetch("https://agmoviesbackend.onrender.com/databaseCall")
            .then(res => res.json())
            .then(data => setnomDb(data.votedmovie))
    }, [])

    let newarr = [];
    const nomObject = nomDb.find((obj) => obj.userName === userEmail);
    if (nomObject) {
        newarr = nomObject.movieId;
    }

    function handleClick(event) {

        if (newarr.length > 5) {
            alert("You cannot vote for movies more than 5.");
            return;
        }
        if (newarr.length === 5 && event.target.innerText === "Nominate") {
            alert("You cannot vote for movies more than 5.");
            return;
        }

        const postURL = "https://agmoviesbackend.onrender.com/nominate"
        fetch(postURL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: userEmail,
                movieId: event.target.name,
                nom: event.target.innerText
            })

        })

        const postURL2 = "https://agmoviesbackend.onrender.com/leaders"
        fetch(postURL2, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                movieId: event.target.name,
                nom: event.target.innerText
            })

        })

        if (event.target.innerText === "Nominate") {
            event.target.innerText = "Nominated";
            event.target.className = "btn btn-danger btn-sm";
        } else {
            event.target.innerText = "Nominate";
            event.target.className = "btn btn-outline-light btn-sm";
        }
    }

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }, [])

    return <>
        {
            isLoading
                ?
                <div className="mycard">
                    <SkeletonTheme baseColor="#202020" highlightColor="#444">
                        <Skeleton height={300} duration={2} />
                    </SkeletonTheme>
                </div>
                :

                <div className="mycard">
                    <img className="mycard__img" src={`https://image.tmdb.org/t/p/original${movie ? movie.poster_path : ""}`} />
                    <div className="mycard__overlay">
                        <div className="mycard__title">{movie ? movie.original_title : ""}</div>
                        <div className="mycard__runtime">
                            {movie ? movie.release_date : ""}
                            <span className="mycard_rating">
                                <div>
                                    <Call movie={movie} size={"leader"} />
                                </div>
                                {flag
                                    ?
                                    ""
                                    :
                                    newarr.find(id => id == movie.id) != undefined
                                        ?
                                        <button className="btn btn-danger btn-sm " name={movie.id} onClick={handleClick}>Nominated</button>
                                        :
                                        <button className="btn btn-outline-light btn-sm " name={movie.id} onClick={handleClick}>Nominate</button>}
                            </span>
                        </div>
                        <div className="mycard__description">{movie ? movie.overview.slice(0, 118) + "..." : ""}</div>
                    </div>
                </div>

        }
    </>
}

export default Card;