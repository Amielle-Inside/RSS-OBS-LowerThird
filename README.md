# OBS Live News & Text Ticker

A simple, modern, and highly customizable scrolling text ticker for use as a Browser Source in OBS Studio. Display your own custom messages or pull live headlines from any RSS news feed to keep your stream engaging. This project requires no external plugins or software—just OBS and the files in this folder.



---

## Features ✨

* **Two Content Modes:** Choose between displaying your own list of custom messages or pulling live headlines from any RSS feed.
* **Highly Customizable:** Easily change colors, sizing, glow effects, scroll speed, and content without needing to understand the code.
* **Modern "Gamer" Aesthetic:** A clean design featuring the futuristic "Orbitron" font, glowing borders, and smooth scrolling animations that fit well with most stream layouts.
* **Lightweight & Simple:** No plugins required. Everything is self-contained in three files (`.html`, `.css`, `.js`) that run directly in OBS.

---

## Installation & Setup ⚙️

Follow these steps to get the ticker running in OBS in under two minutes.

#### Step 1: Download the Files

Download this project's folder, which contains the following three files:
* `index.html`
* `style.css`
* `script.js`

Make sure you keep all three files together in the same folder on your computer.

---

#### Step 2: Add a Browser Source in OBS

1.  In OBS, go to the "Sources" dock and click the **`+`** button.
2.  Select **Browser** from the list.
3.  Give your new source a name (e.g., "Live Ticker") and click **OK**.

---

#### Step 3: Configure the Browser Source

The properties window will open. Configure it with the following settings:

1.  Check the box for **Local file**.
2.  Click the **Browse** button and navigate to the folder you downloaded. Select the `index.html` file.
3.  Set the **Width** to match your stream's canvas width (e.g., `1920`).
4.  Set the **Height** to control the size of the ticker (e.g., `120`).
5.  Click **OK**.



You should now see the ticker appear in your OBS scene!

---

## Customization 🎨

This ticker was designed to be easy for anyone to modify. You only need to edit the `style.css` and `script.js` files with a basic text editor (like Notepad, VS Code, etc.).

**⭐ Important! After saving changes to the files, you must refresh the ticker in OBS to see them.** Go to the Browser Source's **Properties** and click the **"Refresh cache of current page"** button at the bottom.



---

### Appearance (`style.css`)

To change the look of the ticker, open the **`style.css`** file. All settings are in the "CUSTOMIZE SETTINGS HERE" section at the top.

| Variable | Description |
| :--- | :--- |
| `--primary-color` | The main color for the text and borders. |
| `--primary-glow-color` | The color of the "neon" glow effect on the text and borders. |
| `--accent-color`| The color of the bullet points between messages. |
| `--accent-glow-color` | The color of the glow effect on the bullet points. |
| `--bg-gradient-start` | The start color of the background gradient (left side). |
| `--bg-gradient-middle` | The middle color of the background gradient. |
| `--bg-gradient-end`| The end color of the background gradient (right side). |
| `--ticker-height`| The total height of the ticker bar in pixels. |
| `--font-size`| The font size of the main scrolling text in pixels. |
| `--border-thickness`| The thickness of the top and bottom borders in pixels. |

*You can use simple color names (like `red`, `gold`) or hex color codes (like `#FF5733`). For a great online color picker, check out [htmlcolorcodes.com](https://htmlcolorcodes.com/).*

---

### Behavior & Content (`script.js`)

To change how the ticker behaves, open the **`script.js`** file. All settings are in the "CUSTOMIZE SETTINGS HERE" section at the top.

| Setting | Description |
| :--- | :--- |
| `speedFactor` | Controls the scroll speed. **A higher number means a slower scroll**. A value of `0.1` is very fast, while `0.5` is very slow. |
| `minDuration` | The minimum scroll time in seconds, even for very short text. Prevents short messages from flying by too quickly. |
| `useRssFeed` | This is the main switch. Set to `true` to activate the RSS feed, or `false` to use your custom messages. |
| `rssUrl` | If `useRssFeed` is `true`, paste the URL of the feed you want to use here. |
| `customText`| If `useRssFeed` is `false`, edit this list of messages. Make sure each message is inside quotes `""` and followed by a comma `,`. |
| `rssRefreshIntervalMinutes` | How often (in minutes) the ticker checks the RSS feed for new headlines. |

---

## Troubleshooting 🛠️

* **Ticker is not showing up:**
    * Double-check that the "Local file" path in the Browser Source properties is correct.
    * Make sure the source is visible in the Sources dock (the eye icon should be open).

* **Text is small, black, and not moving:**
    * This almost always means the `style.css` file is not loading.
    * Confirm all three files (`index.html`, `style.css`, `script.js`) are in the same folder.
    * Check for typos in the filenames.
    * Make sure your `style.css` file didn't accidentally get saved as `style.css.txt`. (In Windows, go to `View > Show > File name extensions` to check).

* **RSS Feed shows an "Error loading..." message:**
    * The `rssUrl` in `script.js` might be incorrect or the website might be down.
    * The public CORS proxy used to fetch the feed is a free demo and can sometimes be unreliable. For serious use, you may need to find a different proxy.

* **Advanced Troubleshooting (Inspect Element):**
    * If you're still having issues, you can debug the browser source directly.
    * Right-click the ticker **in the main OBS preview window** and select **Inspect**.
    * In the new "DevTools" window that pops up, click the **Console** tab and look for any red error messages. This will often tell you the exact problem.
    * *(Note: This requires "Browser Source Hardware Acceleration" to be enabled in `OBS Settings > Advanced`)*.