/* 
* urnPortOn function takes in the following data:
*
* portNum - int - the port number on the pdu
* ip - String - the ip of the pdu to contact
* client - Object - pass in the client rpc object
* callback - Function - callback function after function is finished
*
* Calls the turnPortOn function through rpc with Python
*/
exports.turnPortOn = function(portNum, ip, client, callback) {
	client.invoke("turnPortOn", portNum, ip, function(err, res){
			if (!err) {
				console.log("turnPortOn - SUCCESS: " + res);
				callback();
			}
			else {
				console.log("turnPortOn - ERROR: " + err);
				callback();
			}
		});
}

/* 
* turnPortOff function takes in the following data:
*
* portNum - int - the port number on the pdu
* ip - String - the ip of the pdu to contact
* client - Object - pass in the client rpc object
* callback - Function - callback function after function is finished
*
* Calls the turnPortOff function through rpc with Python
*/
exports.turnPortOff = function(portNum, ip, client, callback) {
	client.invoke("turnPortOff", portNum, ip, function(err, res){
			if (!err) {
				console.log("turnPortOff - SUCCESS: " + res);
				callback();
			}
			else {
				console.log("turnPortOff - ERROR: " + err);
				callback();
			}
		});
}

/* 
* isOn function takes in the following data:
*
* portNum - int - the port number on the pdu
* ip - String - the ip of the pdu to contact
* client - Object - pass in the client rpc object
* callback - Function - callback function after function is finished
*
* Calls the turnPortOff function through rpc with Python
*/
exports.isOn = function(portNum, ip, client, callback) {
	client.invoke("isOn", portNum, ip, function(err, res){
			if (!err) {
				console.log("isOn - SUCCESS: " + res);
				callback();
			}
			else {
				console.log("isOn - ERROR: " + err);
				callback();
			}
		});
}

/* 
* readTemp function takes in the following data:
*
* ip - String - the ip of the pdu to contact
* client - Object - pass in the client rpc object
* callback - Function - callback function after function is finished
*
* Calls the turnPortOff function through rpc with Python
*/
exports.readTemp = function(ip, client, callback) {
	client.invoke("readTemp", ip, function(err, res){
			if (!err) {
				console.log("readTemp - SUCCESS: " + res);
				callback();
			}
			else {
				console.log("readTemp - ERROR: " + err);
				callback();
			}
		});
}

/* 
* readCurrent function takes in the following data:
*
* portNum - int - the port number on the pdu
* ip - String - the ip of the pdu to contact
* client - Object - pass in the client rpc object
* callback - Function - callback function after function is finished
*
* Calls the turnPortOff function through rpc with Python
*/
exports.readCurrent = function(portNum, ip, client, callback) {
	client.invoke("readCurrent", portNum, ip, function(err, res){
			if (!err) {
				console.log("readCurrent - SUCCESS: " + res);
				callback();
			}
			else {
				console.log("readCurrent - ERROR: " + err);
				callback();
			}
		});
}

/* 
* readTemp function takes in the following data:
*
* ip - String - the ip of the pdu to contact
* client - Object - pass in the client rpc object
* callback - Function - callback function after function is finished
*
* Calls the turnPortOff function through rpc with Python
*/
exports.readAllPorts = function(ip, client, callback) {
	client.invoke("readAllPorts", ip, function(err, res){
			if (!err) {
				console.log("readAllPorts - SUCCESS: " + res);
				callback();
			}
			else {
				console.log("readAllPorts - ERROR: " + err);
				callback();
			}
		});
}

