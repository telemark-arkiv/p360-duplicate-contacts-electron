'use strict'

var opn = require('opn')

function openSettings () {
  opn('settings/settings.json')
}

function init () {
  var contactBtn = document.getElementById('contactButton')
  var folderBtn = document.getElementById('folderButton')
  var settingsBtn = document.getElementById('settingsButton')

  settingsBtn.addEventListener('click', function (e) {
    openSettings()
  })
}

init()