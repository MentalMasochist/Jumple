import { React, useEffect } from "react";
import { ScreenRoll } from "../ScreenRoll";
import { getSeed } from "../getSeed.js";
import * as Utils from '../Utils.js';
import { useOnUpdate, useDailyLocalState } from "../CustomHooks.js";
import seedrandom from 'seedrandom';

const img = ScreenRoll().screenPath;
const seed = await getSeed();

const ScreenImage = ({ mistakeCount, guessStatus, hardModeState }) => {
    const initialZoom = 10;
    const { size: initialSize, minxvalue, maxxvalue } = Utils.calculateDimensions(initialZoom);

    const rng = seedrandom(seed);
    const randomXPosition = minxvalue + rng() * (maxxvalue - minxvalue);
    const randomYPosition = rng() * 100;

    const rotations = [0, 90, 180, 270];
    const randomRotation = rotations[Math.floor(rng() * 4)];

    const [xPositionState, setxPositionState] = useDailyLocalState(randomXPosition, "xPositionState");
    const [yPositionState] = useDailyLocalState(randomYPosition, "yPositionState");
    const [zoomState, setZoomState] = useDailyLocalState(initialZoom, "zoomState");
    const [sizeState, setSizeState] = useDailyLocalState(initialSize, "sizeState");


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
        <div style={{
            aspectRatio: 4 / 3,
            width: "100%",
            maxWidth: "28rem",
            border: "8px solid #121212",
            borderRadius: "3px",
            overflow: "hidden",
            backgroundColor: "#121212",
            position: "relative"
        }}>
            {(hardModeState && !guessStatus.isScreenGuessed) &&
                <div style={{
                    display: 'flex',
                    width: '100%',
                    height: "100%",
                    position: "absolute"
                }}>
                    <div style={{ flex: 1, backgroundColor: "#121212", zIndex: 1}}></div>
                    <div style={{ width: "auto", height: "100%", aspectRatio: "1/1" }}></div>
                    <div style={{ flex: 1, backgroundColor: "#121212", zIndex: 1 }}></div>
                </div>
            }

            <div style={{
                width: "100%",
                height: "100%",
                background: `url('${img}')`,
                backgroundRepeat: "no-repeat",
                backgroundPositionX: `${xPositionState}%`,
                backgroundPositionY: `${yPositionState}%`,
                backgroundSize: `${sizeState}%`,
                rotate: (hardModeState && !guessStatus.isScreenGuessed) ? `${randomRotation}deg` : "0deg",
                filter: `grayscale(${(hardModeState && !guessStatus.isScreenGuessed) ? `1` : "0"})`
            }}>
            </div>
        </div>

    )
}

export default ScreenImage;