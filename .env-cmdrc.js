require('dotenv').config({ path: './config/mongodb.env' });

const user = process.env.MONGO_INITDB_ROOT_USERNAME;
const password = process.env.MONGO_INITDB_ROOT_PASSWORD;
const database = process.env.DATABASE;
const remoteServer = process.env.REMOTE_SERVER_IP;

module.exports = {
	development: {
		NODE_ENV: 'development',
		MONGO_URI: 'mongodb://localhost:27017/',
		DATABASE: database,
	},
	servDev: {
		NODE_ENV: 'production',
		MONGO_URI: 'mongodb://localhost:27017/',
		DATABASE: database,
	},
	development_remote_mongo: {
		NODE_ENV: 'development',
		MONGO_URI: `mongodb://${user}:${password}@${remoteServer}:27017/?authSource=admin`,
		DATABASE: database,
	},
	development_local_docker: {
		NODE_ENV: 'development',
		MONGO_URI: `mongodb://${user}:${password}@mongo:27017/?authSource=admin`,
		DATABASE: database,
	},
	production: {
		NODE_ENV: 'production',
		MONGO_URI: `mongodb://${user}:${password}@mongo:27017/?authSource=admin`,
		DATABASE: database,
	},
};
