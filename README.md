# Sats Calculator

Lightweight desktop calculator built with [Electron](https://www.electronjs.org/) so it runs the exact same on macOS and Windows. The UI includes a simple tape-style history bar, keyboard shortcuts, and common calculator operations (%, ±, ÷, ×, −, +).

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- npm (ships with Node)
- macOS or Windows workstation. You can develop on either platform; packaging is handled by `electron-builder`.

## Install dependencies

```bash
npm install
```

This pulls down Electron and electron-builder so you can run and package the project locally.

## Run the app in development

```bash
npm start
```

This launches Electron with `main.js`, which in turn loads the HTML/JS calculator UI in `renderer/`.

### Helpful tweaks

- Open DevTools from the “View” menu if you want to debug the renderer.
- Update `main.js` window dimensions or `renderer/styles.css` to change screen size/style.

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
├── main.js        # Electron main process
├── preload.js     # Exposes platform/theme hints to the renderer
├── renderer/
│   ├── index.html
│   ├── app.js     # Calculator logic + keyboard shortcuts
│   └── styles.css
└── package.json   # Scripts + electron-builder config
```

Feel free to expand features (memory buttons, scientific operators, currency helpers, etc.) by enhancing `renderer/app.js`.
