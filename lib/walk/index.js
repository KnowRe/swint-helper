var path = require('path'),
	fs = require('fs'),
	defaultize = require('../defaultize');

module.exports = function(options) {
	defaultize({
		dir: path.dirname(require.main.filename),
		ext: '*',
		whitelist: function(fullPath) {
			fullPath;
			return false;
		},
		blacklist: function(fullPath) {
			var extname = path.extname(fullPath),
				basename = path.basename(fullPath),
				lpath = fs.lstatSync(fullPath);

			if (basename[0] === '_') {
				return true;
			}

			if (basename === '.DS_Store' || basename === 'DUMMY') {
				return true;
			}

			if (options.ext === '*') {
				return false;
			} else if (lpath.isDirectory()) {
				return false;
			} else {
				return (extname !== '.' + options.ext);
			}
		},
		baseOrderRule: true,
		head: 'Intro',
		tail: 'Outro',
		orderRule: function(a, b) {
			if (options.baseOrderRule) {
				var bor = baseOrderRule(a, b);
				if (bor !== 0) return bor;
			}

			var baseName = [
				path.basename(a),
				path.basename(b)
			];

			if (baseName[0] < baseName[1]) return -1;
			else if (baseName[0] > baseName[1]) return 1;
			else return 0;
		}
	}, options);

	var baseOrderRule = function(a, b) {
		var dirName = [
				path.basename(path.join(a, '..')),
				path.basename(path.join(b, '..'))
			],
			baseName = [
				path.basename(a),
				path.basename(b)
			],
			fileName = [
				baseName[0].substr(0, baseName[0].lastIndexOf('.')) || baseName[0],
				baseName[1].substr(0, baseName[1].lastIndexOf('.')) || baseName[1]
			];

		if (fileName[0] === options.head) return -1;
		if (fileName[1] === options.head) return 1;

		if (fileName[0] === options.tail) return 1;
		if (fileName[1] === options.tail) return -1;

		if (dirName[0] === fileName[0]) return -1;
		if (dirName[1] === fileName[1]) return 1;

		return 0;
	};

	return walk(options);
};

var walk = function(options) {
	var pathList = [];

	findDir(pathList, options, options.dir);

	return pathList;
};

var findDir = function(pathList, options, dir) {
	if (!fs.existsSync(dir)) return [];
	if (!fs.lstatSync(dir).isDirectory()) return [];

	var paths = fs.readdirSync(dir),
		fullPaths = paths.map(function(e) {
			return path.join(dir, e);
		});

	fullPaths.sort(options.orderRule);

	fullPaths.forEach(function(fullPath) {
		var lpath = fs.lstatSync(fullPath);

		if (options.whitelist(fullPath) || !options.blacklist(fullPath)) {
			if (lpath.isDirectory()) {
				findDir(pathList, options, fullPath);
			} else {
				pathList.push(fullPath);
			}
		}
	});
};
