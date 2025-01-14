import { React, useState } from "react";
import { Paper, Autocomplete, TextField, Button, Grid2 } from "@mui/material";
import CustomMapsJSON from '../customMapsJSON.json'
import screenRoll from "../screenRoll";
import { useDailyLocalState } from "../CustomHooks";


const initailCustomMapNames = CustomMapsJSON.CustomMaps.map(map => map.MapName);
const roll = screenRoll.CustomRoll;


const CustomMapGuess = ({ incrementMistake, guessStatus, setGuessStatus }) => {
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [customMapNames, setCustomMapNames] = useDailyLocalState(initailCustomMapNames, "mapNamesStates", "custom");
    const [buttonColor, setButtonColor] = useDailyLocalState("primary", "mapButtonColorState", "custom");

    function guess() {
        if (value == null) return;

        if (value == roll.mapName) {
            setGuessStatus(prevState => ({
                ...prevState,
                "isMapGuessed": true
            }));
            setButtonColor("success");
        } else {
            setCustomMapNames(customMapNames.filter(map => map != value));
            setValue(null);
            incrementMistake('map');
            setButtonColor("error");
        }
    }

    return (
        <Paper variant="outlined" sx={{ padding: "10px" }}>
            <Grid2 container spacing={0.5}>
                <Grid2 size={9}>
                    <Autocomplete
                        disabled={guessStatus.isMapGuessed}
                        options={customMapNames}
                        value={value}
                        inputValue={inputValue}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                        }}
                        renderInput={(params) => <TextField {...params}
                            label="Map"
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
                </Grid2>
                <Grid2 size={3}>
                    <Button
                        sx={{
                            height: "100%",
                            fontFamily: "JKFontMini",
                            fontSize: "22px",
                            padding: 0
                        }}
                        variant="contained"
                        color={buttonColor}
                        onClick={guess}
                        fullWidth>
                        Guess map
                    </Button>
                </Grid2>
            </Grid2>



        </Paper>
    )
}

export default CustomMapGuess;