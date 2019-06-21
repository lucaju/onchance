const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = './credentials/google-token.json';



const getCrendentials = async () => {

	return new Promise(async (resolve, reject) => {

		try {
			const content = await readFile('./credentials/google-drive.json');
			const oAuth2Client = await authorize(JSON.parse(content));
			resolve(oAuth2Client);

		} catch (err) {
			const error = new Error(`Error loading client secret file: ${err}`);
			reject(error);
		}

	});

};


/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 */
const authorize = credentials => {

	return new Promise(async (resolve, reject) => {

		const {
			client_secret,
			client_id,
			redirect_uris
		} = credentials.installed;

		let oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

		// Check if we have previously stored a token.
		try {
			const token = await readFile(TOKEN_PATH);
			oAuth2Client.setCredentials(JSON.parse(token));
			resolve(oAuth2Client);

		} catch (err) {

			//of token was not previously stored, get new token
			try {
				oAuth2Client = await getNewToken(oAuth2Client);
				resolve(oAuth2Client);
			} catch (err) {
				reject(err);
			}

		}

	});
};

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 */
const getNewToken = async oAuth2Client => {

	const authUrl = oAuth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: SCOPES,
	});

	console.log('Authorize this app by visiting this url:', authUrl);
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	return new Promise(async (resolve, reject) => {

		rl.question('Enter the code from that page here: ', async code => {
			rl.close();

			let token;

			try {
				token = await oAuth2Client.getToken(code);
				oAuth2Client.setCredentials(token);

				console.log(token);
				await writeFile(TOKEN_PATH, JSON.stringify(token));

				resolve(oAuth2Client);
				
			} catch (err) {
				reject(`Error while trying to retrieve access token ${err}`);
				
			}

		});

	});
};


exports.getCrendentials = getCrendentials;