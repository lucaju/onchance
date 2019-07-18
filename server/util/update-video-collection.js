const googleAuth = require('./google-auth.js');
const {google} = require('googleapis');
const jsonfile = require('jsonfile');

const folder = './server/assets/';


(async function getCollection() {

	try {
		const auth = await googleAuth.getCrendentials();
		const collection = await getGoogleSpreadsheet(auth);

		console.log(collection);

		return collection;

	} catch (err) {
		console.log(err);
		throw new Error(err);
	}


})();



const getGoogleSpreadsheet = async auth => {

	const sheets = google.sheets({
		version: 'v4',
		auth
	});

	try {

		const res = await sheets.spreadsheets.values.get({
			spreadsheetId: '1vp2Nrd2L6YnFmIFg2AmJct4E3JFRbj3Uu_KumhZFgkQ',
			range: 'Video Collection!A1:N',
		});

		const rows = res.data.values;
		
		if (!rows.length) return console.log('No data found.');

		const collection = parse(rows);

		return collection;


	} catch (err) {
		console.log('The API returned an error: ' + err);
		throw new Error(err);
	}

};

const parse = data => {

	const collection = [];

	//headers
	const headers = data.shift();

	//convert to object
	for (const row of data) {
		const video = {};
		for (let i = 0; i < data.length; i++) {
			let d = row[i];
			if (!isNaN(d) && d != '') d = +d;
			video[headers[i]] = d;
		}

		collection.push(video);
	}

	// parts string list to array
	for (const item of collection) {
		item.subject = explodeArray(item.subject, ';');
		item.intent = explodeArray(item.intent, ';');
		item.keywords = explodeArray(item.keywords, ';');
	}

	function explodeArray(str, sep) {

		if(str) {

			str = str.trim();
			const arr = str.split(sep); //explore

			//remove empty slots
			for (let i = 0; i <= arr.length-1; i++) {
				arr[i] = arr[i].trim();
				if (arr[i] == '') arr.splice(i, 1);
			}

			return arr;
		}
	}

	const metadata = {
		intents: extractMetadata(collection, 'intent'),
		keywords: extractMetadata(collection, 'keywords'),
		subjects: extractMetadata(collection, 'subject'),
		genres: extractMetadata(collection, 'genre'),
		authors: extractMetadata(collection, 'author'),
		years: extractMetadata(collection, 'year'),
		lanaguages: extractMetadata(collection, 'language'),
	};

	//save json file
	saveJson(collection, 'video-collection.json');
	saveJson(metadata, 'collection-metadata.json');

	return collection;

};

const extractMetadata = (data, feature) => {
	let list = [];

	for (const item of data) {
		if (Array.isArray(item[feature])) {
			for (const feat of item[feature]) {
				const repeat = list.find((element) => {
					return element == feat;
				});
				if (!repeat) list.push(feat);
			}
		} else {
			const repeat = list.find((element) => {
				return element == item[feature];
			});
			if (!repeat) list.push(item[feature]);
		}
	}

	list.sort();
	return list;
};

const saveJson = async (data, fileName) => {

	//Save Json file
	await jsonfile.writeFile(`${folder}/${fileName}`, data, { spaces: 4 });

	//continue
	return;
};

// exports.getCrendentials = getCollection;