'use strict';
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

if (process.listeners('uncaughtException').length === 0) {
	process.on('uncaughtException', function(msg) {
		module.exports(4, msg.stack || msg.message || msg);
	});
}
/* eslint-enable no-console */
