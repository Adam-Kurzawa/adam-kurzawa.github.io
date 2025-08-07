import prettier from 'prettier/standalone'
import * as parserBabel from 'prettier/plugins/babel';
import * as parserEstree from 'prettier/plugins/estree';
import parserJava from 'prettier-plugin-java'

function selectParser(lang) {
    if(lang === 'java')
        return { parser: 'java', plugins: [ parserJava ] }
    else if(lang === 'javascript')
        return { parser: 'babel', plugins: [ parserEstree, parserBabel ] }
}

export default function formatCode(lang, code) {
    try {
        return prettier.format(
            code, 
            {
                ...selectParser(lang),
                semi: true,
                singleQuote: true,
            }
        )
    } catch (e) {
        console.log(e)
    }
}