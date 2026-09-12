/*============================================================
==              ⚙️ CUSTOMIZE SETTINGS HERE ⚙️             ==
============================================================*/
const CONFIG = {
    speedFactor: 0.2,
    minDuration: 30,
    useRssFeed: true,
    rssUrl: "https://www.newsinside.org/feed/",
    customText: ["Bem vindos xD","Siga para Mais","Obrigada por assistirem","Destrutivamente Arrumado"],
    rssRefreshIntervalMinutes: 5
};
/*==========================================================*/

const VERSION = '0.4.0';
const LOCAL_RSS_PROXY = "/api/rss?url=";
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname === '0.0.0.0';
const PROXIED_RSS_URL = isLocalhost 
    ? LOCAL_RSS_PROXY + encodeURIComponent(CONFIG.rssUrl)
    : CONFIG.rssUrl;

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
        if (!response.ok) throw new Error('HTTP error! status: ' + response.status);
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "text/xml");
        const items = xml.querySelectorAll("item");
        const headlines = Array.from(items).map(item => item.querySelector("title").textContent).filter(Boolean);
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
        setInterval(fetchRSS, CONFIG.rssRefreshIntervalMinutes * 60 * 1000);
    } else {
        displayCustomText();
    }
    console.log(`OBS Ticker ${VERSION} initialized`);
}

initializeTicker();