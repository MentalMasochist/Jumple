let cachedDate = null;
let fetchPromise = null; 

export default async function getDate() {
    if (cachedDate) {
        return cachedDate;
    }

    if (!fetchPromise) {
        fetchPromise = (async () => {
            const response = await fetch("https://timeapi.io/api/Time/current/zone?timeZone=UTC");
            const data = await response.json();
            cachedDate = data;
            fetchPromise = null;
            return data;
        })();
    }

    return fetchPromise;
}
