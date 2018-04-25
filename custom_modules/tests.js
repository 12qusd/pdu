/*
* Runs all the tests for the server.js file to 
* make sure that it is properly hooked up to the 
* python file
*/
exports.runAllTests = function(portNum, ip, client, interfacing) {
	// turnPortOn
	interfacing.turnPortOn(portNum, ip, client, function() {
			console.log("turnPortOn Finished");
		});
	// turnPortOff
	interfacing.turnPortOff(portNum, ip, client, function() {
			console.log("turnPortOn Finished");
		});
	// isOn
	interfacing.isOn(portNum, ip, client, function() {
			console.log("isOn Finished");
		});
	// readTemp
	interfacing.readTemp(ip, client, function() {
			console.log("readTemp Finished");
		});
	// readCurrent
	interfacing.readCurrent(portNum, ip, client, function() {
			console.log("readCurrent Finished");
		});
	// readCurrent
	interfacing.readAllPorts(ip, client, function() {
			console.log("readAllPorts Finished");
		});
}