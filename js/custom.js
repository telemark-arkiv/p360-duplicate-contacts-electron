'use strict'

var remote = require('remote')
var fs = require('fs')
var opn = require('opn')
var getDuplicatesFromDb = require('p360-duplicate-contacts')

function openSettings () {
  opn(__dirname + '/settings.json')
}

function getDuplicates (type) {
  var settings = require(__dirname + '/settings.json')
  var filename = type + '.txt'

  //Setups env
  process.env.P360_DUPLICATE_CONTACTS_USER = settings.P360_DUPLICATE_CONTACTS_USER
  process.env.P360_DUPLICATE_CONTACTS_PASSWORD = settings.P360_DUPLICATE_CONTACTS_PASSWORD
  process.env.P360_DUPLICATE_CONTACTS_SERVER = settings.P360_DUPLICATE_CONTACTS_SERVER
  process.env.P360_DUPLICATE_CONTACTS_DATABASE = settings.P360_DUPLICATE_CONTACTS_DATABASE

  getDuplicatesFromDb(type, function (error, data) {
    if (error) {
      console.log(error)
    } else {
      var list = []

      data.forEach(function (item) {
        list.push(item.id)
      })

      fs.writeFileSync(filename, list.join('\n'))

      opn(filename)
    }
  })
}

function init () {
  var contactBtn = document.getElementById('contactButton')
  var folderBtn = document.getElementById('folderButton')
  var settingsBtn = document.getElementById('settingsButton')
  var offBtn = document.getElementById('offButton')

  contactBtn.addEventListener('click', function (e) {
    getDuplicates('kontakt')
  })

  folderBtn.addEventListener('click', function (e) {
    getDuplicates('elevmappe')
  })

  settingsBtn.addEventListener('click', function (e) {
    openSettings()
  })

  offBtn.addEventListener('click', function (e) {
    var window = remote.getCurrentWindow()
    window.close()
  })
}

init()