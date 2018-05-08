var assert = require("assert"),
	swintHelper = require('../lib');

global.swintVar.printLevel = 5;

describe('validate', function() {
	it('Simple validation', function() {
		assert.deepEqual(swintHelper.validate(0, 42), [ true, [] ]);
		assert.deepEqual(swintHelper.validate('', '42'), [ true, [] ]);
		assert.deepEqual(swintHelper.validate(new Date(0), new Date()), [ true, [] ]);
	});

	it('Basic validation', function() {
		var rule = {
				a: 0,
				b: '',
				c: 'aaa\bbbb\bccc',
				d: new Date(0)
			};

		assert.deepEqual(swintHelper.validate(rule, {
			a: 42,
			b: '42',
			c: 'aaa',
			d: new Date()
		}), [ true, [] ]);
		assert.deepEqual(swintHelper.validate(rule, {
			a: '42',
			b: '42',
			c: 'aaa',
			d: new Date()
		}), [ false, ['a'] ]);
		assert.deepEqual(swintHelper.validate(rule, {
			a: 42,
			b: 42,
			c: 'aaa',
			d: new Date()
		}), [ false, ['b'] ]);
		assert.deepEqual(swintHelper.validate(rule, {
			a: 42,
			b: '42',
			c: 'ddd',
			d: new Date()
		}), [ false, ['c'] ]);
		assert.deepEqual(swintHelper.validate(rule, {
			a: 42,
			b: '42',
			c: 'aaa',
			d: 0
		}), [ false, ['d'] ]);
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
		assert.deepEqual(swintHelper.validate(rule, {
			a: [42, 43, 44],
			b: {
				c: {
					d: ['aaa', 'bbb', 'ccc']
				},
				e: ['ddd', 'eee', 'fff'],
				f: [new Date(), new Date(1), new Date(2)]
			},
			z: [[0, 1, 2], [3, 4]]
		}), [ true, [] ]);
		assert.deepEqual(swintHelper.validate(rule, {
			a: [42, 43, '44'],
			b: {
				c: {
					d: ['aaa', 'bbb', 'ccc']
				},
				e: ['ddd', 'eee', 'fff'],
				f: [new Date(), new Date(1), new Date(2)]
			},
			z: [[0, 1, 2], [3, 4]]
		}), [ false, ['a', 2] ]);
		assert.deepEqual(swintHelper.validate(rule, {
			a: [42, 43, 44],
			b: {
				c: {
					d: ['aaa', 'bbb', 0]
				},
				e: ['ddd', 'eee', 'fff'],
				f: [new Date(), new Date(1), new Date(2)]
			},
			z: [[0, 1, 2], [3, 4]]
		}), [ false, ['b', 'c', 'd', 2] ]);
		assert.deepEqual(swintHelper.validate(rule, {
			a: [42, 43, 44],
			b: {
				c: {
					d: ['aaa', 'bbb', 'ccc']
				},
				e: ['ddd', 'eee', 'fff'],
				f: [new Date(), new Date(1), new Date(2)]
			},
			z: [[0, 1, '2'], [3, 4]]
		}), [ false, ['z', 0, 2] ]);
	});
});
