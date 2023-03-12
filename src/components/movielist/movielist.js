import React, {useEffect, useState} from "react"
import "./movielist.css"
import Card from "../card/card"

const MovieList = (props) => {

    return (
        <div className="movie__list">
            <div className="list__cards">
                {
                    props.movieList.map(movie => (
                        <Card movie={movie} userEmail={props.userEmail}/>
                    ))
                }
            </div>
        </div>
    )
}

export default MovieList;