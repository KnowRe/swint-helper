'use strict';

module.exports = function(defVal, tgtVal) {
	if(tgtVal === undefined) {
		tgtVal = JSON.parse(JSON.stringify(defVal));
	} else {
		dfs(defVal, tgtVal, []);
	}

	return tgtVal;
};

var dfs = function(def, tgt, stack) {
	switch(typeof(def)) {
		case 'object':
			prepare(def, tgt, stack);
			break;
		default:
			cp(def, tgt, stack);
			return;
	}

	for(var i in def) {
		var newStack = stack.concat([i]);
		dfs(def[i], tgt, newStack);
	}
};

var cp = function(def, tgt, stack) {
		var i;

		for(i = 0; i < stack.length - 1; i++) {
			tgt = tgt[stack[i]];
		}

		if(!tgt.hasOwnProperty(stack[i])) {
			tgt[stack[i]] = def;
		}
	},
	prepare = function(def, tgt, stack) {
		var i;

		if(stack.length === 0) return;

		for(i = 0; i < stack.length - 1; i++) {
			tgt = tgt[stack[i]];
		}

		if(!tgt.hasOwnProperty(stack[i])) {
			if(def === null) {
				tgt[stack[i]] = null;
			} else {
				tgt[stack[i]] = Array.isArray(def) ? [] : {};
			}
		}
	};
