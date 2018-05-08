'use strict';

var crypto = require('crypto'),
	defaultize = require('../defaultize');

module.exports = function(options) {
	options = defaultize({
		key: 15,
		secret: 25,
		salt: 'SwintIsForTwins'
	}, options);

	var key = crypto.randomBytes(256).toString('base64').substring(0, options.key),
		shasum = crypto.createHash('sha256');

	shasum.update(key + options.salt);

	var secret = shasum.digest('base64').substring(0, options.secret);

	return {
		key: key,
		secret: secret
	};
};
