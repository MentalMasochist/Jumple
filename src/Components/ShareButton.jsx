import React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import { getSeeds } from "../Seeds.js";

const { currentDate } = await getSeeds();

const ShareButton = ({ guessStatus, wrongGuesses, mistakeCount, hardModeState }) => {
    const [isCoppied, setIsCoppied] = useState(false);

    const display = guessStatus.isScreenGuessed ? "inline" : "none";

    function clipboardShare() {
        const generateSquares = (count) => '🟥'.repeat(count) + '🟩';

        const mapSquares = generateSquares(wrongGuesses.map);
        const areaSquares = generateSquares(wrongGuesses.area);
        const screenSquares = generateSquares(wrongGuesses.screen);
        const hardModeFinish = hardModeState ? "✔" : "❌";

        const copyText = `Jumple ${currentDate} Mistakes: ${mistakeCount}\n\nMap guesses: ${mapSquares}\nArea guesses: ${areaSquares}\nScreen guesses: ${screenSquares}\nHard mode: ${hardModeFinish}`;

        navigator.clipboard.writeText(copyText);
        setIsCoppied(true);
    }

    return (
        <Button
            onClick={clipboardShare}
            variant={isCoppied ? "contained" : "outlined"}
            sx={{ marginBottom: "0.5rem", fontFamily: "JKFontMini", fontSize: "20px", display: display }}
            disableElevation >copy score</Button>
    )
}

export default ShareButton;