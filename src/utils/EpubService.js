import { saveAs } from 'file-saver';

export class EpubService {

    static saveAsEpub(title, chapters) {
        const jepub = new jEpub()

        jepub.init({
            i18n: 'en',
            title: title,
            author: 'Adam Kurzawa',
            publisher: 'Adam Kurzawa',
            description: title,
            tags: [ 'epub' ]
        })

        chapters.forEach(chapter => {
            jepub.add('* * *', chapter)
        });
        
        jepub.generate('blob')
            .then(epub => {
                const blob = new Blob([ epub ], { type: epub.type })
                saveAs(blob, `${title}.epub`);
            })
    }
}