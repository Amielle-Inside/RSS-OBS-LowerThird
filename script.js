/*============================================================
==              ⚙️ CUSTOMIZE SETTINGS HERE ⚙️             ==
============================================================*/
const CONFIG = {
    // How fast the text scrolls. Higher number = SLOWER scroll.
    speedFactor: 0.2,

    // The minimum scroll time in seconds, even for short text.
    minDuration: 30,

    // Scroll direction: 'rtl' (right-to-left) or 'ltr' (left-to-right)
    scrollDirection: "rtl",

    // Pause animation on hover
    pauseOnHover: true,

    // Set to 'true' to use an RSS feed, 'false' to use your custom text.
    useRssFeed: true,

    // The RSS feed URL to use if useRssFeed is true.
    rssUrl: "https://www.newsinside.org/feed/",

    // Maximum RSS items to show (0 = all)
    maxRssItems: 0,

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
/*============================================================*/

// --- The rest of the script uses the settings from CONFIG ---

const VERSION = '0.4.0';

// RSS Proxy - try local first, fallback to rss2json.com
const LOCAL_RSS_PROXY = "/api/rss?url=";
const RSS2JSON_API = "https://api.rss2json.com/v1/api.json?rss_url=";
// Use local proxy if on same origin, else fallback to rss2json
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname === '0.0.0.0';
const PROXIED_RSS_URL = isLocalhost 
    ? LOCAL_RSS_PROXY + encodeURIComponent(CONFIG.rssUrl)
    : RSS2JSON_API + encodeURIComponent(CONFIG.rssUrl);

function setTickerText(text) {
    const scrollingElement = document.querySelector(".scrolling-text");
    scrollingElement.innerHTML = text;
    const duration = Math.max(CONFIG.minDuration, text.length * CONFIG.speedFactor);
    scrollingElement.style.setProperty('--duration', duration + 's');
    scrollingElement.style.setProperty('--scroll-direction', CONFIG.scrollDirection);
    // Restart animation
    scrollingElement.style.animation = 'none';
    scrollingElement.offsetHeight; // trigger reflow
    scrollingElement.style.animation = 'scroll ' + duration + 's linear infinite';
    scrollingElement.style.animationDirection = CONFIG.scrollDirection;
}

function displayCustomText() {
    const tickerText = CONFIG.customText.join(' <span class="bullet-point">●</span> ');
    setTickerText(tickerText);
}

async function fetchRSS() {
    try {
        const response = await fetch(PROXIED_RSS_URL);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        let headlines = [];
        
        // Check if using local proxy (XML) or rss2json (JSON)
        const isLocalProxy = PROXIED_RSS_URL.startsWith('/api/rss');
        
        if (isLocalProxy) {
            // Parse XML response
            const text = await response.text();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(text, "application/xml");
            const items = xmlDoc.querySelectorAll('item');
            headlines = Array.from(items).map(item => {
                const title = item.querySelector('title');
                return title ? title.textContent : '';
            }).filter(Boolean);
        } else {
            // Parse JSON response from rss2json
            const data = await response.json();
            if (data.status !== "ok" || !data.items || data.items.length === 0) {
                throw new Error("No items found in RSS feed.");
            }
            headlines = data.items.map(item => item.title);
        }
        
        if (headlines.length === 0) {
            throw new Error("No items found in RSS feed.");
        }
        
        if (CONFIG.maxRssItems > 0) {
            headlines = headlines.slice(0, CONFIG.maxRssItems);
        }
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
        setInterval(fetchRSS, CONFIG.rssRefreshIntervalMinutes * 60 * 1000);
    } else {
        displayCustomText();
    }
    console.log(`OBS Ticker ${VERSION} initialized`);
}

initializeTicker();
