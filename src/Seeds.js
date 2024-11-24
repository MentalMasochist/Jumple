import seedrandom from "seedrandom";

export async function getSeeds() {
    const response = await fetch("https://timeapi.io/api/Time/current/zone?timeZone=UTC");
    const data = await response.json();
    const date = data.dateTime.slice(0, 10);

    const rng = seedrandom(date);

    return {
        currentDate: date,

        nexileSeeds: {
            randomAreaSeed: rng(),
            randomScreenSeed: rng(),
            randomXSeed: rng(),
            randomYSeed: rng(),
            randomRotationSeed: rng(),
        },

        customSeeds: {
            randomAreaSeed: rng(),
            randomScreenSeed: rng(),
            randomXSeed: rng(),
            randomYSeed: rng(),
            randomRotationSeed: rng(),
        }
    }
}

