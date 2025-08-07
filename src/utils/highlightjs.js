import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import groovy from 'highlight.js/lib/languages/groovy'
import java from 'highlight.js/lib/languages/java'
import scala from 'highlight.js/lib/languages/scala'

// List of languages supported by Highlight.js
// https://highlightjs.readthedocs.io/en/latest/supported-languages.html
// Then register the languages you need
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('groovy', groovy)
hljs.registerLanguage('java', java)
hljs.registerLanguage('scala', scala)

const highlightjs = hljs

export default function highlight(lang, code) {
    return hljs.highlight(code, { language: lang }).value
}
