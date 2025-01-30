import seedrandom from "seedrandom";
import { getDate } from './getDate.js';

let seeds = null;

export function setSeeds(){
    const apiDate = getDate();
    const date = apiDate.dateTime.slice(0, 10);
    const rng = seedrandom(date + 289);
    //we do a little seed change

    seeds = {
        nexile: {
            randomAreaSeed: rng(),
            randomScreenSeed: rng(),
            randomXSeed: rng(),
            randomYSeed: rng(),
            randomRotationSeed: rng(),
        },
    
        custom: {
            randomAreaSeed: rng(),
            randomScreenSeed: rng(),
            randomXSeed: rng(),
            randomYSeed: rng(),
            randomRotationSeed: rng(),
        },

        src: rng()
    }
}

export function getSeeds(){
    if(seeds === null){
        throw new Error("Seeds not set yet");
    }

    return seeds;
}