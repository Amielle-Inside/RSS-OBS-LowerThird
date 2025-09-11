# OBS Live News & Text Ticker

A simple, modern, and highly customizable scrolling text ticker for use as a Browser Source in OBS Studio. Display your own custom messages or pull live headlines from any RSS news feed to keep your stream engaging.

---

## Features ✨

* **Two Modes:** Choose between displaying your own list of custom messages or pulling headlines from a live RSS feed.
* **Easy Customization:** No coding knowledge needed! All colors, speeds, and text options are in clearly marked sections at the top of the files.
* **Modern "Gamer" Aesthetic:** Clean design with a futuristic font, borders, and neon glow effects that fit well with most stream layouts.
* **Lightweight & Simple:** No plugins or external software required. Just a single folder and OBS Studio.

---

## Installation & Setup ⚙️

Follow these steps to get the ticker running in OBS in under two minutes.

#### Step 1: Download the Files

First, download the project folder which contains the following three files:
* `index.html`
* `style.css`
* `script.js`

Make sure you keep all three files together in the same folder on your computer.

---

#### Step 2: Add a Browser Source in OBS

1.  In OBS, go to the "Sources" dock and click the **`+`** button.
2.  Select **Browser** from the list.
3.  Give your new source a name, like "Live Ticker," and click **OK**.

---

#### Step 3: Configure the Browser Source

A properties window will open. Configure it with the following settings:

1.  Check the box for **Local file**.
2.  Click the **Browse** button and navigate to the folder you downloaded. Select the `index.html` file.
3.  Set the **Width** to match your canvas width (e.g., `1920`).
4.  Set the **Height** to control the size of the ticker (a good starting point is `150`).
5.  Click **OK**.

You should now see the ticker at the bottom of your OBS scene!

---

## Customization 🎨

This ticker was designed to be easy for anyone to modify. You only need to edit two files with a basic text editor (like Notepad on Windows or TextEdit on Mac).

**⭐ Important!** After you save changes to the files, you must refresh the ticker in OBS to see them. Go to the Browser Source's **Properties** and click the **"Refresh cache of current page"** button at the bottom.

---

### Changing Colors & Appearance (`style.css`)

To change the look of the ticker, open the **`style.css`** file. All the settings you need are in the "CUSTOMIZE COLORS HERE" section at the very top.

```css
:root {
    /* Main text and border color */
    --primary-color: #00ff9d; 
    
    /* Color for the glowing effect */
    --primary-glow-color: rgba(0, 255, 157, 0.7);

    /* Color for the bullet points */
    --accent-color: #ff00dd;

    /* ... and more ... */
}
```

You can change any color value. Use simple color names (like red, gold, skyblue) or hex color codes (like #FF5733).

For a great online color picker, check out [htmlcolorcodes.com](https://htmlcolorcodes.com).

---

### Changing Speed, Text, & Data Source (`script.js`)

To change how the ticker behaves, open the **`script.js`** file. All settings are in the "CUSTOMIZE SETTINGS HERE" section at the top.

```javascript
const CONFIG = {
    // How fast the text scrolls. Higher number = SLOWER scroll.
    speedFactor: 0.2,

    // Set to 'true' to use an RSS feed, 'false' for custom text.
    useRssFeed: false, 

    // The RSS feed URL to use if useRssFeed is true.
    rssUrl: "https://gamerant.com/feed/gaming/",
    
    // Your custom messages to display if useRssFeed is false.
    customText: [
        "Welcome to my stream",
        "Follow for more content"
    ]
};
```

- **speedFactor:** Controls the scroll speed. Higher number = slower scroll. A value of 0.1 is very fast, while 0.5 is very slow.  
- **useRssFeed:** This is the main switch. Set to true to activate the RSS feed, or false to use your custom messages.  
- **rssUrl:** If useRssFeed is true, paste the URL of the feed you want to use here.  
- **customText:** If useRssFeed is false, you can edit this list of messages. Just make sure each message is inside quotes `""` and followed by a comma `,`.  

---

## Troubleshooting 🛠️

**Ticker is not showing up:**  
- Double-check that the "Local file" path in the Browser Source properties is correct.  
- Make sure the source is visible in the Sources dock (the eye icon should be open).  

**RSS Feed shows an "Error loading..." message:**  
- The RSS feed URL in `script.js` might be incorrect or the website might be down.  
- The public CORS proxy used to fetch the feed may be temporarily unavailable. This is a free service and can sometimes be unreliable.  

---

## License 📜
This project is licensed under the MIT License.

Copyright (c) 2025 Derek-G1

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.