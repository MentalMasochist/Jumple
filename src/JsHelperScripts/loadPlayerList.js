import fs from 'fs';

const jkGameID = "268ekxy6";
const mainBabeCategoryID = "n2y7rvz2";
const cycleVariableID = "68kokwqn";

const cycleValuesIDs = {
    "810yj92l": "-1",
    "9qjone3l": "0",
    "jq6wrgjl": "1",
    "5lme6wmq": "2",
    "81wjo3vq": "3+",
};

const newBabeCategoryID = "9d8x83q2";
const ghostOfTheBabeCategoryID = "mke9q6jd";

const otherCateogriesIDs = [
    "xd1vjyzd",
    "5dw6nnl2",
    "zd38zz8k",
    "9kv711ok",
    "w20v998k",
    "z274lwo2",
    "zdnlxzx2",
    "9d85ly3d",
    "w20o1m82"
]

let callCount = 0;

async function fetchMainBabeRuns(offset = 0) {
    const response = await fetch(`https://www.speedrun.com/api/v1/runs?game=${jkGameID}&category=${mainBabeCategoryID}&orderby=date&direction=asc&max=200&embed=players&offset=${offset}`);
    console.log(`Calls made: ${++callCount}`);
    return response.json();
}

async function fetchCategoryLeaderboard(categoryID) {
    const response = await fetch(`https://www.speedrun.com/api/v1/leaderboards/${jkGameID}/category/${categoryID}`);
    console.log(`Calls made: ${++callCount}`);
    return response.json();
}

function buildRun(apiRun) {
    const playerID = apiRun.players.data[0].id;
    const playerName = apiRun.players.data[0].names.international;
    const runTime = apiRun.times.primary_t;
    const runDate = apiRun.date;
    const runCycle = cycleValuesIDs[apiRun.values[cycleVariableID]];
    const playerNationalityName = apiRun.players.data[0].location?.country.names.international;
    const playerNationalityCode = apiRun.players.data[0].location?.country.code;

    return {
        id: playerID,
        name: playerName,
        runDate: runDate,
        time: runTime,
        cycle: runCycle,
        nationality: {
            name: playerNationalityName,
            code: playerNationalityCode,
        },
    };
}

function calculatePeakPlace(runs, newestRun) {
    const seenRuns = new Map();
    runs.sort((a, b) => a.time - b.time).forEach(run => {
        if (!seenRuns.has(run.id)) seenRuns.set(run.id, run);
    });
    return Array.from(seenRuns.values()).findIndex(run => run.id === newestRun.id) + 1;
}

async function updatePlayerMapForCategory(players, categoryID, mapKey) {
    const leaderboard = await fetchCategoryLeaderboard(categoryID);
    const playerIDs = leaderboard.data.runs.map(run => run.run.players[0].id);

    for (const playerID of playerIDs) {
        if (players.has(playerID)) {
            players.get(playerID).otherMaps[mapKey] = true;
        }
    }
}

async function updatePlayerMaps(players) {
    const categoryUpdates = [
        { id: newBabeCategoryID, key: 'newBabe' },
        { id: ghostOfTheBabeCategoryID, key: 'ghostOfTheBabe' },
        ...otherCateogriesIDs.map(id => ({ id, key: 'other' })),
    ];

    for (const { id, key } of categoryUpdates) {
        await updatePlayerMapForCategory(players, id, key);
    }
}

async function getRuns() {
    const runs = [];
    let offset = 0;

    try {
        while (true) {
            const data = await fetchMainBabeRuns(offset);
            offset += 200;

            for (const apiRun of data.data) {
                if (apiRun.status.status === "rejected" || apiRun.status.status === "new") continue;
                runs.push(buildRun(apiRun));
            }

            if (data.pagination.size != 200) break;
        }

        const players = new Map();

        for (let i = 0; i < runs.length; i++) {
            const currentRun = runs[i];
            const runsOnCurrentDate = runs.slice(0, i + 1);
            const peakPlace = calculatePeakPlace(runsOnCurrentDate, currentRun);

            if (players.has(currentRun.id)) {
                const player = players.get(currentRun.id);

                if (peakPlace < player.peakPlace) player.peakPlace = peakPlace;

                if (currentRun.time < player.pb.time) {
                    player.pb = {
                        time: currentRun.time,
                        date: currentRun.runDate,
                        cycle: currentRun.cycle,
                    };
                }
            } else {
                players.set(currentRun.id, {
                    id: currentRun.id,
                    name: currentRun.name,
                    pb: {
                        time: currentRun.time,
                        date: currentRun.runDate,
                        cycle: currentRun.cycle,
                    },
                    peakPlace: peakPlace,
                    firstRunDate: currentRun.runDate,
                    nationality: currentRun.nationality,
                    otherMaps: {
                        newBabe: false,
                        ghostOfTheBabe: false,
                        other: false,
                    }
                });
            }
        }

        await updatePlayerMaps(players);

        const playerJSONstring = JSON.stringify(Array.from(players.values()), null, 2);

        fs.writeFile('src/jsonLists/playerList.json', playerJSONstring, (err) => {
            if (err) {
                throw new Error(err);
            } else {
                console.log('JSON file has been saved.');
            }
        });
    } catch (error) {
        throw new Error(error);
    }
}

await getRuns();