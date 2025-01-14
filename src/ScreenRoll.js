import NexileMapsJSON from './nexileMapsJSON.json';
import CustomMapsJSON from './customMapsJSON.json';
import seeds from './seeds';


// DELETE "Jumple/" FOR DEPLOYMENT FOR WHATEVER THE FUCK REASON
const retardMoment = "";


const NexileMaps = NexileMapsJSON.NexileMaps;
const CustomMaps = CustomMapsJSON.CustomMaps;

const NexileAreas = [];
NexileMaps.forEach((nexileMap, nexileMapIndex) => {
    nexileMap.Areas.forEach((nexileArea, nexileAreaIndex) => {
        NexileAreas.push({ nexileMap, nexileMapIndex, nexileArea, nexileAreaIndex });
    });
});

const randomNexileAreaIndex = Math.floor(seeds.nexile.randomAreaSeed * NexileAreas.length);
const { nexileMap, nexileMapIndex, nexileArea, nexileAreaIndex } = NexileAreas[randomNexileAreaIndex];

const nexileScreenIndex = Math.floor(seeds.nexile.randomScreenSeed * nexileArea.Screens.length);
const nexileScreenName = nexileArea.Screens[nexileScreenIndex];

const nexileScreenPath = `${retardMoment}NexileMaps/${nexileMap.MapName}/${nexileArea.AreaName.replace(/'/g, '%27')}/${nexileScreenName}`;

const CustomAreas = [];
CustomMaps.forEach((customMap, customMapIndex) => {
    customMap.Areas.forEach((customArea, customAreaIndex) => {
        CustomAreas.push({ customMap, customMapIndex, customArea, customAreaIndex });
    });
});

const randomCustomAreaIndex = Math.floor(seeds.custom.randomAreaSeed * CustomAreas.length);
const { customMap, customMapIndex, customArea, customAreaIndex } = CustomAreas[randomCustomAreaIndex];

const customScreenIndex = Math.floor(seeds.custom.randomScreenSeed * customArea.Screens.length);
const customScreenName = customArea.Screens[customScreenIndex];

const customScreenPath = `${retardMoment}CustomMaps/${customMap.MapName}/${customArea.AreaName.replace(/'/g, '%27')}/${customScreenName}`;

const screenRoll = {
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

export default screenRoll;