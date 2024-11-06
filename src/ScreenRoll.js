import MapsJSON from './mapsStructure.json';
import { getSeed } from './getSeed';
import seedrandom from 'seedrandom';

const seed = await getSeed();

export function ScreenRoll() {
    const rng = seedrandom(seed); 
    const maps = MapsJSON.Maps;

    const allAreas = [];
    maps.forEach((map, mapIndex) => {
        map.Areas.forEach((area, areaIndex) => {
            allAreas.push({ map, mapIndex, area, areaIndex });
        });
    });

    const randomAreaIndex = Math.floor(rng() * allAreas.length);
    const { map, mapIndex, area, areaIndex } = allAreas[randomAreaIndex];

    const screenIndex = Math.floor(rng() * area.Screens.length);
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