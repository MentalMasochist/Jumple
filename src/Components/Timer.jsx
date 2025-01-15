import React, { useState, useEffect } from 'react';
import { getDate } from '../getDate';


const Timer = () => {
    const apiDate = getDate();

    const [timeRemaining, setTimeRemaining] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const now = new Date(Date.UTC(apiDate.year, apiDate.month - 1, apiDate.day, apiDate.hour, apiDate.minute, apiDate.seconds));
        const nextMidnight = new Date(Date.UTC(apiDate.year, apiDate.month - 1, apiDate.day + 1));

        const timeDifference = nextMidnight - now;
        const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
        const seconds = Math.floor((timeDifference / 1000) % 60);

        setTimeRemaining({ hours, minutes, seconds });

        const timerId = setInterval(() => {
            setTimeRemaining((prev) => {
                const newSeconds = prev.seconds - 1;
                const newMinutes = newSeconds < 0 ? prev.minutes - 1 : prev.minutes;
                const newHours = newMinutes < 0 ? prev.hours - 1 : prev.hours;

                return {
                    hours: newHours < 0 ? 0 : newHours,
                    minutes: newMinutes < 0 ? 59 : newMinutes,
                    seconds: newSeconds < 0 ? 59 : newSeconds,
                };
            });
        }, 1000);

        return () => clearInterval(timerId);
    }, []);

    return (
        <p className='timer'>
            Next screen: {" "}
            {String(timeRemaining.hours).padStart(2, '0')}:
            {String(timeRemaining.minutes).padStart(2, '0')}:
            {String(timeRemaining.seconds).padStart(2, '0')}
        </p>
    );
};

export default Timer;
