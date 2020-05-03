// IMPORTS
///////////////////////////////////////////////////////////////////////////////////////////////////
import createNode from 'create-node';
import { convertFromRaw, convertToRaw } from 'draft-js';
import createStyles from 'draft-js-custom-styles';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromElement } from 'draft-js-import-element';
import Immutable from 'immutable';
import { snakeCase } from 'snake-case';
import '../functions/editor.css';
// import HorizontalRule from '../plugins/draft-js-mui-toolbar/utils/HorizontalRule';

/*
 
 oooooo     oooo                        o8o  oooo  oooo            
  `888.     .8'                         `"'  `888  `888            
   `888.   .8'    .oooo.   ooo. .oo.   oooo   888   888   .oooo.   
    `888. .8'    `P  )88b  `888P"Y88b  `888   888   888  `P  )88b  
     `888.8'      .oP"888   888   888   888   888   888   .oP"888  
      `888'      d8(  888   888   888   888   888   888  d8(  888  
       `8'       `Y888""8o o888o o888o o888o o888o o888o `Y888""8o 
                                                                   
                                                                   
                                                                   

*/

// VANILLA DRAFT MAPS, RENDERERS, & FUNCTIONs
///////////////////////////////////////////////////////////////////////////////////////////////////

export const baseStyleMap = {
    // These are custom style classes on top of Draft defaults ("BOLD", "ITALIC", "UNDERLINE")
    // Single property per class name so edit buttons can toggle the property on or off
    'HIGHLIGHT': {
        background: 'yellow'
    },
    'CUSTOM_COLOR_#0080FF': {color: "#0080FF"}
    // 'INDENT': {
    //     marginLeft: "30px"
    // },
    // 'CENTER': {
    //     textAlign: "center"
    // },
};

const blockRenderMap = Immutable.Map({
    // When the editor sees a block of type x, render the block using the following html tag
    'paragraph': {
        element: 'div'
    },
    'header-one': {
        element: 'h1'
    },
    'header-two': {
        element: 'h2'
    },
    'header-three': {
        element: 'h3'
    },
    'header-four': {
        element: 'h4'
    },
    'header-five': {
        element: 'h5'
    },
    'header-six': {
        element: 'h6'
    },
    'codeblock': {
        element: 'code'
    },
    'title': {
        element: 'h1'
    },
    'subtitle': {
        element: 'h4'
    },
    'blockquote': {
        element: 'blockquote'
    },
    'blockquote-intense': {
        element: 'blockquote'
    },
    'indent': {
        element: 'div'
    },
    'block': {
        element: 'div'
    },
});

const baseBlockStyleFn = (block) => {
    // When there is a block of type, return a css class name to style the block and make it pretty
    const type = block.getType();
    const align = block.getData().get('alignment')
    if (type === 'title') {
        return 'title';
    }
    if (type === 'subtitle') {
        return 'subtitle';
    }
    if (type === 'blockquote') {
        return 'blockqoute';
    }
    if (type === 'blockquote-intense') {
        return 'blockquote-intense';
    }
    if (type === 'indent') {
        return 'indent';
    }
    if (type === 'block') {
        return 'block';
    }
    if (align) return align
}
// contentBlock, PluginFunctions
const blockRenderer = (contentBlock, pluginFunctions) => {
    const type = contentBlock.getType();
    // if (type === 'page-break') {
    //     return {
    //         component: Icon,
    //         editable: false,
    //     };
    // }

    // console.log(type)

    if (type === 'atomic') {
        // console.log(pluginFunctions.getEditorState())
        const editorState = pluginFunctions.getEditorState()
        const contentState = editorState.getCurrentContent();
        const entityKey = contentBlock.getEntityAt(0);

        const entity = contentState.getEntity(entityKey);
        if (entity && entity.type === 'page-break') {
            return {
                component: HorizontalRule,
                editable: false,
            };
        }
    }

    // return undefined;
}

// CUSTOM STYLES SETUP (Package by @webdeveloperpr)
///////////////////////////////////////////////////////////////////////////////////////////////////
const {
    styles,
    customStyleFn,
    exporter
} = createStyles(['font-size', 'color', 'background'], 'CUSTOM', baseStyleMap);


/*
 
 ooooo                                                     .   
 `888'                                                   .o8   
  888  ooo. .oo.  .oo.   oo.ooooo.   .ooooo.  oooo d8b .o888oo 
  888  `888P"Y88bP"Y88b   888' `88b d88' `88b `888""8P   888   
  888   888   888   888   888   888 888   888  888       888   
  888   888   888   888   888   888 888   888  888       888 . 
 o888o o888o o888o o888o  888bod8P' `Y8bod8P' d888b      "888" 
                          888                                  
                         o888o                                 
                                                               
 
*/

// * CONVERT HTML TO DRAFTJS CONTENT STATE
///////////////////////////////////////////////////////////////////////////////////////////////////

// make ContentState from HTML String
const draftContentFromHtml = (html, stateFromElementConfig) => {
    let contentState = stateFromElement(createNode(`<div>${html}</div>`), stateFromElementConfig)
    let { newContentState, newBaseStyleMap} = flattenInlineStyleRanges(contentState, baseStyleMap)
    return { newContentState, newBaseStyleMap }
}

// break apart multi-property Styles into single, inline Styles
const flattenInlineStyleRanges = (contentState, baseStyleMap) => {
    let defaultStyles = {
        fontWeight: "BOLD",
        fontStyle: "ITALIC",
        textDecoration: "UNDERLINE"
    }
    let newContentState = convertToRaw(contentState)
    let blocks = newContentState.blocks
    let deleteStyles = []

    // Block Map
    blocks.forEach(block => {
        let compoundStyleRanges = block.inlineStyleRanges
        let singleStyleRanges = []

        // Compound Style Ranges
        compoundStyleRanges.forEach(styleRange => {
            let compoundStyleRangeName = styleRange.style
            let compoundStyleRangeClassProperties = baseStyleMap[compoundStyleRangeName]
            deleteStyles.push(compoundStyleRangeName) // All previous custom styles need to be removed after this forEach loop is done

            // Normal Vanilla Styles  -  EX: BOLD
            if (compoundStyleRangeClassProperties === undefined) {
                singleStyleRanges.push({
                    offset: styleRange.offset,
                    length: styleRange.length,
                    style: compoundStyleRangeName
                }) // Push Inline Range 
            } else {
                // Custom Named Styles  -  EX: CUSTOM_COLOR[#C00000]_FONT_WEIGHT[BOLD]_FONTSIZE[48PX]
                for (const key in compoundStyleRangeClassProperties) {
                    if (compoundStyleRangeClassProperties.hasOwnProperty(key)) {
                        const styleName = key;
                        const styleProperty = compoundStyleRangeClassProperties[key]
                        if (Object.keys(defaultStyles).includes(styleName)) {
                            // EX: CUSTOM_FONT_WEIGHT[BOLD]  <<--- This is a vanilla style that needs mapped to be "BOLD"
                            let className = defaultStyles[styleName].toUpperCase()
                            singleStyleRanges.push({
                                offset: styleRange.offset,
                                length: styleRange.length,
                                style: className
                            }) // Push Inline Range
                        } else {
                            // EX: CUSTOM_COLOR[#404040]  <<--- This is a custom inline style who's mapping matches the styleName, and needs to create an entry in the baseStyleMap
                            let className = `CUSTOM_${snakeCase(styleName).toUpperCase()}_${styleProperty.toUpperCase()}`
                            singleStyleRanges.push({
                                offset: styleRange.offset,
                                length: styleRange.length,
                                style: className
                            }) // Push Inline Range
                            if (!Object.keys(baseStyleMap).includes(className)) {
                                baseStyleMap[className] = {}
                                baseStyleMap[className][styleName] = styleProperty
                            }
                        }
                    }
                }
            }
        }) // End of Compound Style Ranges

        block.inlineStyleRanges = singleStyleRanges // replace ranges with new single style ranges

    }) // End of Block Map

    //Remove Compound Class Names from baseStyleMap
    deleteStyles.forEach(style => {
        delete baseStyleMap[style]
    })

    // console.log(baseStyleMap)

    //Return new Content State
    newContentState.blocks = blocks
    return {
        newContentState: convertFromRaw(newContentState),
        newBaseStyleMap: baseStyleMap
    }
}

// State from Element plugin configuration options
const stateFromElementConfig = {
    // Should return a Style() or Entity() or null/undefined
    customInlineFn: (element, {
        Style,
        Entity
    }) => {

        let elementStyles = []
        // Generic Styles
        if (element.className === 'highlight') {
            elementStyles.push({
                name: 'backgroundColor',
                data: element.style.backgroundColor
            })
        }
        if (element.parentElement.tagName === "STRONG" || element.style.fontWeight === 'bold' || element.parentElement.style.fontWeight === 'bold') {
            elementStyles.push({
                name: 'fontWeight',
                data: 'bold'
            })
        }
        if (element.parentElement.tagName === "EM" || element.style.fontStyle === 'italic' || element.parentElement.style.fontStyle === 'italic') {
            elementStyles.push({
                name: 'fontStyle',
                data: 'italic'
            })
        }
        if (element.parentElement.tagName === "INS" || element.style.textDecoration === 'underline' || element.parentElement.style.textDecoration === 'underline') {
            if (element.parentElement.tagName !== 'A') {
                elementStyles.push({
                    name: 'textDecoration',
                    data: 'underline'
                })
            }
        }
        // Color 
        if (element.parentElement.style.color) { // Parent Inline
            elementStyles.push({
                name: 'color',
                data: rgb2hex(element.parentElement.style.color)
            })
        }
        if (element.parentElement.color) { // Parent Font Tag
            elementStyles.push({
                name: 'color',
                data: '#' + element.parentElement.color
            })
        }
        if (element.style.color && element.parentElement.tagName !== "A") { // Normal Inline
            elementStyles.push({
                name: 'color',
                data: rgb2hex(element.style.color)
            })
        }
        // FontSize
        if (element.parentElement.style.fontSize) { // Parent Font-Size
            elementStyles.push({
                name: 'fontSize',
                data: element.parentElement.style.fontSize
            })
        }
        if (element.style.fontSize) { // Normal Font-Size
            elementStyles.push({
                name: 'fontSize',
                data: element.style.fontSize
            })
        }

        // Build Compound Style Class
        let prefix = 'CUSTOM'
        let styleName = ''
        let styleData = {}
        elementStyles.forEach(style => {
            if (style) {
                styleName += `_${style.name.toUpperCase()}[${style.data.toUpperCase()}]`
                styleData[style.name] = style.data
            }
        })

        // Entity: (type: string, data: DataMap<mixed>, mutability: EntityMutability = 'MUTABLE') => <DraftEntityInstance>
        if (element.tagName === "A" && element.href) { // Are we a Link?
            // console.log(element)
            return Entity(
                'LINK',
                { url: element.href },
                'MUTABLE'
            )
        } else if (element.tagName === "IMG") {
            // console.log(element)
            return Entity(
                'IMAGE',
                { src: element.src },
                'MUTABLE')
        }else { // Are we a compound inline style?
            // Final Inline Style
            styleName = prefix + styleName
            baseStyleMap[styleName] = styleData
            // Style( style: styleClassName ) > ({type: 'STYLE', style})
            return Style(styleName);
        }


        // if (element.className === 'title') {
        //     return Entity('IMAGE', 'MUTABLE', { src: 'www.thepathoftruth.com' })
        // }

        // return Entity('LINK', 'MUTABLE', 'www.thepathoftruth.com/new.htm')

        // return Entity(
        //     'LINK',
        //     { url: 'www.thepathoftruth.com/new.htm' }
        // )


    },

    // Should return null/undefined or an object with optional: type (string); data (plain object)
    customBlockFn: (element) => {
        let type = ''
        let data = {}

        data = (element.style.textAlign) && {
            ...data,
            alignment: element.style.textAlign // custom block style stored in data:{}
        }
        if (element.tagName === 'P' && !element.className) {
            type = 'paragraph'
        }
        if (element.className === 'title') {
            type = 'title'
        }
        if (element.className === 'subtitle') {
            type = 'subtitle'
        }
        if (element.className === 'indent') {
            type = 'indent'
        }
        if (element.className === 'block') {
            type = 'block'
        }
        if (element.className === 'quote') {
            type = 'blockquote'
            data = {
                ...data,
                alignment: 'center'
            }
        }
        if (element.className === 'intense-quote') {
            type = 'blockquote-intense'
            data = {
                ...data,
                alignment: 'center'
            }
        }
        if (!element.parentElement.parentElement) { // Check for sub block links under parent div
            let blocks = element.children
            for (const key in blocks) {
                // Sub Children Data
                if (blocks.hasOwnProperty(key) && blocks[key].children) {
                    const block = blocks[key]
                    const blockChildren = block.children
                    for (const key in blockChildren) {
                        if (blockChildren.hasOwnProperty(key)) {
                            const element = blockChildren[key];
                            if (element.href) {
                                data = {
                                    ...data,
                                    src: element.href
                                }
                            }
                        }
                    }
                }
            }
        }

        // * This is important
        return {
            // needs nulls to default back to default style map for DraftJS
            // If unstyled here, it will default to H1, Paragraph, H3, etc.
            type: type ? type : null,
            data: data ? data : null
        }
    }
}

//  end of IMPORT FUNCTION

/*
 
 oooooooooooo                                               .   
 `888'     `8                                             .o8   
  888         oooo    ooo oo.ooooo.   .ooooo.  oooo d8b .o888oo 
  888oooo8     `88b..8P'   888' `88b d88' `88b `888""8P   888   
  888    "       Y888'     888   888 888   888  888       888   
  888       o  .o8"'88b    888   888 888   888  888       888 . 
 o888ooooood8 o88'   888o  888bod8P' `Y8bod8P' d888b      "888" 
                           888                                  
                          o888o                                 
                                                                
 
*/

// * CONVERT DRAFT JS CONTENT STATE TO HTML

// make ContentState from HTML String
const draftContentToHtml = (editorState, contentState, baseStyleMap) => {
    const { exporter } = createStyles(['font-size', 'color', 'background'], 'CUSTOM_', baseStyleMap) // not passed?
    const stateToHTMLConfig = createBlockRenderers(editorState, contentState, exporter)
    // console.log(stateToHTMLConfig)
    let html = stateToHTML(contentState, stateToHTMLConfig)
    return html
}

const createBlockRenderers = (editorState, contentState, exporter) => {

    // Initial Configuration
    const stateToHTMLConfig = {

        blockStyleFn: (block) => {
            const blockType = block.type.toLowerCase()
            let styles = {}
            if (block.getData().get('alignment')) {
                styles = { ...styles, textAlign: block.getData().get('alignment') }
            }
            if (blockType === 'blockquote' || blockType === 'blockquote-intense') {
                styles = { ...styles, textAlign: 'center' }
            }
            if (blockType === 'block') {
                styles = { ...styles, marginLeft: 48 }
            }
            if (blockType === 'indent') {
                styles = { ...styles, textIndent: 48 }
            }
            if (blockType === 'block') {
                styles = { ...styles, marginLeft: 48 }
            }
            if (Object.keys(styles).length > 0) {
                return { style: styles }
            }
        },
        entityStyleFn: (entity) => {
            // console.log(entity.getType())
            // console.log(entity)
            const entityType = entity.get('type').toLowerCase();
            if (entityType === 'page-break') {
                return { element: 'hr' };
            }
            if (entityType === 'LINK') {
                // console.log("HELLO")
                return {
                    style: { borderBottom: '1px solid #C7D6C4 !important' },
                    attributes: { href: 'www.google.com' },
                    element: 'a',
                };
            }
        },


        // defaultBlockTag: 'div',
        blockRenderers: {},
        inlineStyles: exporter(editorState),
    }

    // Add in customBlockRenderers
    // console.log("RENDER", contentState)
    contentState.getBlockMap().forEach(contentBlock => {
        const blockTypeName = contentBlock.getType()  // local to blockmap

        // If there is not an entry yet, create the block renderer
        stateToHTMLConfig.blockRenderers[`${blockTypeName}`] = (block) => {
            const BLOCK_TYPE = block.getType() // local to renderer
            const customBlockTypes = ['header-one', 'header-two', 'header-three', 'header-four', 'header-five', 'header-six', 'title', 'subtitle', 'blockquote-intense', 'image']
            if (!customBlockTypes.includes(BLOCK_TYPE)) {
                // if this is not a custom draft-js block type, just return the default render method
            } else {
                // Setup Initial Tag Building Blocks
                const blockMapRef = blockRenderMap.get(BLOCK_TYPE)
                let TAG_NAME = blockMapRef ? blockMapRef.element : stateToHTMLConfig.defaultBlockTag
                let style = {}
                let htmlContents = ''

                // Special Case Overrides for BlockType
                if (BLOCK_TYPE === 'title') {
                    style = {
                        ...style,
                        fontWeight: 'bold'
                    }
                    TAG_NAME = 'h2' // override
                }
                if (BLOCK_TYPE === 'subtitle') {
                    style = {
                        ...style,
                        fontStyle: 'italic'
                    }
                }
                if (BLOCK_TYPE === 'blockquote-intense') {
                    style = {
                        ...style,
                        fontStyle: 'italic',
                        fontWeight: 'bold',
                        textAlign: 'center'
                    }
                }

                //// This is where the custom inline tag wrapper should go if created. Would allow headings to recieve color and other inline tags

                // Make Styles and Attributes as injectable, formated string
                style = (
                    Object.entries(style).reduce((styleString, [propName, propValue]) => {
                        return ` ${styleString}${propName}: ${propValue};`;
                    }, '')
                );

                return `<${TAG_NAME}${Object.keys(style)[0] ? ` style="${style}"` : ''}>${htmlContents !== '' ? htmlContents : block.getText()}</${TAG_NAME}>`


                // TODO: Add support for custom styles applied to H1-H6 tags
                // DO NOT DELETE!!! DONT YOU DARE! 
                // if (false) {
                //     const inlineStylesPlaceHolder = (placeholderFunction) => {
                //         // Get Style Names
                //         let styleRanges = {}
                //         block.findStyleRanges((characterMetadata) => {
                //             const customInlineStyles = exporter(editorState)
                //             const customInlineNames = Object.keys(exporter(editorState))
                //             const inlineStyleRanges = []
                //             const currentStyle = []
                //             customInlineNames.forEach(styleName => {
                //                 if (characterMetadata.hasStyle(styleName)) {
                //                     styleRanges[styleName] = {}
                //                     styleRanges[styleName].prop = customInlineStyles[styleName].style
                //                 }
                //             })
                //         })
                //         // Get Style Ranges
                //         Object.keys(styleRanges).forEach(styleName => {
                //             // console.log(styleName)
                //             block.findStyleRanges((characterMetadata) => {
                //                 if (characterMetadata.hasStyle(styleName)) {
                //                     return true
                //                 }
                //             }, (start, end) => {
                //                 if (!styleRanges[styleName].ranges) styleRanges[styleName].ranges = []
                //                 styleRanges[styleName].ranges.push({ start, end })
                //                 // let lastIndex = styleRanges[styleName].ranges.length - 2
                //                 // console.log("styleName", styleName)
                //                 // console.log("last.index", lastIndex)
                //                 // if (styleRanges[styleName].ranges[lastIndex]) {
                //                 //     console.log("last.end", styleRanges[styleName].ranges[lastIndex].end)
                //                 //     if (styleRanges[styleName].ranges[lastIndex].end === start) {
                //                 //         styleRanges[styleName].ranges[lastIndex].end = start
                //                 //     } else {
                //                 //         styleRanges[styleName].ranges.push({ start, end })
                //                 //     }
                //                 // }
                //                 // console.log("start", start)
                //                 // console.log("end", end)
                //                 // console.log("ranges", styleRanges[styleName].ranges)
                //                 // styleRanges[styleName].ranges.push({start, end})
                //             })
                //         })

                //         console.log("CURRENT", styleRanges)

                //         // let element = createNode(`<${TAG_NAME}>${block.getText()}<${TAG_NAME}/>`)
                //         let element = createNode(`<${TAG_NAME}>${block.getText()}</${TAG_NAME}>`)
                //         console.log(element.tagName)
                //         const ELEMENT_STRING = element.textContent
                //         // console.log(ELEMENT_STRING)

                //         let inlineRanges = {}
                //         for (const key in styleRanges) {
                //             if (styleRanges.hasOwnProperty(key)) {
                //                 const styleName = styleRanges[key]
                //                 const ranges = styleName.ranges
                //                 for (let index = 0; index < ranges.length; index++) {
                //                     const range = ranges[index];
                //                     const lastRange = ranges[index - 1]
                //                     // console.log("Range", range)
                //                     // console.log("range.start", range.start)
                //                     if (lastRange) {
                //                         // console.log("last.end", lastRange.end)
                //                         if (lastRange.end === range.start) {
                //                             styleRanges[key].ranges[index - 1].end = range.start
                //                             delete styleRanges[key].ranges[index]
                //                             // inlineRanges.push()
                //                             // console.log("DELETE")
                //                         }
                //                     }
                //                 }
                //                 // Get the ranges and restore them by range with classes as key
                //                 // console.log("STYLE", key, ranges)
                //                 // const styleKeyName = key
                //                 for (const key in ranges) {
                //                     if (ranges.hasOwnProperty(key)) {
                //                         const range = ranges[key];
                //                         // console.log(range)
                //                         const name = `${range.start}_${range.end}`
                //                         if (!inlineRanges[name]) inlineRanges[name] = []
                //                         inlineRanges[name].push(styleName.prop)
                //                     }
                //                 }
                //             }
                //         }
                //         console.log("MERGE", inlineRanges)
                //         // Create Empty Style Ranges (for unstyled text snippets)
                //         // const textLength = block.getText().length
                //         // console.log(textLength)
                //         // for (const key in inlineRanges) {
                //         //     // For each Range
                //         //     if (inlineRanges.hasOwnProperty(key)) {
                //         //         const keyRange = inlineRanges[key];
                //         //         // console.log(key)
                //         //         const keySplit = key.split('_')
                //         //         const start = keySplit[0]
                //         //         const end = keySplit[1]
                //         //         // console.log(start, end)
                //         //         const blockText = block.getText()
                //         //         let blockSlice = blockText.slice(start, end)

                //         //     }
                //         //     // append result to htmlContent
                //         // }


                //         let htmlContent = block.getText()
                //         const contentLength = block.getText().length
                //         const snippetRanges = [...Array(contentLength).keys()]


                //         let htmlSnippets = []
                //         for (const key in inlineRanges) {
                //             if (inlineRanges.hasOwnProperty(key)) {
                //                 const keySplit = key.split('_')
                //                 const start = keySplit[0]
                //                 const end = keySplit[1]
                //                 const snippet = block.getText().slice(start, end)
                //                 snippetRanges[arrayStart] = {
                //                     range: { start, end },
                //                     snippet
                //                 }
                //                 let arrayStart = snippetRanges.findIndex((entry) => {
                //                     return entry.start === start
                //                 })
                //                 let arrayEnd = snippetRanges.findIndex((entry) => {
                //                     return entry.end === end
                //                 })
                //                 snippetRanges.splice(arrayStart ? arrayStart + 1 : start, arrayEnd ? arrayEnd : end)
                //                 console.log(arrayStart, arrayEnd)

                //                 // htmlSnippets.push({
                //                 //     range: {start, end},
                //                 //     snippet
                //                 // })
                //                 // htmlContent = htmlContent.replace(snippet, `[:]${snippet}[:]`)
                //                 // console.log(snippetArray)

                //                 // const keyRange = inlineRanges[key];
                //                 // // console.log(key)
                //                 // const keySplit = key.split('_')
                //                 // const start = keySplit[0]
                //                 // const end = keySplit[1]
                //                 // // console.log(start, end)
                //                 // const snippet = block.getText().slice(start, end)

                //                 // let blockSlice = blockText.slice(start, end)
                //                 // keyRange.forEach(range => {
                //                 //     const styleName = Object.keys(range)[0]
                //                 //     const styleValue = Object.values(range)[0]
                //                 //     if (styleName == 'fontWeight') {
                //                 //         blockSlice = `<strong>${blockSlice}</strong>`
                //                 //     }
                //                 //     if (styleName == 'fontStyle') {
                //                 //         blockSlice = `<em>${blockSlice}</em>`
                //                 //     }
                //                 //     if (styleName == 'textDecoration') {
                //                 //         blockSlice = `<u>${blockSlice}</u>`
                //                 //     }
                //                 //     if (styleName == 'background') {
                //                 //         blockSlice = `<span style="background: ${styleValue};">${blockSlice}</span>`
                //                 //     }
                //                 //     if (styleName == 'color') {
                //                 //         blockSlice = `<span style="color: ${styleValue} !important;">${blockSlice}</span>`
                //                 //     }
                //                 //     if (styleName == 'fontSize') {
                //                 //         blockSlice = `<span style="font-size: ${styleValue};">${blockSlice}</span>`
                //                 //     }
                //                 //     // console.log(styleName, styleValue)  
                //                 // })
                //                 // console.log(blockSlice)
                //                 // htmlContent += blockSlice
                //                 // console.log(block.getText())
                //             }


                //             // append result to htmlContent
                //         }
                //         // htmlContent = htmlContent.split('[:]')
                //         console.log("SNIPPETS", htmlSnippets)
                //         console.log(snippetRanges)
                //         // const contentLength = block.getText().length
                //         // const enums = [...Array(contentLength).keys()]
                //         // console.log(enums)

                //         element.innerHTML = htmlContent

                //         // for (const key in styleRanges) {
                //         //     if (styleRanges.hasOwnProperty(key)) {
                //         //         const styleName = styleRanges.key;
                //         //         console.log(styleName)
                //         //         block.findStyleRanges((characterMetadata) => {
                //         //             // if (characterMetadata.hasStyle(styleName)) {
                //         //             //     styleRanges[styleName] = {}
                //         //             //     styleRanges[styleName].prop = customInlineStyles[styleName].style
                //         //             // }
                //         //         })
                //         //     }
                //         // }


                //         let blockStyles = {}
                //         let inlineStyles = {}
                //         let testStyle = null


                //         // block.findStyleRanges((characterMetadata) => {
                //         //     const customInlineStyles = exporter(editorState)
                //         //     const customInlineNames = Object.keys( exporter(editorState))
                //         //     const inlineStyleRanges = []
                //         //     const currentStyle = []
                //         //     customInlineNames.forEach(styleName => {
                //         //         if (characterMetadata.hasStyle(styleName)) {
                //         //             currentStyle.push(styleName)
                //         //             // inlineStyleRanges.push(customInlineStyles[styleName].style)
                //         //             // const property = customInlineStyles[styleName].style
                //         //             // testStyle = property
                //         //             // inlineStyles = { ...inlineStyles, ...property }
                //         //             return true
                //         //         }
                //         //     })
                //         //     console.log("CURRENT", currentStyle)
                //         //     // for (let index = 0; index < [5].length; index++) {
                //         //     //     return true
                //         //     // }
                //         // }, (start, end) => {
                //         //     // console.log(testStyle)
                //         //     console.log(start, end)
                //         // })
                //         // Get Outside Attributes
                //         // Get Outside Data
                //         const textAlign = block.getData().get("alignment")
                //         const styleString = (
                //             Object.entries(inlineStyles).reduce((styleString, [propName, propValue]) => {
                //                 return `${styleString}${propName}: ${propValue}; `;
                //             }, '')
                //         );
                //         // Apply Inline Style Tags one by one
                //         // console.log(styleString)
                //         // return `<${TAG_NAME}>${block.getText()}<${TAG_NAME}/>`
                //         // return `<${TAG_NAME}${textAlign !== '' ? ` style="text-align: ${textAlign}"` : ''}><span style="${styleString}">${block.getText()}<span></${TAG_NAME}>`
                //         console.log(element)
                //         return element.outerHTML

                //         // other code!

                //         // let style = {}
                //         // block.findStyleRanges((characterMetadata) => {
                //         //     const customInlineStyles = exporter(editorState)
                //         //     const customInlineNames = Object.keys(customInlineStyles)
                //         //     customInlineNames.forEach(name => {
                //         //         if (characterMetadata.hasStyle(name)) {
                //         //             const property = customInlineStyles[name].style
                //         //             console.log(name)
                //         //             console.log(property)
                //         //             style = { ...style, ...property }
                //         //         }
                //         //     })
                //         // })
                //         // const textAlign = block.getData().get("alignment")
                //         // const styleString = (
                //         //     Object.entries(style).reduce((styleString, [propName, propValue]) => {
                //         //         return `${styleString}${propName}: ${propValue}; `;
                //         //     }, '')
                //         // );
                //         // console.log(style, styleString)
                //         // return `<p${textAlign !== '' ? ` style="text-align: ${textAlign}"` : ''}><span style="${styleString}">${block.getText()}<span></p>`


                //         // {
                //         //     'null': (block) => {
                //         //         console.log("PARAG")
                //         //     },
                //         //     paragraph: (block) => {

                //         //     },
                //         //     'undefined': (block) => {
                //         //         console.log("YAY")
                //         //     },
                //         //     undefined: (block) => {
                //         //         console.log("YAY")
                //         //     },



                //         //     marshmallow: (block) => {
                //         //         console.log(block);
                //         //     },
                //         //     // blockRenderers['paragraph']
                //         //     // blockRenderers['atomic']
                //         //     // blockRenderers['blockquote-intense']

                //         //     // DEVELOPER: This function is complicated enough as is. It would be better to have it universally applicable,
                //         //     // though I don't know how to arbitrarily name functions in this object according to blocktype. Perhaps this
                //         //     //  blockRender object can be created via function that reads the editorState and makes the functions on the fly.
                //         //     'blockquote-intense': (block) => {
                //         //         let style = {}
                //         //         block.findStyleRanges((characterMetadata) => {
                //         //             const customInlineStyles = exporter(editorState)
                //         //             const customInlineNames = Object.keys(customInlineStyles)
                //         //             customInlineNames.forEach(name => {
                //         //                 if (characterMetadata.hasStyle(name)) {
                //         //                     const property = customInlineStyles[name].style
                //         //                     console.log(name)
                //         //                     console.log(property)
                //         //                     style = { ...style, ...property }
                //         //                 }
                //         //             })
                //         //         })
                //         //         const textAlign = block.getData().get("alignment")
                //         //         const styleString = (
                //         //             Object.entries(style).reduce((styleString, [propName, propValue]) => {
                //         //                 return `${styleString}${propName}: ${propValue}; `;
                //         //             }, '')
                //         //         );
                //         //         console.log(style, styleString)
                //         //         return `<blockquote${textAlign !== '' ? ` style="text-align: ${textAlign}"` : ''}><span style="${styleString}">${block.getText()}<span></blockquote>`
                //         //     },
                //         //     'title': (block) => {
                //         //         return `<h2>${block.getText()}</h2>`
                //         //     },
                //         //     'subtitle': (block) => {
                //         //         return `<h4>${block.getText()}</h4>`
                //         //     }

                //         // }

                //     }
                // }
            }



        } // End of Custom Block Render Function
    }) // End of Block Map Generator
    return stateToHTMLConfig
}

/*
 
 ooooo     ooo     .    o8o  oooo   o8o      .               
 `888'     `8'   .o8    `"'  `888   `"'    .o8               
  888       8  .o888oo oooo   888  oooo  .o888oo oooo    ooo 
  888       8    888   `888   888  `888    888    `88.  .8'  
  888       8    888    888   888   888    888     `88..8'   
  `88.    .8'    888 .  888   888   888    888 .    `888'    
    `YbodP'      "888" o888o o888o o888o   "888"     .8'     
                                                 .o..P'      
                                                 `Y8P'       
                                                             
 
*/

export const saveSession = (original, edited, code, baseStyleMap, notify) => {
    const contents = {
        original: !!original ? original : {},
        edited: !!edited ? edited : {},
        code: !!code ? code : {},
        baseStyleMap: !!baseStyleMap ? baseStyleMap : {}
    }
    let fileContents = JSON.stringify(contents)
    notify('Letter Saved to Disk', { variant: 'success', })
    // : TODO
    // const fileName = path.join(app.getPath('userData'),'Local Storage', 'session.json')
    // console.log(fileName)
    // fs.writeFile(fileName, fileContents, (error) => {
    //     if (error) {
    //         notify('Could not Save Draft', { variant: 'error'})
    //     } else {
    //         notify('Document Saved to Disk Successfully', { variant: 'success', })
    //     }
    // })
}

//  end of EXPORT FUNCTION

const rest = (ms) => {
    return new Promise(r => setTimeout(r, ms));
}

const rgb2hex = (rgb) => {
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ? "#" +
        ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
}

export { 
    styles, 
    exporter, 
    customStyleFn, 
    baseBlockStyleFn, 
    blockRenderMap, 
    blockRenderer, 
    stateFromElementConfig, 
    draftContentFromHtml, 
    draftContentToHtml, 
    flattenInlineStyleRanges, 
};
