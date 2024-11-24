import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { getSeeds } from './Seeds.js';

async function checkDate() {
    const { currentDate } = await getSeeds();
    const storedDate = JSON.parse(localStorage.getItem("lastDate")) || "";

    if (currentDate !== storedDate) {
        localStorage.removeItem("nexile");
        localStorage.removeItem("custom");
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