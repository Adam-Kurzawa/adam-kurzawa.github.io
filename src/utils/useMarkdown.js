import { useStaticAsset } from "./useStaticAsset"
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import * as matter from 'gray-matter-es'
import { ref } from "vue"
import { useDocumentId } from "./useDocumentId"
import { useDocumentType } from "./useDocumentType"
import highlight from '@/utils/highlightjs'
import formatCode from '@/utils/prettier.js'
import { H1_STYLE, H2_STYLE, H3_STYLE, H4_STYLE } from "@/components/system/headers"

export const useMarkdown = () => {
    const documentId = useDocumentId()
    const documentType = useDocumentType()
    const file = `/${documentType}/${documentId}.md`
    
    const metadata = ref()
    const htmlContent = ref()
    const htmlChapters = ref([])

    const onSuccess = (rawContent) => {
        const { data, content } = matter.matter(rawContent)
        const unsanitizedRawHtml = marked.parse(content)
        const htmlDOM = DOMPurify.sanitize(unsanitizedRawHtml, { RETURN_DOM_FRAGMENT: true })
        decorateCodeBlocks(htmlDOM)
        decorateImages(htmlDOM)
        decorateTables(htmlDOM)
        decorateParagraphs(htmlDOM)
        decorateHeaders(htmlDOM, 'h1', H1_STYLE)
        decorateHeaders(htmlDOM, 'h2', H2_STYLE)
        decorateHeader2(htmlDOM)
        decorateHeaders(htmlDOM, 'h3', H3_STYLE)
        decorateHeaders(htmlDOM, 'h4', H4_STYLE)
        const htmlString = htmlToString(htmlDOM)
        const chapters = htmlString.split("<hr>")
        metadata.value = {
            ...data,
            documentId: documentId,
            documentType: documentType,
            charactersCount: content.length,
            chaptersCount: chapters.length
        }
        htmlContent.value = htmlString
        htmlChapters.value = chapters
    }

    const onError = (error) => {
        console.log("WYJEBAŁO!!!")
    }

    fetch(useStaticAsset(file))
        .then(r => r.text())
        .then(onSuccess, onError)

    return {
        metadata: metadata,
        htmlContent: htmlContent,
        htmlChapters: htmlChapters
    }
}

function htmlToString(html) {
    const wrapper = document.createElement('div')
    wrapper.appendChild(html)
    return wrapper.innerHTML
}

function decorateImages(html) {
    html
        .querySelectorAll('img')
        .forEach(imgNode => {
            imgNode.classList.add('cursor-pointer')
            imgNode.classList.add('transition-all')
            imgNode.classList.add('rounded-[0.5rem]')
            imgNode.classList.add('hover:bg-slate-200/50')
            imgNode.classList.add('hover:scale-110')
        })
}

function decorateCodeBlocks(html) {
    html
        .querySelectorAll('code')
        .forEach(codeNode => {
            const anyLanguageClass = Array.from(codeNode.classList).find(c => c.startsWith('language-'))

            if(anyLanguageClass === undefined) {
                codeNode.classList.add('code-inline')
            } else {
                const lang = anyLanguageClass.replace('language-', '')

                if(lang.length !== 0) {
                    const f = formatCode(lang, codeNode.innerHTML)
                    const x = highlight(lang, f)
                    codeNode.innerHTML = x
                }
            }
        })
}

function decorateParagraphs(html) {
    html
        .querySelectorAll('p')
        .forEach(pNode => {
            if (!pNode.innerHTML.startsWith('–')) {
                pNode.classList.add('indent-8')
            }
        })
}

function decorateTables(html) {
    html
        .querySelectorAll('thead')
        .forEach(theadNode => {
            theadNode.classList.add('bg-slate-50')
            theadNode.classList.add('text-slate-600')
            theadNode.classList.add('!text-base')
            theadNode.classList.add('!font-bold')
            theadNode.classList.add('!uppercase')
            theadNode.classList.add('tracking-wider')
            theadNode.classList.add('font-inter')
            theadNode.classList.add('border-t')
            theadNode.classList.add('border-t-slate-200')
            theadNode.classList.add('border-b')
            theadNode.classList.add('border-b-slate-200')
            theadNode.classList.add('border-l')
            theadNode.classList.add('border-l-slate-200')
        })

    html
        .querySelectorAll('tr')
        .forEach(trNode => {
            trNode.classList.add('border-l')
            trNode.classList.add('border-l-slate-200')
        })
        
    html
        .querySelectorAll('th')
        .forEach(thNode => {
            thNode.classList.add('border-r')
            thNode.classList.add('border-r-slate-200')
            thNode.classList.add('py-2')
            thNode.classList.add('px-4')
        })
        
    html
        .querySelectorAll('td')
        .forEach(tdNode => {
            tdNode.classList.add('py-2')
            tdNode.classList.add('px-4')
            tdNode.classList.add('border-r')
            tdNode.classList.add('border-r-slate-200')
            tdNode.classList.add('border-b')
            tdNode.classList.add('border-b-slate-200')
        })
}

function decorateHeaders(html, header, style) {
    const styleArray = style.split(' ')

    html
        .querySelectorAll(header)
        .forEach(hNode => {
            styleArray.forEach(s => hNode.classList.add(s))
        })
}

function decorateHeader2(html) {
    html
        .querySelectorAll('h2')
        .forEach(h2Node => {
            const wrapper = document.createElement('div')

            const extra = document.createElement('div')
            extra.classList.add('underline')

            h2Node.replaceWith(wrapper)
            wrapper.appendChild(h2Node)
            wrapper.appendChild(extra)
        })
}