import { React, useState, useEffect, useRef } from "react";
import "./styles.css";
import MainGuessArea from './Components/MainGuessArea';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Timer from "./Components/Timer";
import { Grid2, Tab, CircularProgress } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { getDate, fetchDate } from "./getDate";

const darkTheme = createTheme({
    palette: {
        mode: 'dark'
    }
});


const App = () => {
    const [jumpleState, setJumpleState] = useState('Nexile maps');
    const [isDateFetched, setDateIsFetched] = useState(false);
    const hasFetched = useRef(false);

    useEffect(() => {
        const checkDate = async () => {
            if (hasFetched.current) return;
            hasFetched.current = true;

            await fetchDate();

            const apiDate = getDate();
            const currentDate = apiDate.dateTime.slice(0, 10);
            const storedDate = JSON.parse(localStorage.getItem("lastDate")) || "";

            if (currentDate !== storedDate) {
                localStorage.removeItem("nexile");
                localStorage.removeItem("custom");
                localStorage.setItem("lastDate", JSON.stringify(currentDate));
            }

            setDateIsFetched(true);
        };

        checkDate();
    }, []);


    function handleJumpleMode(e, newValue) {
        setJumpleState(newValue);
    }

    if (!isDateFetched) return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <CircularProgress size={100} />
            <p style={{ color: "white", fontSize: "35px" }}>Fetching date api...</p>
        </div>
    );

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
                        <div className="fontguy"><p style={{margin: 0}}>fonts by <a href="https://fontenddev.com" target="_blank">Font End Dev</a></p></div>
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

                    <p style={{ color: "rgb(255,255,255,0.2)" }}>Images provided by Owen and JeFi</p>
                </TabPanel>

            </TabContext>
        </>
    )
}
export default App;
