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
    useRssFeed: false, 

    // The RSS feed URL to use if useRssFeed is true.
    rssUrl: "https://gamerant.com/feed/gaming/",
    
    // Your custom messages to display if useRssFeed is false.
    customText: [
        "Welcome to my stream",
        "Follow for more content",
        "Thanks for watching",
        "Don't forget to subscribe"
    ],

    // How often to refresh the RSS feed, in minutes.
    rssRefreshIntervalMinutes: 5
};
/*==========================================================*/


// --- The rest of the script uses the settings from CONFIG ---

const VERSION = '0.4.0'; // Finalized version

// IMPORTANT: The public CORS proxy is a free demo and can be unreliable.
// For serious use, consider hosting your own or finding a different proxy service.
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
const PROXIED_RSS_URL = CORS_PROXY + CONFIG.rssUrl;

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
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "text/xml");
        const items = xml.querySelectorAll("item");
        const headlines = Array.from(items).map(item => item.querySelector("title").textContent);
        if (headlines.length === 0) throw new Error("No headlines found in RSS feed.");
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