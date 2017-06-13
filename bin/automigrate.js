/* eslint-disable strict */
var server = require('../server/server');
var schema = require('../common/models/contact.json');

var ds = server.dataSources.mdb;

ds.createModel(schema.name, schema.properties, schema.options);

ds.automigrate(function() {
  ds.discoverModelProperties('CONTACT_MIGRATE', function(err, props) {
    console.log(props);
    ds.disconnect();
  });
});
