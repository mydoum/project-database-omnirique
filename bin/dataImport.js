/* eslint-disable strict */
var app = require('../server/server');

var fs = require('fs');
var contactData = JSON.parse(fs.readFileSync('../data-sample/contacts.json', 'utf8'));

var models = app.models();

models.forEach(function(Model) {
  if (Model.modelName === 'contact') {
    Model.create(contactData, function(err, contacts) {
      if (err) throw err;
    });
    console.log('clients created, you can exit now');
  }
});

