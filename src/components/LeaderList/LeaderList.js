import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Call from '../call/call';
import { AiOutlineStar } from "react-icons/ai"
import {SlBadge} from "react-icons/sl";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import 'react-loading-skeleton/dist/skeleton.css'
import "./LeaderList.css";



function LeaderList(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [obj, setObj] = useState({});

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${props.id}?api_key=${window.env.API_URL}&language=en-US`)
            .then(res => res.json())
            .then(res => setObj(res))
    }, [])

    useEffect(() => {
        setTimeout(() => {
          setIsLoading(false)
        }, 1000)
      }, [])

    return (
        
        
        <div className='maindiv container-fluid'>
           { isLoading
            ?
            <div className="cards">
                <SkeletonTheme baseColor="#202020" highlightColor="#444">
                    <Skeleton height={550} duration={1.5} />
                </SkeletonTheme>

            </div>
            :
             <>
            <Link to={`/movie/${obj.id}`} style={{ textDecoration: "none", color: "white" }} >
                <div className="myposter container-fluid"  >
                    <img src={`https://image.tmdb.org/t/p/original${obj && obj.poster_path}`} />
                </div>
            </Link>
            <div className="detail container-fluid">
                <div className='rank'>{props.it+1}<SlBadge/></div>
                <div className="mytitle">{obj ? obj.original_title : ""}</div>
                <div className="">
                    {obj ? obj.release_date : ""}

                    <div className="myspan">
                        {obj ? Math.ceil(obj.vote_average) : ""}
                        <span style={{marginRight:"20px"}}>
                        <AiOutlineStar />
                        </span>
                        <Call movie={obj} size="leader"/>
                        

                    </div>

                </div>
                <div className="descriptionl">{obj ? obj.overview : ""}</div>
            </div>
            </>
            }



        </div>
    )
}

export default LeaderList;