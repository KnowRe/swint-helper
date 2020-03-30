/* eslint-disable no-console */

var sprintf = require('sprintf');

global.swintVar.printLevel = 0;

var lvlString = [
	'RAW ',
	'DEBUG',
	'INFO ',
	'WARN ',
	'ERROR'
];

module.exports = function() {
	var str,
		level;

	if (!(typeof arguments[0] === 'number') || (arguments[0] % 1 !== 0) || (arguments[0] < 0) || (arguments[0] > 4) || arguments.length === 1) {
		str = Array.prototype.slice.call(arguments, 0);
		level = 1;
	} else {
		str = Array.prototype.slice.call(arguments, 1);
		level = arguments[0];
	}

	if (level < 0) level = 0;
	if (level > 5) level = 5;

	str = !(str[0] instanceof Error) ? JSON.decycle(str) : str;

	if (global.swintVar.hasOwnProperty('printHook')) {
		global.swintVar.printHook(level, str);
	}

	if (!(level >= global.swintVar.printLevel)) return;

	var key = (['info', 'info', 'info', 'warn', 'error'])[level],
		title = sprintf(
			'%s/%s)\n',
			lvlString[level],
			(new Date()).toISOString()
		),
		args = (level === 0) ? str : [title].concat(str);

	console[key].apply(console, args);
};

module.exports.RAW = 0;
module.exports.DEBUG = 1;
module.exports.INFO = 2;
module.exports.WARN = 3;
module.exports.ERROR = 4;

if (process.listeners('uncaughtException').length === 0) {
	process.on('uncaughtException', function(msg) {
		module.exports(4, msg.stack || msg.message || msg);
	});
}

if (typeof JSON.decycle !== 'function') {
	JSON.decycle = function decycle(object, replacer) {
		var objects = [];
		var paths = [];

		return (function derez(value, path) {

			var i;
			var nu;

			if (replacer !== undefined) {
				value = replacer(value);
			}

			if (
				typeof value === 'object' && value !== null &&
				!(value instanceof Boolean) &&
				!(value instanceof Date) &&
				!(value instanceof Number) &&
				!(value instanceof RegExp) &&
				!(value instanceof String)
			) {

				i = objects.indexOf(value);
				if (i >= 0) {
					return {$ref: paths[i]};
				}

				objects.push(value);
				paths.push(path);

				if (Array.isArray(value)) {
					nu = [];
					value.forEach(function (element, i) {
						nu[i] = derez(element, path + '[' + i + ']');
					});
				} else {

					nu = {};
					Object.keys(value).forEach(function (name) {
						nu[name] = derez(
							value[name],
							path + '[' + JSON.stringify(name) + ']'
						);
					});
				}
				return nu;
			}
			return value;
		}(object, '$'));
	};
}

/* eslint-enable no-console */
