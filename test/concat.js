var os = require('os'),
	fs = require('fs'),
	path = require('path'),
	assert = require('assert'),
	swintHelper = require('../lib');

describe('concat', function() {
	var dir = path.join(os.tmpdir(), String(Math.floor(Math.random() * 10000000000000))),
		numbers = [];

	for(var i = 0; i < 10; i++) {
		numbers.push(String(Math.floor(Math.random() * 10000000000000)));
	}
	
	before(function() {
		fs.mkdirSync(dir);
		for(var i = 0; i < 10; i++) {
			fs.writeFileSync(path.join(dir, numbers[i]), numbers[i] + '\n');
		}
	});

	it('Simple concatenation', function() {
		var files = numbers.map(function(n) {
				return path.join(dir, n);
			}),
			concat = swintHelper.concat(files);

		assert.equal(concat, numbers.join('\n') + '\n');
	});
});
