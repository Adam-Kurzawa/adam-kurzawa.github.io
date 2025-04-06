import * as fs from 'fs';

const UTF_8 = 'utf8'

const COVERS_DIR = 'covers'
const ASSETS_DIR = 'C:\\Users\\Adam\\nodejs\\personal_website\\personal-website\\src\\assets'
const STORIES_DIR = ASSETS_DIR + '\\story'
const STORIES_INDEX_FILE = ASSETS_DIR + '\\stories_idx.json'
const ARTICLES_DIR = ASSETS_DIR + '\\blog'
const ARTICLES_INDEX_FILE = ASSETS_DIR + '\\articles_idx.json'

const STORIES_INDEX = {
	'pl': [],
	'en': []
}

const ARTICLES_INDEX = {}

const onSavingResult = (e) => {
    if (e && e !== null)
        console.log(e)
    else
        console.log("Saved file!")
}

fs.readdir(STORIES_DIR, (err, files) => {
	if (err) {
		console.error('Unable to read directory: ' + err)
	} else {
		files
			.filter(file => file !== COVERS_DIR)
			.forEach(file => {
				const data = fs.readFileSync(STORIES_DIR + '\\' + file, UTF_8)
				const parsed = JSON.parse(data)
				const nameLength = file.length

				const key = file.slice(0, -8)
				const lang = file.substring(nameLength - 7, nameLength - 5)

				const newEntry = {
					key: key,
					title: parsed.title,
					year: parsed.year,
					series: parsed.series
				};

				STORIES_INDEX[lang].push(newEntry)
			})

		fs.writeFileSync(STORIES_INDEX_FILE, JSON.stringify(STORIES_INDEX), onSavingResult)
	}
})

fs.readdir(ARTICLES_DIR, (err, files) => {
	if (err) {
		console.error('Unable to read directory: ' + err)
	} else {
		files
			.filter(file => file !== COVERS_DIR)
			.forEach(file => {
				const data = fs.readFileSync(ARTICLES_DIR + '\\' + file, UTF_8)
				const parsed = JSON.parse(data)

				const key = file.slice(0, -8)
				const year = `${parsed.year}`

				const newEntry = {
					key: key,
					publicationDate: parsed.publicationDate
				};

				if(Object.hasOwn(ARTICLES_INDEX, year)) {
					if(ARTICLES_INDEX[year].find(x => x.key === newEntry.key && x.publicationDate === newEntry.publicationDate) === undefined)
						ARTICLES_INDEX[year].push(newEntry)
				} else
					ARTICLES_INDEX[year] = [ newEntry ]
			})

		const sortByPublicationDate = (a, b) => {
			const tokensA = a.publicationDate.split('.')
			const tokensB = b.publicationDate.split('.')
			const toDate = (tokens) => new Date(`${tokens[1]}.${tokens[0]}.${tokens[2]} GMT`)
			const dateA = toDate(tokensA)
			const dateB = toDate(tokensB)
			return dateA > dateB ? -1 : (
				dateB > dateA ? 1 : 0
			)
		}

		const sortByYear = (a, b) => b[0] - a[0]

		Object
			.keys(ARTICLES_INDEX)
			.forEach(key => {
				ARTICLES_INDEX[key] = ARTICLES_INDEX[key].sort(sortByPublicationDate)
			})


		const ARTICLES_INDEX_TMP = Object.entries(ARTICLES_INDEX).sort(sortByYear)

		fs.writeFileSync(ARTICLES_INDEX_FILE, JSON.stringify(ARTICLES_INDEX_TMP), onSavingResult)
	}
})
