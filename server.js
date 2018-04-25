// use strict compiling
"use strict";

// Dependencies
const express = require('express');
const anyDB = require('any-db');
const fs = require('fs');
const bodyParser = require('body-parser');
const spawn = require('child_process').spawn;
const py = spawn('python', ['./python/pduMain.py']);
const path = require('path');
const http = require('http').Server(app);
const zerorpc = require('zerorpc');

// External files
const interfacing = require('./custom_modules/interfacing.js');
const tests = require('./custom_modules/tests.js');

// Declarations
var client;
var app = express();

// Allows for catching data from POST requests
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Serve a few static routes
app.use('/static', express.static(path.join(__dirname, 'css')));
app.use('/static', express.static(path.join(__dirname, 'js')));
app.use('/static', express.static(path.join(__dirname, 'html')));

// Use consolidate and hogan to render templates
const engines = require('consolidate');
app.engine('html', engines.hogan);
app.set('views', __dirname + '/templates');
app.set('view engine', 'html');

// Send any '/' get request to index.html in the dist folder using default template
app.get('/', function(req, res) {
	console.log('/ Request Received');
	res.render('index.html', {pduIP: "192.168.0.1"});
});

// Whenever a view with an IP is requested return dynamically
app.get('/ip/:pduAddress', function(req, res) {
	console.log('/ip/:pduAddress Request Received');
	res.render('index.html', {pduIP: req.params.pduAddress});
});


// When a post request is received to /turnPortOn execute turnPortOn in python
app.post('/turnPortOn', function(req, res){
	console.log('Port on request received');
	// TODO: get port number from request body and process accordingly (body-parser)
	interfacing.turnPortOn(12, function() {
		res.status({command: "turnPortOn", state: "Python command executed"});
	});
});

// Log out any python output data
py.stdout.on('data', function(data) {
	console.log("### Python Output: " + data);
	console.log("### END PYTHON DATA ###");
});

// Initialize and have server listen on port 8080
init(function() {
	app.listen(8080, function() {
		console.log('Server listening on port 8080');
		// Set up rpc client
		client = new zerorpc.Client();
		client.connect("tcp://127.0.0.1:8081");
		console.log('--- Executing zerorpc tests ---');
		console.log('Parameters:');
		console.log('portNum: 12');
		console.log('ip: 192.168.0.50');
		tests.runAllTests(12, "192.168.0.50", client, interfacing);
	});
});

// Initialize database
function init(callback) {
	console.log('Initializing database and PDU states');
	callback();
}

