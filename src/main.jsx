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

const startApp = async () => {
    await checkDate();
    createRoot(document.getElementById('root')).render(
        <StrictMode>
            <App />
        </StrictMode>
    )
}
startApp();