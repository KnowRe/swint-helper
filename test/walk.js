var os = require('os'),
	fs = require('fs'),
	path = require('path'),
	assert = require('assert'),
	swintHelper = require('../lib');

describe('walk', function() {
	var dir = path.join(os.tmpdir(), String(Math.floor(Math.random() * 10000000000000)));
	
	before(function() {
		fs.mkdirSync(dir);
		fs.writeFileSync(path.join(dir, 'file1.js'), '');
		fs.writeFileSync(path.join(dir, 'file2.js'), '');
		fs.writeFileSync(path.join(dir, 'file3.css'), '');
		fs.writeFileSync(path.join(dir, '_file4.js'), '');
		fs.writeFileSync(path.join(dir, '_5th.js'), '');
		fs.mkdirSync(path.join(dir, 'dir1'));
		fs.writeFileSync(path.join(dir, 'dir1', '_file5.js'), '');
		fs.writeFileSync(path.join(dir, 'dir1', 'file6.css'), '');
		fs.writeFileSync(path.join(dir, 'dir1', 'file7.js'), '');
		fs.writeFileSync(path.join(dir, 'dir1', 'Intro.js'), '');
		fs.writeFileSync(path.join(dir, 'dir1', 'Outro.js'), '');
	});

	it('Simple traversing with extension', function() {
		var list = swintHelper.walk({
				dir: dir,
				ext: 'js'
			});

		assert.deepEqual(list, [
			path.join('dir1', 'Intro.js'),
			path.join('dir1', 'file7.js'),
			path.join('dir1', 'Outro.js'),
			'file1.js',
			'file2.js'
		].map(function(p) {
			return path.join(dir, p);
		}));
	});

	it('Black list', function() {
		var list = swintHelper.walk({
				dir: dir,
				ext: '*',
				blacklist: function(fullPath) {
					return fullPath.match('file');
				}
			});

		assert.deepEqual(list, [
			'_5th.js',
			path.join('dir1', 'Intro.js'),
			path.join('dir1', 'Outro.js')
		].map(function(p) {
			return path.join(dir, p);
		}));
	});
});
