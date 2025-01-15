import { setSeeds } from "./Seeds";
import { setScreenRoll } from "./ScreenRoll";

let cachedDate = null;

export async function fetchDate(){
    const response = await fetch("https://timeapi.io/api/Time/current/zone?timeZone=UTC");
    const data = await response.json();

    cachedDate = data;

    setSeeds();
    setScreenRoll();
}

export function getDate(){
    if(cachedDate === null){
        throw new Error("Date not fetched yet");
    }

    return cachedDate;
}