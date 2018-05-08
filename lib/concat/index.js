'use strict';

var path = require('path'),
	fs = require('fs'),
	print = require('../print');

module.exports = function(fileList) {
	if (fileList === undefined) {
		print('Please input file list.');
		return false;
	}

	return concat(fileList);
};

var concat = function(fileList) {
	var ret = '';

	fileList.forEach(function(val) {
		var fileContent = fs.readFileSync(path.normalize(val), { encoding: 'utf8' });

		ret += fileContent + (/\n$/.test(fileContent) ? '' : '\n');
	});

	return ret;
};
