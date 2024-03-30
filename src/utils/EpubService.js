import { saveAs } from 'file-saver';

export class EpubService {

    static saveAsEpub(title, paragraphs) {
        const jepub = new jEpub()

        jepub.init({
            i18n: 'en',
            title: title,
            author: 'Adam Kurzawa',
            publisher: 'Adam Kurzawa',
            description: title,
            tags: [ 'epub' ]
        })

        jepub.add('Chapter 01', paragraphs)
        
        jepub.generate('blob')
            .then(epub => {
                console.log(epub)
                console.log(epub.type)
                const blob = new Blob([ epub ], { type: epub.type })
                saveAs(blob, `${title}.epub`);
            })
    }
}