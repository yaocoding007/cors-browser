
const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('EDK', {
  showPage: (url) => ipcRenderer.send('show-page', url)
})
