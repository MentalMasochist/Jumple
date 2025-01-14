import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import getDate from './getDate.js';

async function checkDate(apiDate) {
    const currentDate = apiDate.dateTime.slice(0, 10);
    const storedDate = JSON.parse(localStorage.getItem("lastDate")) || "";

    if (currentDate !== storedDate) {
        localStorage.removeItem("nexile");
        localStorage.removeItem("custom");
        localStorage.setItem("lastDate", JSON.stringify(currentDate));
    }
}

const startApp = async () => {
    const apiDate = await getDate();
    await checkDate(apiDate);

    createRoot(document.getElementById('root')).render(
        <StrictMode>
            <App />
        </StrictMode>
    )
}
startApp();