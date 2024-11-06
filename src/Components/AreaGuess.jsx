import React from "react";
import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import MapsJSON from '../mapsStructure.json';
import { ScreenRoll } from "../ScreenRoll";
import { Paper, Stack } from "@mui/material";
import { Button } from "@mui/material";
import { useDailyLocalState } from '../CustomHooks.js';


const roll = ScreenRoll();
const mapIndex = roll.mapIndex;
const initialAreas = MapsJSON.Maps[mapIndex].Areas.map(area => area.AreaName);

const AreaGuess = ({ incrementMistake, guessStatus, setGuessStatus }) => {
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [guessedAreas, setGuessedAreas] = useDailyLocalState([], "guessedAreas");
    const [areaNames, setAreaNames] = useDailyLocalState(initialAreas, "areaNames");
    const [disableButton, setDisableButton] = useState(true);

    useEffect(() => {
        if (value == null) {
            setDisableButton(true);
        } else {
            setDisableButton(false);
        }
    }, [value, inputValue])


    function guess() {
        if (value == roll.areaName) {
            setGuessedAreas(oldAreas => [...oldAreas, {
                name: value,
                isCorrect: true
            }]);

            setDisableButton(true);
            setGuessStatus(prevState => ({
                ...prevState,
                "isAreaGuessed": true
            }));

        } else {
            setAreaNames(areaNames.filter(area => area != value));
            setGuessedAreas(oldAreas => [...oldAreas, {
                name: value,
                isCorrect: false
            }]);
            setValue(null);
            incrementMistake('area');
        }
    }


    return (
        <Paper sx={{
            padding: 2,
            textAlign: "center",
            position: "relative",
            filter: guessStatus.isMapGuessed ? "blur(0px)" : "blur(5px)"
        }}
            variant="outlined" >
            <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                options={areaNames}
                disabled={!guessStatus.isMapGuessed || guessStatus.isAreaGuessed}
                renderInput={(params) => <TextField {...params}
                    label="Area"
                    size="small"
                    sx={{
                        "& .MuiInputBase-root": {
                            fontFamily: "JKFontBold",
                        },
                        "& .MuiInputLabel-root": {
                            fontFamily: "JKFontBold",
                        },
                    }}
                    variant="outlined" />}
            />
            <Button onClick={guess} disabled={disableButton} variant="contained" size="small" sx={{ marginTop: 0.5, fontFamily: "JKFontMini", fontSize: "20px", padding: "0" }} fullWidth>Guess area</Button>

            <Stack spacing={0.5} sx={{ marginTop: 1 }} alignItems="center" >
                {guessedAreas.map(area => {
                    return (
                        <Paper sx={{
                            width: "100%",
                            textAlign: "center",
                            padding: 0.5,
                            backgroundColor: area.isCorrect ? "#85e376" : '#e37d76',
                            color: area.isCorrect ? "#11910f" : "#91170f"
                        }}
                            key={area.name}>
                            {area.name}</Paper>
                    )
                })}
            </Stack>
        </Paper >
    )
}

export default AreaGuess;