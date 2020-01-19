/** Here to win my war against unassigned props
 * Usage: import and use inside anything (constructors, etc.) like so: 
 *      findBadProps(this)
 */
export const findBadProps = (obj, srcFileName = "", verbose = true) => {

    let badProps = Object
        .entries(obj)
        .filter(element => {
            const [key, value] = element
            // console.log(`key:  ${key}`, `value:`, value, 'is null? ', value === null || value === undefined);
            return value === null || value === undefined
        })

    if (badProps && badProps.length > 0) {
        let message = `In file ${srcFileName}, the following props are empty:`
        if (srcFileName)
            console.warn(message);
        if (verbose) new Promise((res, rej) => console.table(badProps))
        else console.info(message, badProps)
    }

    return badProps
}

// Filter null and undefined values (src: https://stackoverflow.com/questions/286141/remove-blank-attributes-from-an-object-in-javascript):
export const filterEmptyProps = (obj) => Object.entries(obj).reduce((a, [k, v]) => (v == null ? a : { ...a, [k]: v }), {})

// Filter ONLY null
export const findNullProps = (obj) => Object.entries(obj).reduce((a, [k, v]) => (v === null ? a : { ...a, [k]: v }), {})

// Filter ONLY undefined
export const findUndefinedProps = (obj) => Object.entries(obj).reduce((a, [k, v]) => (v === undefined ? a : { ...a, [k]: v }), {})

// Clean up empty props (null | undefined) and remove them entirely
export const cleanEmptyProps = (obj) => Object.entries(obj)
    .map(([k, v]) => [k, v && typeof v === "object" ? cleanEmptyProps(v) : v])
    .reduce((a, [k, v]) => (v == null ? a : { ...a, [k]: v }), {});