var assert = require("assert"),
	swintHelper = require('../lib'),
	defaultize = swintHelper.defaultize;

global.swintVar.printLevel = 5;

describe('defaultize', function() {
	it('Filling the keys', function() {
		var def = {
				a: 1,
				b: 'aaa',
				c: true
			},
			tgt = {
				b: 'bbb'
			},
			defaultized = defaultize(def, tgt);

		assert.deepEqual(tgt, { a: 1, b: 'bbb', c: true });
	});

	it('Filling the array', function() {
		var def = {
				a: [1, 2, 3, 4]
			},
			tgt = {
				a: [0, 1]
			},
			defaultized = defaultize(def, tgt);

		assert.deepEqual(tgt, { a: [0, 1, 3, 4] });
	});

	it('Hierarchy', function() {
		var def = {
				a: {
					b: {
						c: {
							d: true
						},
						e: 'eee',
					},
					f: 'fff',
				},
				g: 3
			},
			tgt = {
				a: {
					f: 'ddd'
				},
				g: 2
			},
			defaultized = defaultize(def, tgt);

		assert.deepEqual(tgt, {
			a: {
				b: {
					c: {
						d: true
					},
					e: 'eee',
				},
				f: 'ddd',
			},
			g: 2
		});
	});

	it('More complex case', function() {
		var def = {
				a: 1,
				b: 'aaa',
				c: [1, 2, 3]
			},
			tgt = {
				b: 'bbb',
				c: [4]
			},
			defaultized = defaultize(def, tgt);

		assert.deepEqual(tgt, { a: 1, b: 'bbb', c: [4, 2, 3] });
		assert.deepEqual(defaultized, { a: 1, b: 'bbb', c: [4, 2, 3] });
	});

	it('Undefined case', function() {
		var def = {
				a: 1
			},
			tgt,
			defaultized = defaultize(def, tgt);

		assert.deepEqual(defaultized, def);
	});
});
