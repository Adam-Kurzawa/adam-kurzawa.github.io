import { saveAs } from 'file-saver';

export class EpubService {

    static saveAsEpub(title, chapters, chapterName) {
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

        chapters.forEach(chapter => {
            jepub.add(`${chapterName} ${currentChapter}`, chapter)
            currentChapter += 1
        });
        
        jepub.generate('blob')
            .then(epub => {
                const blob = new Blob([ epub ], { type: epub.type })
                saveAs(blob, `${title}.epub`);
            })
    }
}