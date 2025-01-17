import { React } from 'react'
import NexileMapGuess from "./NexileMapGuess.jsx";
import AreaGuess from "./AreaGuess.jsx";
import ScreenNumberGuess from "./ScreenNumberGuess.jsx";
import { Grid2 } from "@mui/material";
import ShareButton from './ShareButton.jsx';
import ScreenImage from './ScreenImage.jsx';
import { useDailyLocalState } from '../customHooks.js';
import HardModeCheckbox from './HardModeCheckbox.jsx';
import MistakeCount from './MistakeCount.jsx';
import CustomMapGuess from './CustomMapGuess.jsx';

const MainGuessArea = ({ jumpleMode }) => {
    const [mistakeCount, setMistakeCount] = useDailyLocalState(0, "mistakeCount", jumpleMode);
    const [hardModeState, setHardModeState] = useDailyLocalState(true, "hardmode", jumpleMode);

    const [guessStatus, setGuessStatus] = useDailyLocalState({
        isMapGuessed: false,
        isAreaGuessed: false,
        isScreenGuessed: false
    }, "guessStatus", jumpleMode)

    const [wrongGuesses, setWrongGuesses] = useDailyLocalState({
        map: 0,
        area: 0,
        screen: 0
    }, "wrongGuesses", jumpleMode)

    function incrementMistake(property) {
        setWrongGuesses(prevState => ({
            ...prevState,
            [property]: prevState[property] + 1
        }));

        setMistakeCount(mistakeCount + 1);
    }

    const MapGuess = () => {
        const modeComponents = {
            nexile: <NexileMapGuess incrementMistake={incrementMistake} setGuessStatus={setGuessStatus} />,
            custom: <CustomMapGuess incrementMistake={incrementMistake} guessStatus={guessStatus} setGuessStatus={setGuessStatus} />
        };

        return modeComponents[jumpleMode];
    };

    return (
        <>
            <ScreenImage
                mistakeCount={mistakeCount}
                guessStatus={guessStatus}
                hardModeState={hardModeState}
                jumpleMode={jumpleMode}
            />

            <div style={{
                display: "flex",
                zIndex: 1,
                width: "100%",
                justifyContent: "center",
                gap: "0.5rem",
            }}>
                <HardModeCheckbox
                    hardModeState={hardModeState}
                    setHardModeState={setHardModeState}
                    guessStatus={guessStatus}
                />

                <ShareButton
                    wrongGuesses={wrongGuesses}
                    mistakeCount={mistakeCount}
                    guessStatus={guessStatus}
                    hardModeState={hardModeState}
                    jumpleMode={jumpleMode}
                />

                <MistakeCount
                    mistakeCount={mistakeCount}
                    guessStatus={guessStatus}
                />


            </div>

            <Grid2 container spacing={2} sx={{ maxWidth: "35rem" }}>
                <Grid2 size={12}>
                    {MapGuess()}
                </Grid2>
                <Grid2 size={6}>
                    <AreaGuess
                        incrementMistake={incrementMistake}
                        guessStatus={guessStatus}
                        setGuessStatus={setGuessStatus}
                        jumpleMode={jumpleMode}
                    />
                </Grid2>
                <Grid2 size={6}>
                    <ScreenNumberGuess
                        incrementMistake={incrementMistake}
                        guessStatus={guessStatus}
                        setGuessStatus={setGuessStatus}
                        jumpleMode={jumpleMode}
                    />
                </Grid2>
            </Grid2>
        </>
    );
}

export default MainGuessArea;