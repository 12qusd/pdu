from pduMain import *
import pytest

# Tests exceptions (but needs pytest library)
def exceptions():
	pdu = PDUcomms()
	with pytest.raises(InvalidInputException):
		pdu.turnPortOn(None, None)
		pdu.turnPortOn(1, None)
		pdu.turnPortOn(None, "192.168.0.1")
		pdu.turnPortOff(None, None)
		pdu.turnPortOff(1, None)
		pdu.turnPortOff(None, "192.168.0.1")
		pdu.readTemp(None)
		pdu.readCurrent(None, None)
		pdu.readCurrent(1, None)
		pdu.readCurrent(None, "192.168.0.1")
		pdu.readAllPorts("192.168.0.1")

"""
Tests all the functions in the project
"""	
def testAllFunctions():
	exceptions()
	pdu = PDUcomms()
	array = [(1, '192.168.0.1', True), (2, '192.168.0.1', True), (3, '192.168.0.1', True), (4, '192.168.0.1', True), (5, '192.168.0.1', True), (6, '192.168.0.1', True), (7, '192.168.0.1', True), (8, '192.168.0.1', True), (9, '192.168.0.1', True), (10, '192.168.0.1', True), (11, '192.168.0.1', True), (12, '192.168.0.1', True), (13, '192.168.0.1', True), (14, '192.168.0.1', True), (15, '192.168.0.1', True), (16, '192.168.0.1', True), (17, '192.168.0.1', True), (18, '192.168.0.1', True), (19, '192.168.0.1', True), (20, '192.168.0.1', True), (21, '192.168.0.1', True), (22, '192.168.0.1', True), (23, '192.168.0.1', True), (24, '192.168.0.1', True)]
	assert 1+1 == 2
	assert pdu.turnPortOn(12, "192.168.0.1") == (12, "192.168.0.1", "on")
	assert pdu.turnPortOff(12, "192.168.0.1") == (12, "192.168.0.1", "off")
	assert pdu.readTemp("192.168.0.1") == ("192.168.0.1", 42)
	assert pdu.readCurrent(12, "192.168.0.1") == (12, "192.168.0.1", 10)
	assert pdu.readAllPorts("192.168.0.1") == array
	print("All Tests Passed")

if __name__ == "__main__":
	testAllFunctions()