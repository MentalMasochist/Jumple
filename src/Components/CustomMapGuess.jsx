import { React, useState } from "react";
import { Paper, Autocomplete, TextField, Button, Grid2 } from "@mui/material";
import CustomMapsJSON from '../customMapsJSON.json'
import { useDailyLocalState } from "../CustomHooks.js";
import { getScreenRoll } from "../ScreenRoll.js";


const CustomMapGuess = ({ incrementMistake, guessStatus, setGuessStatus }) => {
    const initailCustomMapNames = CustomMapsJSON.CustomMaps.map(map => map.MapName);
    const roll = getScreenRoll().CustomRoll;


    const [value, setValue] = useDailyLocalState(null, "mapValue", "custom");
    const [inputValue, setInputValue] = useState('', "mapInputValue", "custom");
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
                    <div className="guessCustomMapButton" data-custom-disable={guessStatus.isMapGuessed} style={{height: "100%"}}>
                        <Button
                            sx={{
                                fontFamily: "JKFontMini",
                                fontSize: "22px",
                                height: "100%",
                                "&.MuiButton-containedSuccess": {
                                    backgroundColor: "#85e376",
                                    color: "#11910f",
                                },
                                "&.MuiButton-containedError": {
                                    backgroundColor: "#e37d76",
                                    color: "#91170f",
                                    "&:hover": {
                                        backgroundColor: "#C6615A",
                                    },
                                }
                            }}
                            variant="contained"
                            color={buttonColor}
                            onClick={guess}
                            fullWidth>
                            Guess map
                        </Button>
                    </div>
                </Grid2>
            </Grid2>



        </Paper>
    )
}

export default CustomMapGuess;