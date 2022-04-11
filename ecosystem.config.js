// eslint-disable-next-line @typescript-eslint/no-var-requires
const environment = require('./.env-cmdrc.js');

module.exports = {
	apps: [
		{
			name: 'onchance',
			script: 'ts-node ./server/index.ts',
			args: '--no-daemon',
			node_args: '--experimental-top-level-await',
			env: environment.production,
		},
	],
};
