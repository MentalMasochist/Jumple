import MapsJSON from './mapsStructure.json';
import { getSeeds } from './Seeds';
import seedrandom from 'seedrandom';

const { randomAreaSeed, randomScreenSeed } = await getSeeds();

export function ScreenRoll() {
    const maps = MapsJSON.Maps;

    const allAreas = [];
    maps.forEach((map, mapIndex) => {
        map.Areas.forEach((area, areaIndex) => {
            allAreas.push({ map, mapIndex, area, areaIndex });
        });
    });


    const randomAreaIndex = Math.floor(randomAreaSeed * allAreas.length);
    const { map, mapIndex, area, areaIndex } = allAreas[randomAreaIndex];

    const screenIndex = Math.floor(randomScreenSeed * area.Screens.length);
    const screenName = area.Screens[screenIndex];

    // DELETE "Jumple/" FOR DEPLOYMENT FOR WHATEVER THE FUCK REASON
    const screenPath = `Jumple/Maps/${map.MapName}/${area.AreaName.replace(/'/g, '%27')}/${screenName}`;

    return {
        mapName: map.MapName,
        mapIndex: mapIndex,
        areaName: area.AreaName,
        areaIndex: areaIndex,
        screenName: screenName,
        screenNumber: screenIndex + 1,
        screenPath: screenPath
    };
}


/*  simulation shit


const maps = MapsJSON.Maps;

const screenDistribution = {};
const areaCount = {};
const screenIndexCount = {};

maps.forEach((map) => {
  map.Areas.forEach((area) => {
    screenDistribution[area.AreaName] = {};
    areaCount[area.AreaName] = 0; 
    area.Screens.forEach((screen, index) => {
      screenDistribution[area.AreaName][screen] = 0; 
      screenIndexCount[index] = 0; 
    });
  });
});

function addDays(date, days) {
  const result = new Date(date);
  result.setUTCDate(result.getUTCDate() + days);
  return result;
}

const startDate = new Date("2024-11-24");
const iterations = 10; 

for (let i = 0; i < iterations; i++) {
  const currentDate = addDays(startDate, i);
  const rng = seedrandom(currentDate.toISOString().split("T")[0]);

  const allAreas = [];
  maps.forEach((map, mapIndex) => {
    map.Areas.forEach((area, areaIndex) => {
      allAreas.push({ map, mapIndex, area, areaIndex });
    });
  });

  const randomAreaIndex = Math.floor(rng() * allAreas.length);
  const { area } = allAreas[randomAreaIndex];

  areaCount[area.AreaName]++;

  const screenIndex = Math.floor(rng() * area.Screens.length);
  const screenName = area.Screens[screenIndex];

  screenDistribution[area.AreaName][screenName]++;

  screenIndexCount[screenIndex]++;
}

console.log("Area Counts:");
console.log(areaCount);

console.log("Screen Distribution:");
console.log(screenDistribution);

console.log("Screen Index Counts:");
console.log(screenIndexCount);
*/