import React from "react";
import NexileMapsJSON from '../nexileMapsJSON.json';
import { Button } from "@mui/material";
import { Stack } from "@mui/material";
import { Paper } from "@mui/material";
import { useDailyLocalState } from '../customHooks.js';
import { getScreenRoll } from "../ScreenRoll.js";


const MapGuess = ({ incrementMistake, setGuessStatus }) => {
    const nexileMapNames = NexileMapsJSON.NexileMaps.map(map => map.MapName);

    const roll = getScreenRoll().NexileRoll;


    const [buttonStates, setButtonStates] = useDailyLocalState({}, "mapGuessButtonStates", "nexile");

    const handleClick = (map) => {
        if (map == roll.mapName) {
            const newButtonStates = {};
            nexileMapNames.forEach(name => {
                newButtonStates[name] = {
                    color: name === roll.mapName ? "success" : "error",
                    customDisable: "true"
                };
            });
            setButtonStates(newButtonStates);

            setGuessStatus(prevState => ({
                ...prevState,
                "isMapGuessed": true
            }));

        } else {
            setButtonStates(prevStates => ({
                ...prevStates,
                [map]: {
                    color: "error",
                    variant: "outlined",
                    customDisable: "true"
                }
            }));

            incrementMistake('map');
        }
    };

    return (
        <Paper sx={{ padding: 2, textAlign: "center" }} variant="outlined">
            <Stack spacing={1} direction="row" justifyContent="space-evenly">
                {nexileMapNames.map(map => {
                    return (
                        <div key={map} className="guessMapButton" data-custom-disable={buttonStates[map]?.customDisable || "false"}>
                            <Button
                                variant="contained"
                                color={buttonStates[map]?.color || "primary"}
                                onClick={() => handleClick(map)}
                                sx={{
                                    fontFamily: 'JKFontBold',
                                    fontSize: '120%',
                                    "&.MuiButton-containedSuccess": {
                                        backgroundColor: "#85e376",
                                        color: "#11910f"
                                    },
                                    "&.MuiButton-containedError": {
                                        backgroundColor: "#e37d76",
                                        color: "#91170f"
                                    }
                                }}
                            >
                                {map}
                            </Button>
                        </div>
                    )
                })}
            </Stack>
        </Paper>
    )
}

export default MapGuess;