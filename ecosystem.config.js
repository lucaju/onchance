module.exports = {
	apps: [
		{
			name: 'onchance',
            script: './server/index.mjs',
            args: '--no-daemon',
            node_args: '--experimental-top-level-await',
			env: {
				NODE_ENV: 'production',
			},
			env_production: {
				NODE_ENV: 'production',
			},
		},
	],
};
