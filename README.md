# swint-helper
Helper functions and classes for Swint

**Warning: This is not final draft yet, so do not use this until its official version is launched**

## Installation
```sh
$ npm install --save swint-helper
```

## API

### `.defaultize(defVal, tgtVal)`
Filling default value to an JavaScript object.

If `tgtVal` doesn't have the key -> It is filled from `defVal`, recursively.

If `tgtVal` doesn't have enough values at the Array -> It is filed from `defVal`, recursively.

```javascript
var swintHelper = require('swint-helper'),
	def,
	tgt;

def = {
	a: 1,
	b: 'aaa',
	c: [1, 2, 3]
};

tgt = {
	b: 'bbb',
	c: [4]
};

swintHelper.defaultize(def, tgt);
// tgt ==>  { a: 1, b: 'bbb', c: [4, 2, 3] }
```
