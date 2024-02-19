// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron')
const path = require('path')

let mainWindow = null

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      webSecurity: false, // 手动关闭同源策略
      preload: path.join(__dirname, 'preload.js'),
      webviewTag: true
    }
  })

  ipcMain.on('show-page', (event, url) => {
    mainWindow.loadURL(url)
  })

  mainWindow.loadFile('index.html')
}



app.whenReady().then(() => {
  createWindow()

  globalShortcut.register('CommandOrControl+B', () => {
    mainWindow.loadFile('index.html')
  })

  globalShortcut.register('CommandOrControl+K', () => {
    mainWindow.webContents.openDevTools()
  })

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
