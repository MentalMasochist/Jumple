import { React, useState } from "react";
import playerList from "../jsonLists/playerList.json";
import { getSeeds } from "../JsHelperScripts/seeds";
import { Autocomplete, TextField, Button } from "@mui/material";
import PlayerSquares from "./PlayerSquares";


const MainSrcGuessArea = () => {
    const leaderboard = playerList.slice(0, 50);

    //const dailyPLayer = leaderboard[Math.floor(getSeeds().src * 50)];
    const dailyPLayer = leaderboard[Math.floor(getSeeds().src * 50)];

    const leaderboardNamesMap = leaderboard.map(player => player.name).sort();

    const [value, setValue] = useState('');
    const [inputValue, setInputValue] = useState('');

    const [guessedPlayers, setGuessedPlayers] = useState([]);

    function guessPlayer() {
        const player = leaderboard.find(player => player.name == value);
        setGuessedPlayers(prevPlayers => [...prevPlayers, player]);
    }

    function test() {
        console.log(guessedPlayers);
    }


    return (
        <>
            <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={leaderboardNamesMap}
                sx={{ width: 300 }}
                filterOptions={(options, state) =>
                    state.inputValue.length > 0
                        ? options.filter((option) =>
                            option.toLowerCase().includes(state.inputValue.toLowerCase())
                        )
                        : []
                }
                noOptionsText={"search for a player"}
                renderInput={(params) => <TextField {...params} label="Controllable" />}
            />

            <Button variant="contained" onClick={() => guessPlayer()}>guess</Button>
            <Button variant="contained" onClick={() => test()}>test</Button>
            <h1 style={{ color: "white" }}>{/*dailyPLayer.name*/}</h1>

            <div className="squareContainer">
                <div className="square">player</div>
                <div className="square">rank (time)</div>
                <div className="square">cycle</div>
                <div className="square">pb date</div>
                <div className="square">nation</div>
                <div className="square">peak rank</div>
                <div className="square">played other maps?</div>
                <div className="square">first run date</div>
            </div>

            {guessedPlayers.map(player => (
                <PlayerSquares player={player} dailyPlayer={dailyPLayer} key={player.id} />
            ))}
        </>

    )
}
export default MainSrcGuessArea;