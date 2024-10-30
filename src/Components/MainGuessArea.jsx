import { React } from 'react'
import MapGuess from "./MapGuess.jsx";
import AreaGuess from "./AreaGuess.jsx";
import ScreenNumberGuess from "./ScreenNumberGuess.jsx";
import { Paper, Grid2 } from "@mui/material";
import ShareButton from './ShareButton.jsx';
import ScreenImage from './ScreenImage.jsx';
import * as Utils from '../Utils.js';
import { useLocalState } from '../CustomHooks.js';

const MainGuessArea = () => {
    const [mistakeCount, setMistakeCount] = useLocalState(0, "mistakeCount");

    const [guessStatus, setGuessStatus] = useLocalState({
        isMapGuessed: false,
        isAreaGuessed: false,
        isScreenGuessed: false
    }, "guessStatus")

    const [wrongGuesses, setWrongGuesses] = useLocalState({
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
            <ScreenImage mistakeCount={mistakeCount} guessStatus={guessStatus} />

            <div style={{ display: "flex" }}>
                <Paper variant="outline" sx={{ padding: "0.7rem", borderTopLeftRadius: 0, borderTopRightRadius: 0, marginBottom: "0.5rem" }}>
                    <p style={{ margin: 0, fontSize: "20px", color: guessStatus.isScreenGuessed ? Utils.gradientColor(mistakeCount) : "white" }}>Mistakes: {mistakeCount}</p>
                </Paper>

                <ShareButton wrongGuesses={wrongGuesses} mistakeCount={mistakeCount} guessStatus={guessStatus} />
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