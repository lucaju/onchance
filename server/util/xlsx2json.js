const parser = new(require('simple-excel-to-json').XlsParser)();
const jsonfile = require('jsonfile');

const folder = './server/assets/';
const sourceFile = 'lotodoc_1_5_19.xlsx';


const loadExcelFile = (file) => {

	let data = parser.parseXls2Json(file, {
		isToCamelCase: true,
	});

	data = data[0]; //first sheet

	//convert 

	// convert string list to array
	for (const item of data) {
		item.intent = explodeArray(item.intent, ';');
		item.subIntent = explodeArray(item.subIntent, ';');
		item.keywords = explodeArray(item.keywords, ';');
	}

	function explodeArray(str, sep) {
		str = str.trim();
		// str = str.replace(/\s/g, ''); // remove extraspace

		const arr = str.split(sep); //explore

		//remove empty slots
		for (let i = 0; i <= arr.length; i++) {
			let k = arr[i];
			k = `${k}`.trim();
			if (k == '') arr.splice(i, 1);
		}

		return arr;
	}

	const metadata = {
		intents: extractIntents(data, 'intent'),
		subIntent: extractIntents(data, 'subIntent'),
		keywords: extractIntents(data, 'keywords')
	};

	//save json file
	saveJson(data, 'video-collection.json');
	saveJson(metadata, 'collection-metadata.json');
};

const extractIntents = (data, feature) => {
	const list = [];

	for (const item of data) {
		if (Array.isArray(item[feature])) {
			for (const feat of item[feature]) {
				const repeat = list.find((element) => {
					return element == feat;
				});
				if (!repeat) list.push(feat);
			}
		}
	}

	list.sort();
	return list;
};


function saveJson(data, fileName) {
	return new Promise(
		async (resolve) => {
			//Save Json file
			await jsonfile.writeFile(`${folder}/${fileName}`, data, {
				spaces: 4
			});
			//continue
			resolve();
		});
}


loadExcelFile(`${folder}${sourceFile}`);