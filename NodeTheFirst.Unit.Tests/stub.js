module.exports = function(callback) {
	var actualArguments = [];
	
	var stub = function () {
		actualArguments.push(Array.prototype.slice.call(arguments));
		return callback ? callback.apply(callback, arguments) : null;
	};

	stub.getArgumentsFromLatestCall = function() {
		return actualArguments[actualArguments.length - 1];
	};

	stub.getNumberOfCalls = function() {
		return actualArguments.length;
	};

	return stub;
}