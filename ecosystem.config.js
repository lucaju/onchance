const environment = require('.env-cmdrc.json');

module.exports = {
	apps: [
		{
			name: 'onchance',
			script: './server/index.mjs',
			args: '--no-daemon',
			node_args: '--experimental-top-level-await',
			env: environment.production,
		},
	],
};
