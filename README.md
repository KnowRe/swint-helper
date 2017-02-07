# swint-helper
Helper functions and classes for Swint

## Installation
```sh
$ npm install --save swint-helper
```

## API

### `.defaultize(defVal, tgtVal)`
Filling default value to an JavaScript object.

If `tgtVal` doesn't have the key -> It is filled from `defVal`, recursively.

If `tgtVal` doesn't have enough values at the Array -> It is filed from `defVal`, recursively.

#### Examples
```javascript
var def,
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

defaultize(def, tgt);
// tgt ==>  { a: 1, b: 'bbb', c: [4, 2, 3] }
```
---
### `.validate(ruleVal, tgtVal)`
Recursively looks through an object to see if its values match the rules

#### Rules
* `undefined` : Can be any type 
* `0` : Has to be a Number
* `''` : Has to be a String
* `'aaa\bbbb\bccc'` : Has to be enum('aaa', 'bbb', 'ccc')
* `new Date(0)` : Has to be a Date
* `{}` : Has to be an object
* `[0]` : Has to be an Array of Numbers
* `['']` : Has to be an Array of Strings
* `[new Date(0)]` : Has to be an Array of Dates
* `[[0]]` : Has to be an Array of Arrays of Numbers
* `{ a: 0 }` : Has to be an Object with key of a: Number

#### Examples
```javascript
var r = {
		a: 0,
		b: '',
		c: {
			d: [0],
			e: undefined
		}
	},
	t = {
		a: 100,
		b: 'Monday',
		c: {
			d: [1,2,3],
			e: 'Friday'
		}
	};

var o = validate(r, t);
// o ==> [ true, [] ]
```

If the target didn't match the target, it will return false and a path to the failing entry:

```javascript
var r = {
		a: 0,
		b: '',
		c: {
			d: [0],
			e: undefined
		}
	},
	t = {
		a: 100,
		b: 'Monday',
		c: {
			d: ['a', 'b', 'c'],
			e: 'Friday'
		}
	};
 
var o = validate(r, t);
// o ==> [ false, [ 'c', 'd', 0 ] ]
```
---
### `.print([level], msg1, [msg2, ...])`
Prints messages and associated levels

#### Levels
* 0(`print.RAW`) : RAW
* 1(`print.DEBUG`) : DEBUG(default)
* 2(`print.INFO`) : INFO
* 3(`print.WARN`) : WARNING
* 4(`print.ERROR`) : ERROR

#### Examples
```javascript
print(0, 'Raw message');
print(print.RAW, 'Raw message');
// ==> Raw message
print(1, 'Debug message');
print(print.DEBUG, 'Debug message');
// ==> DEBUG/2015-05-07T13:55:35.612Z)
//		Debug message
print(2, 'Info message');
print(print.INFO, 'Info message');
// ==> INFO /2015-05-07T13:55:35.612Z)
//		Info message
print(3, 'Warning message');
print(print.WARN, 'Warning message');
// ==> WARN /2015-05-07T13:55:35.612Z)
//		Warning message
print(4, 'Error message');
print(print.ERROR, 'Error message');
// ==> ERROR/2015-05-07T13:55:35.612Z)
//		Error message

// Setting the printLevel sets a minimum requirement for the levels
global.swintVar.printLevel = 3;		
print(0, 'Raw message');		// Would not print
print(1, 'Debug message');		// Would not print
print(2, 'Info message');		// Would not print
print(3, 'Warning message');	// Would print
print(4, 'Error message');		// Would print
```
---
### `.walk(options)`
Walks directory and returns the list of file. The dir should be a full path.

#### Options
The whitelist precedes blacklist.
* `dir` : `String`, default: `path.dirname(require.main.filename)`
* `ext` : `String`, default: `'*'`
* `whitelist` : `function(fullPath)`, default: pass
* `blacklist` : `function(fullPath)`, default: extension, starting with `_`
* `baseOrderRule` : `Boolean`, default: `true`, whether using baseOrderRule
* `orderRule` : `function(a, b)`, default: ...
* `head` : `String`, default: `'Intro'`
* `tail` : `String`, default: `'Outro'`

#### Example
```javascript
var list = walk({
		dir: path.join(__dirname, 'myDir'),
		ext: 'js'
	});
```
---
### `.concat(fileList)`
Concatenating file contents on the fileList and returns string

#### Example
```javascript
var str = concat([
		path.join(__dirname, 'aaa.txt'),
		path.join(__dirname, 'bbb.txt'),
		path.join(__dirname, 'ccc.txt')
	]);
```
---
### `.createHash(options)`
Creates key-secret SHA-256 hash pair based on the salt. This pair can be verified the `check-hash` middleware from `swint-middleware`.

#### Options
* `key`: `Number`, default: 15
* `secret`: `Number`, default: 25
* `salt`: `String`, default: `SwintIsForTwins`

#### Example
```javascript
var hashPair = createHash({
	salt: 'ItIsSalty'
});

// hashPair.key, hashPair.secret is generated
```
---
### `.traverseWithQuery(struct, query)`
Traverses through a structure by following a list of keys/indexs.

#### Example
```javascript
	var s  = { a: [1, 2, { b: 'ccc' } ] },
		s2 = { a: { b: 'ccc2' } };
	
	var o  = traverseWithQuery(s, ['a', 2, 'b']),
		o2 = traverseWithQuery(s2, 'a.b');
	
	// o  ==> 'ccc'
	// o2 ==> 'ccc2'
```
