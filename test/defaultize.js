var assert = require("assert"),
	swintHelper = require('../lib');

describe('defaultize', function() {
	it('basic test', function() {
		var def = {
				a: 1,
				b: 'aaa',
				c: [1, 2, 3]
			},
			tgt = {
				b: 'bbb',
				c: [4]
			},
			defaultized = swintHelper.defaultize(def, tgt);

		assert.deepEqual(tgt, { a: 1, b: 'bbb', c: [4, 2, 3] });
		assert.deepEqual(defaultized, { a: 1, b: 'bbb', c: [4, 2, 3] });
	});
});
