import * as fs from 'fs';

const sourceFilePath = "B:\\OneDrive\\Projekty\\Doktryna Solarna\\Wywarstwienie.txt"
const resultFilePath = `${sourceFilePath.slice(0, -3)}json`
const decoder = new TextDecoder("windows-1250")
const file = fs.readFileSync(sourceFilePath)
const text = decoder.decode(file)

const paragraphs = text.split('\n')
const year = 2026
const description = ''
const title = sourceFilePath.split('\\').at(-1).slice(0, -4)

const scenes = []
let currentScene = []

paragraphs.forEach(paragraph => {
    const trimmedParagraph = paragraph.trim()

    if (trimmedParagraph.length !== 0) {
        if (trimmedParagraph === '***') {
            scenes.push(currentScene)
            currentScene = []
        } else if (trimmedParagraph.startsWith('–')) {
            currentScene.push({
                type: 'dialog',
                value: trimmedParagraph
            })
        } else {
            currentScene.push({
                type: 'text',
                value: trimmedParagraph
            })
        }
    }
})

scenes.push(currentScene)
currentScene = []

const json = JSON.stringify({
    title: title,
    description: description,
    year: year,
    tags: [],
    status: "PUBLISHED",
    youTubeVideoId: null,
    series: 'Doktryna Solarna',
    chapterTitles: null,
    chapters: scenes
})

const onSavingResult = (e) => {
    if (e && e !== null)
        console.log(e)
    else
        console.log("Saved file!")
}

await fs.writeFile(resultFilePath, json, onSavingResult)
