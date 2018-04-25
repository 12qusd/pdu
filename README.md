Dependencies:
node, python

Before running the application, make sure to install all node dependencies through npm with
```
npm install
```

Then to run the server type
```
node server.js
```

Documentation on the project is available in /html/documentation.html

# Description of Components #

server.js is where the web server runs. It listens on port 8080 for incoming requests from clients. The web server requires a number of modules declared at the beginning which right now are:
```
express - routing and request handling
any-db - database communication
fs - file system access
body-parser - reading POST request data
child_process - spawning child processes
path - modifying path
http - http server
zerorpc - rpc server
consolidate - templating engine
```

The other variables declared are:
```
py - the python child process
interfacing - the interfacing code that cotains the communication between Python and Javascript
tests - the code that contains all the code for testing
client - which gets set in init() to the RPC client
app - the express application
```

The first two lines set up bodyParser:
```
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
```
These lines set up bodyParser to read JSON from post requests if any data is sent

Next, there are a number of static routes that need to be set up
```
app.use('/static', express.static(path.join(__dirname, 'css')));
app.use('/static', express.static(path.join(__dirname, 'js')));
app.use('/static', express.static(path.join(__dirname, 'html')));
```
These route any request to /static to check in /css, /js and /html for any files matching the request

I also set up a templating engine using hogan and consolidate with this:
```
const engines = require('consolidate');
app.engine('html', engines.hogan);
app.set('views', __dirname + '/templates');
app.set('view engine', 'html');
```
This lets me use javascript "tags" in the html template to create custom views for given routes

Next I handle the common get requests that will hit the site:
```
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
```
Any request to '/' gets a rendered view of index.html with the IP "192.168.0.1". When any request goes to /ip/<IP HERE> the view is rendered with the given IP that was sent in

This is an example of how post requests would work (without bodyParsing yet) and could control the PDU
```
app.post('/turnPortOn', function(req, res){
	console.log('Port on request received');
	// TODO: get port number from request body and process accordingly (body-parser)
	turnPortOn(12, function() {
		res.status({command: "turnPortOn", state: "Python command executed"});
	});
});
```
This handles a POST to the /turnPortOn route. A post will be sent through JQuery on the front end and this function calls turnPortOn through interfacing. More posts will have to be handled in order to interface with the PDU


The following code simply prints any stdout from python into the javascript console:
```
py.stdout.on('data', function(data) {
	console.log("### Python Output: " + data);
	console.log("### END PYTHON DATA ###");
});
```

This final pieces is for the initialization process and will handle any processes that need to be done on startup such as connecting to RPC, initializing the database etc.
```
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
// TODO: Doesn't do very much now, but infrastructure in place
function init(callback) {
	console.log('TODO: IMPLEMENT INITIALIZATION');
	console.log('Initializing database and PDU states');
	callback();
}
```