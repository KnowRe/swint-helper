global.swintVar = {};

module.exports = {
	defaultize: require('./defaultize'),
	validate: require('./validate'),
	print: require('./print'),
	walk: require('./walk'),
	concat: require('./concat'),
	createHash: require('./createHash')
};

global.print = module.exports.print;
