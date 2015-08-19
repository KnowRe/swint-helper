var path = require('path'),
	assert = require('assert'),
	swintHelper = require('../lib');

describe('walk', function() {
	var dir = path.join(__dirname, '../test_case');

	it('Simple traversing with extension', function() {
		var list = swintHelper.walk({
				dir: dir,
				ext: 'js'
			});

		assert.deepEqual(list, [
			'Intro.js',
			path.join('dir1', 'file1.js'),
			path.join('dir1', 'file4.js'),
			path.join('dir3/dir4', 'Intro.js'),
			path.join('dir3/dir4', 'file1.js'),
			path.join('dir3/dir4', 'file4.js'),
			path.join('dir3', 'file1.js'),
			path.join('dir3', 'file4.js'),
			path.join('dir3', 'Outro.js'),
			'file1.js',
			'file4.js',
			'Outro.js'
		].map(function(f) {
			return path.join(dir, f);
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
			'Intro.js',
			path.join('_dir2', 'Intro.js'),
			path.join('_dir2', 'Outro.js'),
			path.join('dir3/dir4', 'Intro.js'),
			path.join('dir3', 'Outro.js'),
			'Outro.js'
		].map(function(f) {
			return path.join(dir, f);
		}));
	});
});
