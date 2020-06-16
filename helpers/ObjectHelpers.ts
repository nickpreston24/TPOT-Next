export const getKeyByValue: any = (obj: any, value: string) => Object.entries(obj).find(([, name]) => value === name);

export const toPascalCase = (word: string) =>
    word.replace(/(\w)(\w*)/g, // split into word character groups
        (group1, group2) =>
            group1.toUpperCase() + group2.toLowerCase()) // make second group(s) uppercased