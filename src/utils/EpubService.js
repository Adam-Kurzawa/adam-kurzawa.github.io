import { saveAs } from 'file-saver'
import { AlternataClient } from './AlternataClient'

export class EpubService {

    static saveAsEpub(title, chapters, chapterName, chapterTitles, tags, locale) {
        return EpubService
            .#generateEpub(title, chapters, chapterName, chapterTitles, tags, locale)
            .then(blob => saveAs(blob, `${title}.epub`))
    }

    static sendAsEpub(title, chapters, chapterName, chapterTitles, tags, locale, kindleMail, altchaToken) {
        return EpubService
            .#generateEpub(title, chapters, chapterName, chapterTitles, tags, locale)
            .then(blob => AlternataClient.sendEmail(blob, title, kindleMail, altchaToken))
    }

    static #generateEpub(title, chapters, chapterName, chapterTitles, tags, locale) {
        const jepub = new jEpub()
        let currentChapter = 1

        console.log(tags)
        console.log(locale)

        jepub.init({
            i18n: locale,
            title: title,
            author: 'Adam Kurzawa',
            publisher: 'Adam Kurzawa',
            description: title,
            tags: tags
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