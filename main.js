'use strict';

var fs = require('fs')
var ipc = require('electron').ipcMain
var opn = require('opn')
var settings = require('./settings.json')
//Setups env
process.env.P360_DUPLICATE_CONTACTS_USER = settings.P360_DUPLICATE_CONTACTS_USER
process.env.P360_DUPLICATE_CONTACTS_PASSWORD = settings.P360_DUPLICATE_CONTACTS_PASSWORD
process.env.P360_DUPLICATE_CONTACTS_SERVER = settings.P360_DUPLICATE_CONTACTS_SERVER
process.env.P360_DUPLICATE_CONTACTS_DATABASE = settings.P360_DUPLICATE_CONTACTS_DATABASE

var studentsFilename = __dirname + '/files/elevmappe.txt'
var contactsFilename = __dirname + '/files/kontakt.txt'
var getDuplicatesFromDb = require('p360-duplicate-contacts')

var filenames = {
  kontakt: contactsFilename,
  elevmappe: studentsFilename
}

const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 320,
    height: 120,
    frame: false
  });

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  app.quit();
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// Close
ipc.on('find-duplicates', function (event, arg) {
  getDuplicatesFromDb(arg, function (error, data) {
    if (error) {
      console.log(error)
    } else {
      var list = []

      data.forEach(function (item) {
        list.push(item.id)
      })

      fs.writeFileSync(filenames[arg], list.join('\r\n'))

      return opn(filenames[arg])
    }
  })
})

// Close
ipc.on('close-main-window', function () {
  app.quit();
})
