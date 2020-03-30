module.exports = function(ruleVal, tgtVal) {
	return dfs(ruleVal, tgtVal, []);
};

var dfs = function(rule, tgt, stack) {
	var i,
		newStack,
		result;

	if (rule === undefined) {
		return [true, stack];
	}

	switch (typeof(rule)) {
		case 'object':
			if (rule instanceof Date) {
				return [(fetch(tgt, stack) instanceof Date), stack];
			} else if (Array.isArray(rule)) {
				var newTgt = fetch(tgt, stack);

				if (!Array.isArray(newTgt)) return [false, stack];

				for (i = 0; i < newTgt.length; i++) {
					newStack = stack.concat([i]);
					result = dfs(rule[0], tgt, newStack);

					if (!result[0]) return [false, result[1]];
				}
				return [true, stack];
			} else {
				for (i in rule) {
					newStack = stack.concat([i]);
					result = dfs(rule[i], tgt, newStack);

					if (!result[0]) return [false, result[1]];
				}
				return [true, stack];
			}
		case 'number':
			return [(typeof(fetch(tgt, stack)) === 'number'), stack];
		case 'boolean':
			return [(typeof(fetch(tgt, stack)) === 'boolean'), stack];
		case 'string':
			if (rule === '') {
				return [(typeof(fetch(tgt, stack)) === 'string'), stack];
			} else {
				var enumRule = rule.split('\b');
				return [(enumRule.indexOf(fetch(tgt, stack)) !== -1), stack];
			}
		default:
			break;
	}
};

var fetch = function(tgt, stack) {
	var i;

	if (stack.length === 0) {
		if ( tgt == undefined ) return;
		return tgt;
	}

	for (i = 0; i < stack.length - 1; i++) {
		tgt = tgt[stack[i]];
	}

	return tgt[stack[i]];
};
