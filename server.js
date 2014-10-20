/**
* Devniel's Express.js Boilerplate
*
* @author : Daniel (devnieL) Flores
* start date : 19/10/14
* end date : *
*/

var express = require("express"),
	http = require("http");

// Version is important
// to sufix public assets and avoid
// caching problems with each release

global.version = "1.0.0";

// Root directory

var path = require('path');
global.rootDirectory = path.resolve(__dirname);

// Prepare app

var app = express();

// Inject aditional settings here

/* 
* Example :
*
* // Softlayer Settings
* require("./config/softlayer");
*
* // If you need to use some configuration
* // value globally in your application, e.g. a database
* // client object, just make the proper changes in the config 
* // file and assign its result object (module.require) to a variable
*
* Example :
* 
* // IBM Bluemix Services Settings
* var bluemix = require("./config/bluemix");
*
* // Set global DB2 data source name to use
* // in our models
* global.db2_dsn = bluemix.db2_dsn;
*
*/

// I18N settings
var i18n = require("./config/i18n");

// Express and route settings
var exp = require("./config/express")(app, i18n);

// Start the app by listening on port
var port = process.env.PORT || 3000;

// Log events
console.log("Express app started on port: " + port);

// Start server
var server = http.createServer(app);
server.listen(port);

// Expose app for testing
exports = module.exports.app = app;