import { jsPDF } from "jspdf";

export class PdfService {

    static saveAsPdf(title, paragraphs) {
        const doc = new jsPDF();
        const indentedParagraphs = paragraphs.map(p => `           ${p}`)
        doc.setFont('times')
        doc.setFontSize(28)
        doc.text(title, 105, 20, { align: 'center', maxWidth: 120 });
        doc.setFontSize(14)
        doc.text(indentedParagraphs, 15, 40, { align: 'justify', maxWidth: 180, lineHeightFactor: 1.5 });
        doc.save(`${title}.pdf`);
    }
}


// 30 wierszy