'use strict';

module.exports = function(struct, query) {
	return dfs(struct, query);
};

var dfs = function(struct, query) {
	let ret = struct,
		i;

	query = Array.isArray(query) ? query : query.split('.');

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