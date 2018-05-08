var path = require('path'),
	assert = require('assert'),
	swintHelper = require('../lib');

global.swintVar.printLevel = 5;

describe('createHash', function() {
	it('Simple creation', function() {
		var hashPair = swintHelper.createHash();

		assert.equal(hashPair.key.length, 15);
		assert.equal(hashPair.secret.length, 25);
	});
});
