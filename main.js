// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron')
const path = require('path')

let mainWindow = null


function destroyShortcuts() {
  globalShortcut.unregister('CommandOrControl+B');
  globalShortcut.unregister('CommandOrControl+K');
}

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


  mainWindow.on('focus', () => {
    globalShortcut.register('CommandOrControl+B', () => {
      mainWindow.loadFile('index.html')
    })
  
    globalShortcut.register('CommandOrControl+K', () => {
      mainWindow.webContents.openDevTools()
    })
  })

  mainWindow.on('blur', () => {
    destroyShortcuts()
  })

  // 在窗口关闭时注销全局快捷键
  mainWindow.on('closed', () => {
    mainWindow = null;
    destroyShortcuts()
  });

  mainWindow.loadFile('index.html')
}



app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
