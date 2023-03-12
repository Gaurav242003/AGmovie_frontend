import React, { useEffect, useState } from "react"
import "./nommovielist.css"
import Card from "../card/card"

const NommovieList = (props) => {
    const [newnommov,setNewnommov]=useState();

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${props.id}?api_key=${window.env.API_URL}&language=en-US`)
            .then(res => res.json())
            .then(data => setNewnommov(data))
    }, [])


    return (
        <div className="movie__list">
            
            <div className="list__cards">
                {
                   
                        <Card movie={newnommov} flag={true}/>
                
                }
            </div>
        </div>
    )
}

export default NommovieList;