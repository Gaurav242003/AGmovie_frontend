import React, { useEffect, useState } from "react";
import "./call.css";

function Call(props) {
    const [trailer, setTrailer] = useState();

    function abc() {

        fetch(`http://api.themoviedb.org/3/movie/${props.movie.id}/videos?api_key=${window.env.API_URL}`)
            .then(res => res.json())
            .then(data => {
                if (data.results.length === 0)
                    return setTrailer("12345");
                else
                    return setTrailer(data.results[0].key);
            })

    }
    abc();




    return (
        props.size == "leader"
            ?
            <a href={`https://www.youtube.com/watch?v=${trailer}`} target="_blank" className=" btn btn-danger btn-md " > Trailer</a>
            :
            <a href={`https://www.youtube.com/watch?v=${trailer}`} target="_blank" className="trailer btn btn-outline-light btn-lg" > Trailer</a>
    )
}

export default Call;
