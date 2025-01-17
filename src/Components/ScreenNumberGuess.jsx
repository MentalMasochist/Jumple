import { React, useEffect, useState } from "react";
import { Button, Paper, Grid2, Stack } from "@mui/material";
import { useDailyLocalState } from '../customHooks.js';
import { getScreenRoll } from "../ScreenRoll.js";


const ScreenNumberGuess = ({ incrementMistake, guessStatus, setGuessStatus, jumpleMode }) => {
    const screenRoll = getScreenRoll();

    const roll = {
        nexile: screenRoll["NexileRoll"],
        custom: screenRoll["CustomRoll"]
    }

    const screenCap = {
        nexile: 10,
        custom: 21
    }

    const [number, setNumber] = useState(1);
    const [guessedNumbers, setGuessedNumbers] = useDailyLocalState([], "guessedNumbers", jumpleMode);
    const [buttonDisableState, setButtonDisableState] = useState(false);

    useEffect(() => {
        const numberMap = guessedNumbers.map(number => number.number);

        if (numberMap.includes(number)) {
            setButtonDisableState(true);
        } else {
            setButtonDisableState(false);
        }
    }, [number, guessedNumbers])


    function increment() {
        if (number >= screenCap[jumpleMode]) return;
        setNumber(number + 1);
    }

    function decrement() {
        if (number <= 1) return;
        setNumber(number - 1);
    }

    function guess(guessedNumber) {
        if (guessedNumber == roll[jumpleMode].screenNumber) {
            setGuessedNumbers(oldNumbers => [...oldNumbers, {
                number: number,
                isCorrect: true
            }]);

            setGuessStatus(prevState => ({
                ...prevState,
                "isScreenGuessed": true
            }));

        } else {
            setGuessedNumbers(oldNumbers => [...oldNumbers, {
                number: number,
                isCorrect: false
            }]);

            incrementMistake('screen');
        }
    }

    return (
        <Paper sx={{
            padding: 2,
            textAlign: "center",
            filter: guessStatus.isAreaGuessed ? "blur(0px)" : "blur(5px)"
        }} variant="outlined">
            <p style={{ fontSize: 100, margin: 0 }}>{number}</p>

            <Grid2 container spacing={1}>
                <Grid2 size={6}>
                    <Button fullWidth disabled={guessStatus.isScreenGuessed || !guessStatus.isAreaGuessed} onClick={decrement} variant="outlined">{"<"}</Button>
                </Grid2>
                <Grid2 size={6}>
                    <Button fullWidth disabled={guessStatus.isScreenGuessed || !guessStatus.isAreaGuessed} onClick={increment} variant="outlined">{">"}</Button>
                </Grid2>
                <Grid2 size={12}>
                    <Button onClick={() => guess(number)}
                        disabled={buttonDisableState || !guessStatus.isAreaGuessed || guessStatus.isScreenGuessed}
                        size="small"
                        sx={{ fontFamily: "JKFontMini", fontSize: "20px", padding: "0" }}
                        fullWidth
                        variant="contained">
                        Guess screen number
                    </Button>
                </Grid2>
            </Grid2>
            <Stack direction="row" sx={{ justifyContent: "center", flexWrap: "wrap", marginTop: 1, gap: 0.8 }}>
                {guessedNumbers.map(number => {
                    return (
                        <Paper sx={{
                            backgroundColor: number.isCorrect ? "#85e376" : '#e37d76',
                            color: number.isCorrect ? "#11910f" : "#91170f",
                            width: "32px",
                            paddingY: 1,
                            fontSize: "20px"
                        }} key={number.number}>{number.number}</Paper>
                    )
                })}
            </Stack>
        </Paper>
    )
}

export default ScreenNumberGuess;