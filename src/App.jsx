import { React, useState } from "react";
import "./styles.css";
import MainGuessArea from './Components/MainGuessArea';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Timer from "./Components/Timer";
import { Grid2, Tab } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const darkTheme = createTheme({
    palette: {
        mode: 'dark'
    }
});

const App = () => {
    const [jumpleState, setJumpleState] = useState('Nexile maps');

    function handleJumpleMode(e, newValue) {
        setJumpleState(newValue);
    }


    return (
        <>
            <div className="topBar">
                <Grid2 container alignItems="center">
                    <Grid2 size={4}>
                        <Timer />
                    </Grid2>
                    <Grid2 size={4}>
                        <p className="logo">JUMPLE</p>
                    </Grid2>
                    <Grid2 size={4}>
                        <p className="signature">by Mental Masochist</p>
                    </Grid2>
                </Grid2>
            </div>


            <TabContext value={jumpleState}>
                <div className="jumpleChoice">
                    <TabList onChange={handleJumpleMode}>
                        <Tab value="Nexile maps" label={"Nexile maps"} sx={{
                            color: "white",
                            fontFamily: 'JKFontBold'
                        }} />
                        <Tab value="Custom maps" label={"Custom maps"} sx={{
                            color: "white",
                            fontFamily: 'JKFontBold'
                        }} />
                    </TabList>
                </div>

                <TabPanel value={"Nexile maps"} sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: 0
                }}>
                    <ThemeProvider theme={darkTheme}>
                        <MainGuessArea jumpleMode={"nexile"} />
                    </ThemeProvider>
                </TabPanel>

                <TabPanel value={"Custom maps"} sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: 0
                }}>
                    <ThemeProvider theme={darkTheme}>
                        <MainGuessArea jumpleMode={"custom"} />
                    </ThemeProvider>
                </TabPanel>

            </TabContext>





        </>
    )
}
export default App;
