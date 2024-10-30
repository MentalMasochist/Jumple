import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { getSeed } from './getSeed.js';

async function checkDate() {
    const currentDate = await getSeed(); 
    const storedDate = JSON.parse(localStorage.getItem("lastDate")) || "";

    if (currentDate !== storedDate) {
        localStorage.removeItem("dailyGuessStates");
        localStorage.setItem("lastDate", JSON.stringify(currentDate));
    }
}

//<p style={{color: "white", fontSize: "100px"}}>site down for 3 mins</p>

const startApp = async () => {
    await checkDate();
    createRoot(document.getElementById('root')).render(
        <StrictMode>
            <App />
        </StrictMode>,
    )
}
startApp();