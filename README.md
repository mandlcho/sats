# Sats Desk

Minimal cross-platform desktop wrapper (macOS + Windows) for the CoinGuides satoshi converter.

The app ships a clean Electron shell that embeds the CoinGuides three-field widget—Sats ↔ BTC ↔ fiat—using the same imagery and CryptoCompare-powered FX rates that the original site exposes.

## Features

- CoinGuides 3-field converter (sats, BTC, fiat) with 14 fiat currencies.
- Automatic BTC/fiat rate fetches from CryptoCompare with a manual refresh button.
- Flag selector that matches the selected fiat currency.
- Lightweight desktop shell that keeps the widget available as a dedicated app window.

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- npm (ships with Node)
- macOS or Windows workstation. You can develop on either platform; packaging is handled by `electron-builder`.

## Install dependencies

```bash
npm install
```

This pulls down Electron, electron-builder, and the dev dependencies needed to launch the static preview.

## Run the app in development

```bash
npm start
```

This launches Electron with `electron/main.js`, which loads the CoinGuides-styled UI from `web/`. The renderer performs HTTPS `fetch` requests to CryptoCompare for BTC → fiat rates and also pulls flag images from FlagsAPI.

## Run the web UI

```bash
npm run web
```

This serves the static files under `web/` via `http://localhost:4173`. You still need network access for the CryptoCompare rate requests and the flag sprites.

### Notes

- CryptoCompare requests are unauthenticated. If you have an API key, update `web/app.js` to add headers/query params as needed.
- DevTools are available from the “View” menu if you want to inspect the renderer.

## Package builds

Electron Builder is configured in `package.json#build`. The npm scripts wrap the most common targets:

- **macOS (.dmg)**  
  ```bash
  npm run build:mac
  ```
- **Windows (.exe via NSIS)**  
  ```bash
  npm run build:win
  ```

> ⚠️ Cross-packaging Windows installers from macOS (or vice versa) requires extra tooling. Run the platform-specific build command on the platform you are targeting for the simplest experience.

Artifacts are emitted in the `dist/` directory.

## Project structure

```
├── electron/
│   ├── main.js    # Electron main process (window + app shell)
│   └── preload.js # Exposes platform/theme hints to the renderer
├── web/
│   ├── index.html
│   ├── app.js     # CoinGuides-converter clone powered by CryptoCompare
│   └── styles.css
└── package.json   # Scripts + electron-builder config
```

Extend `web/app.js` if you want alerts, historical charts, or extra currencies. Keeping Electron-specific code inside `electron/` lets you reuse the renderer logic elsewhere (web, mobile) with minimal changes.
