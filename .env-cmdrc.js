require('dotenv').config({ path: './config/mongodb.env' });

const user = process.env.MONGO_INITDB_ROOT_USERNAME;
const pwd = process.env.MONGO_INITDB_ROOT_PASSWORD;
const DATABASE = process.env.DATABASE;
const remoteServer = process.env.REMOTE_SERVER_IP;

module.exports = {
	development: {
		NODE_ENV: 'development',
		MONGO_URI: 'mongodb://localhost:27017/',
		DATABASE,
	},
	servDev: {
		NODE_ENV: 'production',
		MONGO_URI: 'mongodb://localhost:27017/',
		DATABASE,
	},
	development_remote_mongo: {
		NODE_ENV: 'development',
		MONGO_URI: `mongodb://${user}:${pwd}@${remoteServer}:27017/?authSource=admin`,
		DATABASE,
	},
	development_local_docker: {
		NODE_ENV: 'development',
		MONGO_URI: `mongodb://${user}:${pwd}@mongo:27017/?authSource=admin`,
		DATABASE,
	},
	production: {
		NODE_ENV: 'production',
		MONGO_URI: `mongodb://${user}:${pwd}@mongo:27017/?authSource=admin`,
		DATABASE,
	},
};
