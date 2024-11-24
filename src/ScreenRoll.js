import NexileMapsJSON from './nexileMapsJSON.json';
import CustomMapsJSON from './customMapsJSON.json';
import { getSeeds } from './Seeds';
import seedrandom from 'seedrandom';


// DELETE "Jumple/" FOR DEPLOYMENT FOR WHATEVER THE FUCK REASON
const retardMoment = "";

const { nexileSeeds, customSeeds } = await getSeeds();

export function ScreenRoll() {
    const NexileMaps = NexileMapsJSON.NexileMaps;
    const CustomMaps = CustomMapsJSON.CustomMaps;

    const NexileAreas = [];
    NexileMaps.forEach((nexileMap, nexileMapIndex) => {
        nexileMap.Areas.forEach((nexileArea, nexileAreaIndex) => {
            NexileAreas.push({ nexileMap, nexileMapIndex, nexileArea, nexileAreaIndex });
        });
    });

    const randomNexileAreaIndex = Math.floor(nexileSeeds.randomAreaSeed * NexileAreas.length);
    const { nexileMap, nexileMapIndex, nexileArea, nexileAreaIndex } = NexileAreas[randomNexileAreaIndex];

    const nexileScreenIndex = Math.floor(nexileSeeds.randomScreenSeed * nexileArea.Screens.length);
    const nexileScreenName = nexileArea.Screens[nexileScreenIndex];


    const nexileScreenPath = `${retardMoment}NexileMaps/${nexileMap.MapName}/${nexileArea.AreaName.replace(/'/g, '%27')}/${nexileScreenName}`;

    const CustomAreas = [];
    CustomMaps.forEach((customMap, customMapIndex) => {
        customMap.Areas.forEach((customArea, customAreaIndex) => {
            CustomAreas.push({ customMap, customMapIndex, customArea, customAreaIndex });
        });
    });

    const randomCustomAreaIndex = Math.floor(customSeeds.randomAreaSeed * CustomAreas.length);
    const { customMap, customMapIndex, customArea, customAreaIndex } = CustomAreas[randomCustomAreaIndex];

    const customScreenIndex = Math.floor(customSeeds.randomScreenSeed * customArea.Screens.length);
    const customScreenName = customArea.Screens[customScreenIndex];

    const customScreenPath = `${retardMoment}CustomMaps/${customMap.MapName}/${customArea.AreaName.replace(/'/g, '%27')}/${customScreenName}`;


    return {
        NexileRoll: {
            mapName: nexileMap.MapName,
            mapIndex: nexileMapIndex,
            areaName: nexileArea.AreaName,
            areaIndex: nexileAreaIndex,
            screenName: nexileScreenName,
            screenNumber: nexileScreenIndex + 1,
            screenPath: nexileScreenPath
        },
        CustomRoll: {
            mapName: customMap.MapName,
            mapIndex: customMapIndex,
            areaName: customArea.AreaName,
            areaIndex: customAreaIndex,
            screenName: customScreenName,
            screenNumber: customScreenIndex + 1,
            screenPath: customScreenPath
        }
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