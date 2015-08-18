global.swintVar = {};

module.exports = {
	defaultize: require('./defaultize'),
	validate: require('./validate'),
	print: require('./print'),
	walk: require('./walk'),
	concat: require('./concat')
};

global.print = module.exports.print;
