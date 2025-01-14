import seedrandom from "seedrandom";
import getDate from './getDate.js';

const apiDate = await getDate();
const date = apiDate.dateTime.slice(0, 10);

const rng = seedrandom(date);

const seeds = {
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
    }
}

export default seeds;