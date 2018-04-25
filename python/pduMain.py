import sys, json, pytest, zerorpc

"""
Class declaration for InvalidInputException
"""	
class InvalidInputException(Exception):
	def __str__(self):
		return "Invalid Input Given."

class PDUcomms(object):

	"""
	Constructor for PDUcomms
	"""
	def __init__(self):
		self.__state = []

	"""
	Turns a port on given a port number (on the PDU) and an IP
	If no IP is given, raise InvalidInputException
	If no port is given, raise InvalidInputException
	"""
	def turnPortOn(self, port, ip):
		if (port is None or ip is None):
			raise InvalidInputException("port and ip cannot be None")
		#TODO implement SNMP to query information
		return (port, ip, "on")

	"""
	Turns a port off given a port number (on the PDU) and an IP
	If no IP is given, raise InvalidInputException
	If no port is given, raise InvalidInputException
	"""	
	def turnPortOff(self, port, ip):
		if (port is None or ip is None):
			raise InvalidInputException("port and ip cannot be None")
		#TODO implement SNMP to query information
		return (port, ip, "off")
		
	"""
	checks if a port (on the PDU) is on given port and IP
	If no IP is given, raise InvalidInputException
	If no port is given, raise InvalidInputException
	"""
	def isOn(self, port, ip):
		if (port is None or ip is None):
			raise InvalidInputException("port and ip cannot be None")
		#if on then
		#TODO implement SNMP to query information
		return (port, ip, False)

	"""
	Read a temperature given the ip of the PDU
	If no IP is given, raise InvalidInputException
	"""	
	def readTemp(self, ip):
		if (ip is None):
			raise InvalidInputException("ip cannot be None")
		heat = 42
		#TODO implement SNMP to query information
		return (ip, heat)

	"""
	Read the current given the port number (on the PDU) and an IP
	If no IP is given, raise InvalidInputException
	If no port is given, raise InvalidInputException
	"""	
	def readCurrent(self, port, ip):
		if (port is None or ip is None):
				raise InvalidInputException("port and ip cannot be None")
			#TODO implement SNMP to query information
		return (port, ip, 10)

	"""
	Read the state of all the ports and return in an array
	"""	
	def readAllPorts(self, ip):
		if (ip is None):
			raise InvalidInputException("ip cannot be None")
		returning = []
		for i in range(24):
			returning.append(self.isOn(i+1, ip))
		return returning

if __name__ == "__main__":
	s = zerorpc.Server(PDUcomms())
	s.bind("tcp://127.0.0.1:8081")
	s.run()
