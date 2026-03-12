import * as fs from 'fs';
import * as matter from 'gray-matter-es'

const ASSETS_DIR = 'C:\\Users\\Adam\\nodejs\\personal_website\\personal-website\\src\\assets'
const STORIES_LOCAL_FOLER_PATH = 'C:\\Users\\Adam\\IdeaProjects\\alternata-static\\src\\main\\resources\\static\\story'
const BLOG_LOCAL_FOLDER_PATH = 'C:\\Users\\Adam\\IdeaProjects\\alternata-static\\src\\main\\resources\\static\\blog'
const CODEX_LOCAL_FOLDER_PATH = 'C:\\Users\\Adam\\IdeaProjects\\alternata-static\\src\\main\\resources\\static'

const onSavingResult = (e) => {
    if (e && e !== null)
        console.log(e)
    else
        console.log("Saved file!")
}

function createStoriesIndex() {
	console.log('Starting creation of stories index...')
	const index = {}
	const files = fs.readdirSync(STORIES_LOCAL_FOLER_PATH)
	console.log(`Successfully read folder ${STORIES_LOCAL_FOLER_PATH}`)
	console.log(`${files.length} files found`)

	for (let i = 0; i < files.length; i++) {
		const fileName = files[i]
		const file = fs.readFileSync(`${STORIES_LOCAL_FOLER_PATH}\\${fileName}`)
		const { data, content } = matter.matter(file)
		const indexKey = fileName.replace('.md', '')
		console.log(`Successfully read metadata of ${fileName}`)
		
		index[indexKey] = {
			...data,
			documentId: indexKey,
			documentType: 'story',
			chaptersCount: content.split('***').length,
			charactersCount: content.length
		}
	}

	console.log('Successfully created stories index')
	return index
}

function createBlogPostsIndex() {
	console.log('Starting creation of blog posts index...')
	const index = {}
	const files = fs.readdirSync(BLOG_LOCAL_FOLDER_PATH)
	console.log(`Successfully read folder ${BLOG_LOCAL_FOLDER_PATH}`)
	console.log(`${files.length} files found`)

	const sortByPublicationDateDesc = (a, b) => {
		const [ dayA, monthA, yearA ] = a.publicationDate.split('.')
		const dateA = new Date(Number(yearA), Number(monthA) - 1, Number(dayA))

		const [ dayB, monthB, yearB ] = b.publicationDate.split('.')
		const dateB = new Date(Number(yearB), Number(monthB) - 1, Number(dayB))

		return dateA < dateB ? 1 : (dateA > dateB ? -1 : 0)
	}

	const sortByPublicationYearDesc = ([ yearA, ignoreA ], [ yearB, ignoreB ]) => yearA < yearB ? 1 : (yearA > yearB ? -1 : 0)

	for (let i = 0; i < files.length; i++) {
		const fileName = files[i]
		const file = fs.readFileSync(`${BLOG_LOCAL_FOLDER_PATH}\\${fileName}`)
		const { data, content } = matter.matter(file)
		const publicationYear = data.publicationDate.slice(-4)

		const metadata = {
			...data,
			documentId: fileName.replace('.md', ''),
			documentType: 'story',
			chaptersCount: content.split('***').length,
			charactersCount: content.length
		}

		console.log(`Successfully read metadata of ${fileName}`)
		
		if(index[publicationYear]) {
			index[publicationYear].push(metadata)
			index[publicationYear].sort(sortByPublicationDateDesc)
		} else 
			index[publicationYear] = [metadata]
	}

	const sortedIndex = Object.entries(index).toSorted(sortByPublicationYearDesc)
	console.log('Successfully created blog posts index')
	return sortedIndex
}

function createCodexIndex() {
	console.log('Starting creation of codex entries index...')

	const codexIndex = {
		crimsonverse: {
			title: "Karmazynowe gwiazdy",
			description: 'Gwiezdna Husaria i Zjednoczona Rzeczpospolita Polska walcząca o swoje miejsce w Drodze Mlecznej.',
			logo: "crimsonverse.png",
        	cover: "crimsonverse_cover.webp",
			values: []
		},
		deus_vult: {
			title: "Deus Vult",
			description: 'Opowieści z przyszłości niedalekiej i odległej, poruszające tematy religijne i mistyczne.',
			logo: "deusvult.png",
        	cover: "deusvult_cover.webp",
			values: []
		},
		doktryna_solarna: {
			title: "Doktryna Solarna",
			description: 'Space opera opowiadająca o upadku Federacji Solarnej, wypeczeniu wzniosłych idei i wojnie z drapieżnym wszechświatem.',
			logo: "ds.png",
			cover: "ds_cover.webp",
			values: []
		},
		solstice: {
			title: "Solstice",
			description: 'Brutalna IIWŚ, długa Zimna Wojna, agresywny wyścig kosmiczny nie tylko między kapitalistycznym Zachodem a komunistycznym Wschodem, ale i przeciwko ambintym wenom z siostrzanej Wenus.',
	        logo: "solstice.png",
    	    cover: "solstice_cover.webp",
			values: []
		}
	}

	const universes = Object.keys(codexIndex)

	for (let u = 0; u < universes.length; u++) {
		const universum = universes[u]
		const universumFolderPath = `${CODEX_LOCAL_FOLDER_PATH}\\${universum}`
		const files = fs.readdirSync(universumFolderPath)
		console.log(`Successfully read folder ${universumFolderPath}`)
		console.log(`${files.length} files found`)

		for (let f = 0; f < files.length; f++) {
			const fileName = files[f]
			const file = fs.readFileSync(`${universumFolderPath}\\${fileName}`)
			const { data, content } = matter.matter(file)

			const metadata = {
				...data,
				documentId: fileName.replace('.md', ''),
				documentType: universum,
				chaptersCount: content.split('***').length,
				charactersCount: content.length
			}

			console.log(`Successfully read metadata of ${fileName}`)
			codexIndex[universum].values.push(metadata)
		}
	}

	console.log('Successfully created codex entries index')
	return codexIndex
}

function createMetaindex() {
	const codexIndex = createCodexIndex()

	return {
		story: createStoriesIndex(),
		blog: createBlogPostsIndex(),
		fragment: {},
		crimsonverse: codexIndex.crimsonverse,
		deus_vult: codexIndex.deus_vult,
		doktryna_solarna: codexIndex.doktryna_solarna,
		solstice: codexIndex.solstice
	}
}

function saveMetaindex() {
	const metaindex = createMetaindex()
	const metaindexAssetsPath = ASSETS_DIR + '\\metaindex.json'
	fs.writeFileSync(metaindexAssetsPath, JSON.stringify(metaindex), onSavingResult)
}

saveMetaindex()
