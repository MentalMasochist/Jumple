import { React } from "react";
import { ScreenRoll } from "../ScreenRoll";
import { getSeed } from "../getSeed.js";
import * as Utils from '../Utils.js';
import { useOnUpdate, useLocalState } from "../CustomHooks.js";
import seedrandom from 'seedrandom';

const img = ScreenRoll().screenPath;
const seed = await getSeed();

const ScreenImage = ({ mistakeCount, guessStatus }) => {
    const initialZoom = 10;
    const { size: initialSize, minxvalue, maxxvalue } = Utils.calculateDimensions(initialZoom);

    const rng = seedrandom(seed); 
    const randomXPosition = minxvalue + rng() * (maxxvalue - minxvalue); 
    const randomYPosition = rng() * 100; 

    const [xPositionState, setxPositionState] = useLocalState(randomXPosition, "xPositionState");
    const [yPositionState] = useLocalState(randomYPosition,"yPositionState");
    const [zoomState, setZoomState] = useLocalState(initialZoom,"zoomState");
    const [sizeState, setSizeState] = useLocalState(initialSize,"sizeState");


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
                width:"100%",
                maxWidth:"28rem",
                background: `url('${img}')`,
                backgroundRepeat: "no-repeat",
                backgroundPositionX: `${xPositionState}%`,
                backgroundPositionY: `${yPositionState}%`,
                backgroundSize: `${sizeState}%`,
                borderRadius: 0.000001, //xd
                margin: "0.5rem",
                outline: "8px solid #121212"
            }}></div>

    )
}

export default ScreenImage;