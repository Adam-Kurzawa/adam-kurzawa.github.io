import { jsPDF } from "jspdf";

export class PdfService {
    static #TITLE_OPTIONS = { align: 'center', maxWidth: 120 }
    static #TEXT_OPTIONS = { align: 'justify', maxWidth: 180, lineHeightFactor: 1.5 }

    static saveAsPdf(title, chapters) {
        const copy = JSON.parse(JSON.stringify(chapters)); 
        const flattened = PdfService.#flattenChapters(copy)
        const indentedParagraphs = PdfService.#addIndents(flattened)
        const pagedParagraphs = PdfService.#groupByEstimatedPage(indentedParagraphs)

        const doc = new jsPDF();
        doc.setFont('times')
        doc.setFontSize(28)
        doc.text(title, 105, 20, PdfService.#TITLE_OPTIONS)
        doc.setFontSize(14)
        
        // First page
        doc.text(pagedParagraphs[0], 15, 40, PdfService.#TEXT_OPTIONS);
        
        for (let index = 1; index < pagedParagraphs.length; index++) {
            doc.addPage()            
            doc.text(pagedParagraphs[index], 15, 20, PdfService.#TEXT_OPTIONS);
        }

        doc.save(`${title}.pdf`)
    }

    static #flattenChapters(chapters) {
        const addSeparator = (c) => {
            c.push('* * *')
            return c
        }

        const flattened = chapters.flatMap(addSeparator)
        flattened.pop()
        return flattened
    }

    static #addIndents(paragraphs) {
        return paragraphs.map(p => `           ${p}`)
    }

    static #groupByEstimatedPage(paragraphs) {
        let pages = [[]]
        let currentPage = 0
        let linesOnCurrentPage = 0

        paragraphs.forEach(p => {
            const linesInParagraph = p.length / 85

            if(linesOnCurrentPage + linesInParagraph > 30) {
                pages.push([p])
                currentPage += 1
                linesOnCurrentPage = 0
            } else {
                pages[currentPage].push(p)
                linesOnCurrentPage += linesInParagraph
            }
        });

        return pages
    }
}