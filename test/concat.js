var os = require('os'),
	fs = require('fs'),
	path = require('path'),
	assert = require('assert'),
	swintHelper = require('../lib');

describe('concat', function() {
	var dir = path.join(__dirname, '../test_case');

	it('Simple concatenation', function() {
		var files = [
				'Intro.js',
				'file1.js',
				'file4.js',
				'Outro.js'
			].map(function(f) {
				return path.join(dir, f);
			}),
			concat = swintHelper.concat(files);

		assert.equal(concat, 'Intro\nAnd one more line\nfile1\nfile4\nOutro\n');
	});
});
