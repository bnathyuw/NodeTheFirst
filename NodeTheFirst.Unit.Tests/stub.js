module.exports = function() {
	var actualArguments = [];
	
	var stub = function () {
		actualArguments.push(Array.prototype.slice.call(arguments));
	};

	stub.getArgumentsFromLatestCall = function() {
		return actualArguments[actualArguments.length - 1];
	};

	stub.getNumberOfCalls = function() {
		return actualArguments.length;
	};

	return stub;
}