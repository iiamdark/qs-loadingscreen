# 🚨 QS-LoadingScreen — Temporary Fix Fork

> **⚠️ IMPORTANT NOTICE:** This repository is a **temporary fork** of the original [qs-loadingscreen](https://github.com/emanueldev1/qs-loadingscreen) by **Quasar Store**.  
> All changes here are **temporary patches** until Quasar Store publishes an official update with the definitive fixes.

---

## 🐛 Fixed Bugs (Temporary Patch)

### 1. ❌ Video and Music Not Playing

**Root cause:** The `<ReactPlayer>` components used `src={url}` instead of `url={url}`. ReactPlayer **does not accept** `src` as a prop — the correct prop is `url`. This prevented both the background video and the music player from loading.

**Fix:** Changed `src` → `url` on both players. Added additional YouTube configuration (`iv_load_policy: 3`, `fs: 0`, `disablekb: 1`) and `playsInline` for better compatibility.

### 2. ❌ Server Status and Ping Not Loading

**Root cause:** The FiveM API (`servers-frontend.fivem.net`) is protected by Cloudflare and blocks requests without browser headers. Additionally:
- The default `serverId` was an invalid placeholder (`"serverConnectId like 3qyo9t"`)
- The original endpoint can change or go down without a fallback

**Fix:**
- Added `User-Agent`, `Accept`, `Accept-Language`, `Referer` headers to bypass Cloudflare blocks
- **Dual endpoint:** tries `frontend.cfx-services.net` first (new), falls back to `servers-frontend.fivem.net` (legacy)
- **Server ID validation:** detects placeholders and shows a clear warning in console
- Reduced polling from 5s → 15s to avoid rate-limiting

### 3. 🧹 AudioControls Component

**Root cause:** The `AudioControls` component received props (`toggleAudioSource`, `audioSource`) that were **never passed** from the parent component, causing undefined behavior.

**Fix:** Removed unused props and dead commented-out code. Added `playerRef?.current` null safety with try/catch to prevent errors when the internal player isn't ready.

### 4. 📝 Invalid jsconfig.json

**Root cause:** Trailing comma in the `"include"` array, which is invalid JSON and caused editor errors.

**Fix:** Removed the trailing comma.

---

## 🚀 Quick Installation

### Option 1: From Release (recommended)

1. Download the latest `release.zip` from [Releases](https://github.com/iiamdark/qs-loadingscreen/releases)
2. Extract the `qs-loadingscreen` folder into your FiveM server's `resources` folder
3. Add to your `server.cfg`:
   ```lua
   ensure qs-loadingscreen
   ```
4. **IMPORTANT:** Edit `config.json` and change the `serverId` to your server's ID

### Option 2: Build from Source

```bash
# Clone the repository
git clone https://github.com/iiamdark/qs-loadingscreen.git
cd qs-loadingscreen/web

# Install dependencies
npm install

# Build
npm run build

# Copy the web/build folder to your FiveM server
```

### Option 3: Preview in Browser

```bash
cd web
npm run dev
# Open http://localhost:5173
```

> **Note:** The FiveM server API will show "OFFLINE" in your browser due to CORS policies, but it works correctly inside FiveM.

---

## ⚙️ Configuration

Edit `config.json` with **your server's** details:

```json
{
    "server": {
        "serverId": "YOUR_SERVER_ID_HERE",
        "titleMode": "mixed",
        "title": "MY SERVER [Ctext-primary font-bold]ROLEPLAY[/C]",
        "logoUrl": "https://yourserver.com/logo.png"
    },
    "audio": {
        "enabled": true,
        "url": "https://www.youtube.com/watch?v=VIDEO_ID",
        "volume": 0.5,
        "loop": true,
        "useVideoAudio": true
    },
    "background": {
        "type": "video",
        "videoUrl": "https://www.youtube.com/watch?v=VIDEO_ID",
        "loop": true
    }
}
```

### Where do I find my Server ID?

1. Go to https://servers.fivem.net/
2. Search for your server
3. Click your server to open the detail page
4. The Server ID is the code in the URL: `https://servers.fivem.net/servers/detail/XXXXXX`

---

## 📁 Project Structure

```
qs-loadingscreen/
├── client.lua                  # FiveM client logic
├── fxmanifest.lua              # Resource manifest
├── config.json                 # Main configuration (copied to web/build/)
├── web/
│   ├── build/                  # Compiled output
│   ├── src/
│   │   ├── index.jsx           # Root component
│   │   ├── screens/quasar/
│   │   │   └── index.jsx       # Main loading screen logic
│   │   ├── components/ui/      # UI components
│   │   └── lib/utils.js        # Utilities
│   ├── public/config.json      # Same config as root (copied to build/)
│   └── package.json
```

---

## 🎨 Customization

### Colors
Edit `web/src/index.css` — CSS variables in `:root` and `.dark`:
```css
--primary: 199 100% 50%;    /* Vibrant blue */
--secondary: 180 100% 50%;  /* Neon cyan */
--background: 240 10% 5%;   /* Dark background */
```

### Styled Text
Use the `[Cclass1 class2]text[/C]` syntax in `config.json`:
```json
{
    "server": {
        "title": "MY SERVER [Ctext-red-600 font-bold]RP[/C]"
    }
}
```

---

## 📄 License

This fork maintains the **LGPLv3** license from the original project.

Originally created by [Quasar Store](https://www.quasar-store.com/) · Temporary fix by [iiamdark](https://github.com/iiamdark)
