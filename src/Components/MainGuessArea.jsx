import { React } from 'react'
import MapGuess from "./MapGuess.jsx";
import AreaGuess from "./AreaGuess.jsx";
import ScreenNumberGuess from "./ScreenNumberGuess.jsx";
import { Paper, Grid2 } from "@mui/material";
import ShareButton from './ShareButton.jsx';
import ScreenImage from './ScreenImage.jsx';
import * as Utils from '../Utils.js';
import { useDailyLocalState } from '../CustomHooks.js';
import HardModeCheckbox from './HardModeCheckbox.jsx';
import MistakeCount from './MistakeCount.jsx';

const MainGuessArea = () => {
    const [mistakeCount, setMistakeCount] = useDailyLocalState(0, "mistakeCount");
    const [hardModeState, setHardModeState] = useDailyLocalState(true, "hardmode");

    const [guessStatus, setGuessStatus] = useDailyLocalState({
        isMapGuessed: false,
        isAreaGuessed: false,
        isScreenGuessed: false
    }, "guessStatus")

    const [wrongGuesses, setWrongGuesses] = useDailyLocalState({
        map: 0,
        area: 0,
        screen: 0
    }, "wrongGuesses")

    function incrementMistake(property) {
        setWrongGuesses(prevState => ({
            ...prevState,
            [property]: prevState[property] + 1
        }));

        setMistakeCount(mistakeCount + 1);
    }

    return (
        <>
            <ScreenImage mistakeCount={mistakeCount} guessStatus={guessStatus} hardModeState={hardModeState} />

            <div style={{ display: "flex" }}>
                <HardModeCheckbox hardModeState={hardModeState} setHardModeState={setHardModeState} guessStatus={guessStatus} />

                <MistakeCount mistakeCount={mistakeCount} guessStatus={guessStatus} />

                <ShareButton wrongGuesses={wrongGuesses} mistakeCount={mistakeCount} guessStatus={guessStatus} hardModeState={hardModeState} />
            </div>

            <Grid2 container spacing={2} sx={{ maxWidth: "35rem" }}>
                <Grid2 size={12}>
                    <MapGuess incrementMistake={incrementMistake} setGuessStatus={setGuessStatus} />
                </Grid2>
                <Grid2 size={6}>
                    <AreaGuess incrementMistake={incrementMistake} guessStatus={guessStatus} setGuessStatus={setGuessStatus} />
                </Grid2>
                <Grid2 size={6}>
                    <ScreenNumberGuess incrementMistake={incrementMistake} guessStatus={guessStatus} setGuessStatus={setGuessStatus} />
                </Grid2>
            </Grid2>
        </>
    );
}

export default MainGuessArea;