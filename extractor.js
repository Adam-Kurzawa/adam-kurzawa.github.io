import docx4js from "docx4js"
import * as fs from 'fs';
import readline from 'node:readline';

const sourceFilePath = "C:\\test.docx"
const resultFilePath = `${sourceFilePath.slice(0, -4)}json`
const docx = await docx4js.docx.load(sourceFilePath)
const paragraphs = []

const extractTextFromParagraph = (paragraph) => {
    const result = []

    if (paragraph.name === 'w:p' && paragraph.children) {
        paragraph.children.forEach(child => {
            if (child.name === 'w:r' && child.children) {
                child.children.forEach(subChild => {
                    if (subChild.name === 'w:t' && subChild.children) {
                        subChild.children.forEach(subSubChild => {
                            if (subSubChild.data) {
                                result.push(subSubChild.data)
                            }
                        })
                    }
                })
            }
        });
    }

    return result.join('')
}

const collectNonEmptyParagraphs = (type, props, children) => {
    if (type === 'section') {
        props.node.content.forEach(paragraph => {
            const text = extractTextFromParagraph(paragraph)

            if (text.length !== 0)
                paragraphs.push(text)
        })
    }
}

docx.render(collectNonEmptyParagraphs)

const scenes = []
let currentScene = []

paragraphs.forEach(paragraph => {
    if (paragraph !== '***') {
        currentScene.push(paragraph)
    } else {
        scenes.push(currentScene)
        currentScene = []
    }
})

const json = JSON.stringify(scenes)

const onSavingResult = (e) => {
    if (e && e !== null)
        console.log(e)
    else
        console.log("Saved file!")
}

await fs.writeFile(resultFilePath, json, onSavingResult)
