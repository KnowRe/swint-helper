'use strict';

module.exports = function(target, verifying) {
	return dfs(target, verifying);
};

var dfs = function(target, verifying) {
	let ret = target,
		query = verifying.split('.'),
		i;

	for (i = 0; i < query.length - 1; i++) {
		if (ret === undefined) {
			return undefined;
		}

		ret = ret[query[i]];
	}

	if (ret === undefined) {
		return undefined;
	}

	return ret[query[i]];
};