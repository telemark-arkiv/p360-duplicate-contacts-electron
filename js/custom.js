'use strict'

var ipc = require('electron').ipcRenderer

function init () {
  var contactBtn = document.getElementById('contactButton')
  var folderBtn = document.getElementById('folderButton')
  var offBtn = document.getElementById('offButton')

  contactBtn.addEventListener('click', function (e) {
    ipc.send('find-duplicates', 'kontakt')
  })

  folderBtn.addEventListener('click', function (e) {
    ipc.send('find-duplicates', 'elevmappe')
  })

  offBtn.addEventListener('click', function (e) {
    ipc.send('close-main-window')
  })
}

init()