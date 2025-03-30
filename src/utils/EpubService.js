import { saveAs } from 'file-saver'
import { AlternataClient } from './AlternataClient'

export class EpubService {

    static saveAsEpub(title, chapters, chapterName, chapterTitles) {
        return EpubService
            .#generateEpub(title, chapters, chapterName, chapterTitles)
            .then(blob => saveAs(blob, `${title}.epub`))
    }

    static sendAsEpub(title, chapters, chapterName, chapterTitles, kindleMail) {
        return EpubService
            .#generateEpub(title, chapters, chapterName, chapterTitles)
            .then(blob => AlternataClient.sendEmail(blob, title, kindleMail))
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