const { contextBridge, nativeTheme } = require('electron');

contextBridge.exposeInMainWorld('native', {
  platform: process.platform,
  theme: nativeTheme.shouldUseDarkColors ? 'dark' : 'light'
});
