import prettier from 'prettier/standalone'
import * as parserBabel from 'prettier/plugins/babel';
import * as parserEstree from 'prettier/plugins/estree';
import parserJava from 'prettier-plugin-java'

function selectParser(lang) {
    if(lang === 'java')
        return { parser: 'java', plugins: [ parserJava ] }
    else if(lang === 'javascript')
        return { parser: 'babel', plugins: [ parserEstree, parserBabel ] }
    else 
        return undefined
}

export default function formatCode(lang, code) {
    try {
        const parser = selectParser(lang)

        if(parser)
            return prettier.format(
                code, 
                {
                    ...parser,
                    semi: true,
                    singleQuote: true,
                }
            )
        else
            return code
    } catch (e) {
        console.log(e)
    }
}