import { React } from "react";
import * as Utils from '../JsHelperScripts/utils.js';
import { useOnUpdate, useDailyLocalState } from "../JsHelperScripts/customHooks.js";
import { getScreenRoll } from "../JsHelperScripts/screenRoll.js";
import { getSeeds } from "../JsHelperScripts/seeds.js";

const ScreenImage = ({ mistakeCount, guessStatus, hardModeState, jumpleMode }) => {
    const screenRoll = getScreenRoll();
    const seeds = getSeeds();

    const rolls = {
        nexile: screenRoll.NexileRoll.screenPath,
        custom: screenRoll.CustomRoll.screenPath
    };

    const img = rolls[jumpleMode];
    const seed = seeds[jumpleMode];

    const initialZoom = 10;
    const { size: initialSize, minxvalue, maxxvalue } = Utils.calculateDimensions(initialZoom);

    const randomXPosition = minxvalue + seed.randomXSeed * (maxxvalue - minxvalue);
    const randomYPosition = seed.randomYSeed * 100;

    const rotations = [0, 90, 180, -90];
    const randomRotation = rotations[Math.floor(seed.randomRotationSeed * 4)];

    const [xPositionState, setxPositionState] = useDailyLocalState(randomXPosition, "xPositionState", jumpleMode);
    const [yPositionState] = useDailyLocalState(randomYPosition, "yPositionState", jumpleMode);
    const [zoomState, setZoomState] = useDailyLocalState(initialZoom, "zoomState", jumpleMode);
    const [sizeState, setSizeState] = useDailyLocalState(initialSize, "sizeState", jumpleMode);


    useOnUpdate(() => {
        decreaseZoom();
    }, [mistakeCount])

    useOnUpdate(() => {
        if (guessStatus.isScreenGuessed) {
            unzoom();
        }
    }, [guessStatus])


    function decreaseZoom() {
        const newZoom = zoomState - 1;
        const scaledZoom = Utils.zoomScalar(initialZoom, newZoom);
        const { size: newSize, minxvalue: newMinxValue, maxxvalue: newMaxxValue } = Utils.calculateDimensions(scaledZoom);

        if (xPositionState < newMinxValue) {
            setxPositionState(newMinxValue);
        } else if (xPositionState > newMaxxValue) {
            setxPositionState(newMaxxValue);
        }

        setZoomState(Math.max(2, newZoom));
        setSizeState(newSize);
    }

    function unzoom() {
        setSizeState(400 / 3);
        setxPositionState(50);
    }


    return (
        <div className="imageContainer">
            {(hardModeState && !guessStatus.isScreenGuessed) &&
                <div style={{
                    display: 'flex',
                    width: '100%',
                    height: "100%",
                    position: "absolute"
                }}>
                    <div style={{ flex: 1, backgroundColor: "#121212", zIndex: 1 }}></div>
                    <div style={{ width: "auto", height: "100%", aspectRatio: "1/1" }}></div>
                    <div style={{ flex: 1, backgroundColor: "#121212", zIndex: 1 }}></div>
                </div>
            }

            <div className="imageDiv" style={{
                background: `url('${img}')`,
                backgroundPositionX: `${xPositionState}%`,
                backgroundPositionY: `${yPositionState}%`,
                backgroundSize: `${sizeState}%`,
                rotate: (hardModeState && !guessStatus.isScreenGuessed) ? `${randomRotation}deg` : "0deg",
                filter: `grayscale(${(hardModeState && !guessStatus.isScreenGuessed) ? `1` : "0"})`,
                transition: guessStatus.isScreenGuessed && hardModeState
                    ? "rotate 1s, background-size ease-out 1s 1s, background-position-x cubic-bezier(1, 0, 0.85, 0.85) 0.9s 1s, filter 1s"
                    : "background-size 1s, background-position-x 1s, rotate 1s, filter 1s",
            }}>
            </div>
        </div>
    )
}

export default ScreenImage;