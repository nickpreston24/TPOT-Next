export const getKeyByValue: any = (obj: any, value: string) =>
  Object.entries(obj).find(([, name]) => value === name)

export const toPascalCase = (word: string) =>
  word.replace(/(\w)(\w*)/g, (group1, group2) => group1.toUpperCase() + group2.toLowerCase())

export const toTitleCase = (text: string, delimiter: string = ' ') => {
  if (!text) throw new Error('Text cannot be null')
  let sentence = text.toLowerCase().split(delimiter)
  for (let i = 0; i < sentence.length; i++) {
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1)
  }
  return sentence.join(' ')
}
