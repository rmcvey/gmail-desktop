const electron = require('electron');
const { contextBridge, ipcRenderer } = electron;

contextBridge.exposeInMainWorld('electronAPI', {
  setBadge: (title) => ipcRenderer.send('set-badge', title)
})