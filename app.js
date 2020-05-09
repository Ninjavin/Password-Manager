'use strict'

const path = require('path');
const { app, ipcMain } = require('electron');

const Window = require('./Window');
const DataStore = require('./DataStore');

const passwordData = new DataStore({ name: "Password Main" });

function main(){
  let mainWindow = new Window({file: path.join('index.html')});
  let addPasswordWindow;

  mainWindow.once('show', () => {
    mainWindow.webContents.send('passwordData', passwordData.passwordData)
  })

  ipcMain.on('add-password-window', () => {
    if(!addPasswordWindow){
      addPasswordWindow = new Window({
        file: path.join('add.html'),
        width: 700,
        height: 600,
        parent: mainWindow,
        webPreferences:{
          nodeIntegration: true
        }
      })

      addPasswordWindow.on('closed', () => {
        addPasswordWindow = null;
      })
    }
  })

  ipcMain.on('add-password', (event, password) => {
    const updatedPasswords = passwordData.addPassword(password).passwordData;
    mainWindow.send('passwordData', updatedPasswords);
  })

  ipcMain.on('delete-password', function(event, password){
    console.log(password)
    const updatedPasswords = passwordData.deletePassword(password).passwordData;
    mainWindow.send('passwordData', updatedPasswords);
  })
}

app.on('ready', main)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
