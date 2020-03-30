module.exports = function(struc, query) {
	return dfs(struc, query);
};

var dfs = function(struc, query) {
	let ret = struc,
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