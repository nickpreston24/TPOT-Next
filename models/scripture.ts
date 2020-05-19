const patterns = {
    'prefix': /(?<Scripture>[a-zA-Z]+\s+\d{1,3}:?\d{1,2}-?\d{1,2}\s+[A-Z]+\r*\n)(?<Text>.*?)(?:\r*\n){2}/gsm,
    'postfix': /^(?<Text>.*?)(?<Scripture>\(\w+\s+\d{1,3}:?\d{1,2}-?\d{1,2}\s+[A-Z]{2,4}\)\.?)/gm
}

const parseScriptures = (text: any, pattern: RegExp) => {
    const matches = text.match(pattern) || []
    return matches
}

enum ScriptureType {
    Prefixed = 'Prefixed', // Text comed after the Book and Verse
    Postfixed = 'Postfixed', // Text comes before the Book and Verse
    //...et al
}

export type Scripture = {
    scriptureType: ScriptureType,

}

const flatten = (array: Array<any>): Array<any> => {
    return array.reduce((accumulator, nextValue) => accumulator.concat(nextValue), new Array<any>())
}

const flatt2n = (array: Array<any>): Array<any> => ([] as any).concat(...array)

class ScriptureParser {

    parse = (text: string): Scripture => {

        const delimiter = '\n\n'

        let prefixScripture = /(?<Scripture>[a-zA-Z]+\s+\d{1,3}:?\d{1,2}-?\d{1,2}\s+[A-Z]+\r*\n)(?<Text>.*?)(?:\r*\n){2}/gsm
        let postFixScripture = /^(?<Text>.*?)(?<Scripture>\(\w+\s+\d{1,3}:?\d{1,2}-?\d{1,2}\s+[A-Z]{2,4}\)\.?)/gm

        // const prefixed = parseScriptures(text, patterns.prefix)
        // const postfixed = parseScriptures(text, patterns.postfix)

        const prefixed = parseScriptures(text, prefixScripture)
        const postfixed = parseScriptures(text, postFixScripture)

        let scripture: Scripture = {
            scriptureType: ScriptureType.Postfixed,
        }

        // console.log('scripture :>> ', scripture)
        console.log('text :>> ', text)

        console.log(`prefixed :>> ${prefixed.length}`, prefixed)
        console.log(`postfixed :>> ${postfixed.length}`, postfixed)

        // let result = flatten([prefixed, postfixed])
        //     // .flat()
        //     .map(r => r.trim())
        //     .join(delimiter)

        // console.log(
        //     'resulting text: ', result
        //     , '\ntotal', result.split(delimiter).length
        //     , 'pre:', prefixed.length, 'post:', postfixed.length)

        return scripture
    }
}

export const scriptureParser = new ScriptureParser()