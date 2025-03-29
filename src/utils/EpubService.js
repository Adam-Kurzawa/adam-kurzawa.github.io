import { saveAs } from 'file-saver'
import { zipSync, strToU8, ZipDeflate, ZipPassThrough } from 'fflate'

export class EpubService {

    static saveAsEpub(title, chapters, chapterName, chapterTitles) {
        return EpubService
            .#generateEpub(title, chapters, chapterName, chapterTitles)
            .then(blob => saveAs(blob, `${title}.epub`))
    }

    static sendAsEpub(title, chapters, chapterName, chapterTitles, kindleMail) {
        return EpubService
            .#generateEpub(title, chapters, chapterName, chapterTitles)
            .then(blob => {
                const formData = new FormData()
                formData.append("file", blob, `${title}.epub`)
                formData.append("to", kindleMail)

                return fetch("http://localhost:8080/send-email", {
                    method: "POST",
                    body: formData,
                })
            })
            .then(response => {
                if(response.ok) {
                    console.log("Plik wysłany pomyślnie")
                } else {
                    console.error("Wystąpił błąd przy wysyłaniu: ", response.status)
                }
            })
            .catch(err => {
                console.error("Wystąpił błąd przy wysyłaniu: ", err)
            })
    }

    static #generateEpub(title, chapters, chapterName, chapterTitles) {
        const jepub = new jEpub()
        let currentChapter = 1

        jepub.init({
            i18n: 'en', // Only accepted language
            title: title,
            author: 'Adam Kurzawa',
            publisher: 'Adam Kurzawa',
            description: title,
            tags: [ 'epub' ]
        })

        jepub.notes('Notes')

        chapters.forEach(chapter => {
            if(chapterTitles)
                jepub.add(`${chapterName} ${currentChapter} - ${chapterTitles[currentChapter - 1]}`, chapter)
            else
                jepub.add(`${chapterName} ${currentChapter}`, chapter)

            currentChapter += 1
        });
        
        return jepub.generate('blob')
    }
}