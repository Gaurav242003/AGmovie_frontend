import React, { useEffect, useState, } from "react";
import { TfiTimer } from "react-icons/tfi";
import "./clock.css"


const Clock = () => {

    let currentDate = new Date();

    const [seconds, setSeconds] = useState(currentDate.getSeconds());
    const [minutes, setMinutes] = useState(currentDate.getMinutes());
    const [hours, setHours] = useState(currentDate.getHours());

    var timer;
    useEffect(() => {
        timer = setInterval(() => {

            let currentDate = new Date();
            setHours(currentDate.getHours());
            setMinutes(currentDate.getMinutes());
            setSeconds(currentDate.getSeconds());
        }, 1000)
        return () => clearInterval(timer);
    });

    return (
        <div className="clock">
            <h1 className="contest"> Contest is running !! {23 - hours} hr  {60 - minutes} min  {60 - seconds} s <TfiTimer /></h1>
        </div>
    )
}

export default Clock;