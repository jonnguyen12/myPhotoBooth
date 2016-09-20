const electron = require('electron')
const path = require('path')
const images = require('./images')
const menuTemplate = require('./menu')

const {app, BrowserWindow, ipcMain: ipc, Menu} = electron

let mainWindow

app.on('ready', _ => {
  mainWindow = new BrowserWindow({
    width: 725,
    height: 893,
    resizable: false
  })
  mainWindow.loadURL(`file://${__dirname}/capture.html`)

  images.mkdir(images.getDirPath(app))

  mainWindow.on('closed', _ => {
    mainWindow = null;
  })

  const menuContents = Menu.buildFromTemplate(menuTemplate(mainWindow))
  Menu.setApplicationMenu(menuContents)
})

ipc.on('image-captured', (evt, contents) => {
  images.save(images.getDirPath(app), contents, (err, imgPath) => {
    app.addRecentDocument(imgPath)
    images.cache(imgPath)

  })
})

ipc.on('image-remove', (evt, index)=>{
  images.rm(index, _ => {
    evt.sender.send('image-removed', index)
  })
})
