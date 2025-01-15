import React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import { getDate } from "../getDate";


const ShareButton = ({ guessStatus, wrongGuesses, mistakeCount, hardModeState, jumpleMode }) => {
    const apiDate = getDate();

    const [isCoppied, setIsCoppied] = useState(false);
    const mode = {
        nexile: "(Nexile Maps)",
        custom: "(Custom Maps)"
    }

    const display = guessStatus.isScreenGuessed ? "inline" : "none";

    function clipboardShare() {
        const generateSquares = (count) => '🟥'.repeat(count) + '🟩';

        const mapSquares = generateSquares(wrongGuesses.map);
        const areaSquares = generateSquares(wrongGuesses.area);
        const screenSquares = generateSquares(wrongGuesses.screen);
        const hardModeFinish = hardModeState ? "✔" : "❌";

        const copyText = `Jumple ${mode[jumpleMode]} ${apiDate.dateTime.slice(0, 10)} Mistakes: ${mistakeCount}\n\nMap guesses: ${mapSquares}\nArea guesses: ${areaSquares}\nScreen guesses: ${screenSquares}\nHard mode: ${hardModeFinish}`;

        navigator.clipboard.writeText(copyText);
        setIsCoppied(true);
    }

    return (
        <Button
            onClick={clipboardShare}
            variant={isCoppied ? "contained" : "outlined"}
            sx={{
                marginBottom: "0.5rem",
                fontFamily: "JKFontMini",
                fontSize: "20px",
                "&.MuiButton-outlined":{
                    borderTopLeftRadius: "0",
                    borderTopRightRadius: "0",
                },
                "&.MuiButton-contained":{
                    borderTop: "none",
                    borderTopLeftRadius: "0",
                    borderTopRightRadius: "0",
                },
                display: display
            }}
            disableElevation >copy score</Button>
    )
}

export default ShareButton;