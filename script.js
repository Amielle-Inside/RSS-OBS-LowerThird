/*
============================================================
==              ⚙️ CUSTOMIZE SETTINGS HERE ⚙️             ==
============================================================
*/
const CONFIG = {
    // How fast the text scrolls. Higher number = SLOWER scroll.
    speedFactor: 0.2,

    // The minimum scroll time in seconds, even for short text.
    minDuration: 30,

    // Set to 'true' to use an RSS feed, 'false' to use your custom text.
    useRssFeed: true, 

    // The RSS feed URL to use if useRssFeed is true.
    rssUrl: "https://www.newsinside.org/feed/",
    
    // Your custom messages to display if useRssFeed is false.
    customText: [
        "Bem vindos xD",
        "Siga para Mais",
        "Obrigada por assistirem",
        "Destrutivamente Arrumado"
    ],

    // How often to refresh the RSS feed, in minutes.
    rssRefreshIntervalMinutes: 5
};
/*==========================================================*/


// --- The rest of the script uses the settings from CONFIG ---

const VERSION = '0.4.0'; // Finalized version

// Use rss2json API to bypass CORS (free, no key needed for basic usage)
const RSS2JSON_API = "https://api.rss2json.com/v1/api.json?rss_url=";
const PROXIED_RSS_URL = RSS2JSON_API + encodeURIComponent(CONFIG.rssUrl);

function setTickerText(text) {
    const scrollingElement = document.querySelector(".scrolling-text");
    scrollingElement.innerHTML = text;
    const duration = Math.max(CONFIG.minDuration, text.length * CONFIG.speedFactor);
    scrollingElement.style.animation = `scroll ${duration}s linear infinite`;
}

function displayCustomText() {
    const tickerText = CONFIG.customText.join(' <span class="bullet-point">●</span> ');
    setTickerText(tickerText);
}

async function fetchRSS() {
    try {
        const response = await fetch(PROXIED_RSS_URL);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        if (data.status !== "ok" || !data.items || data.items.length === 0) {
            throw new Error("No items found in RSS feed.");
        }
        const headlines = data.items.map(item => item.title);
        const tickerText = headlines.join(' <span class="bullet-point">●</span> ');
        setTickerText(tickerText);
    } catch (error) {
        console.error("Error fetching RSS:", error);
        setTickerText("Error loading news feed. Check console for details.");
    }
}

function initializeTicker() {
    if (CONFIG.useRssFeed) {
        fetchRSS();
        // Refresh feed using the new customizable interval
        setInterval(fetchRSS, CONFIG.rssRefreshIntervalMinutes * 60 * 1000); 
    } else {
        displayCustomText();
    }
    console.log(`OBS Ticker ${VERSION} initialized`);
}

initializeTicker();
