const path = require('path');
const { app, BrowserWindow, nativeTheme } = require('electron');

const isDev = !app.isPackaged;

const createWindow = () => {
  const window = new BrowserWindow({
    width: 420,
    height: 560,
    resizable: false,
    maximizable: false,
    title: 'Sats Calculator',
    backgroundColor: nativeTheme.shouldUseDarkColors ? '#121212' : '#f3f3f3',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      devTools: isDev
    }
  });

  window.loadFile(path.join(__dirname, '..', 'web', 'index.html'));
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
