var assert = require("assert"),
	swintHelper = require('../lib');

global.swintVar.printLevel = 5;

describe('objectQuery', function() {
	it('Basic validation', function() {
		var rule = {
				a: 0,
				b: '',
				c: 'aaa\bbbb\bccc',
				d: {
					a : 1,
					b : {
						a : 'b'
					}
				}
			};

		assert.deepEqual(swintHelper.objectQuery(rule, 'a'),0);
		assert.deepEqual(swintHelper.objectQuery(rule, 'd.a'),1);
		assert.deepEqual(swintHelper.objectQuery(rule, 'd.b.a'),'b');
	});

	it('Array and hierarchies', function() {
		var rule = {
				a: [0],
				b: {
					c: {
						d: ['']
					},
					e: [''],
					f: [new Date(0)]
				},
				z: [[0]]
			};
		assert.deepEqual(swintHelper.objectQuery(rule, 'b.c.d'),['']);
	});
});
