import { RichUtils } from 'draft-js'

/* ////////////////////////////////////////////////////// */
/*                         SCHEMAS                        */
/* ////////////////////////////////////////////////////// */


/* ----------------------- INLINE ----------------------- */

// A schema that creates the props needed for an [INLINE] button ('BOLD', 'ITALIC', etc.)
export const createInlineStyleButton = config => ({
    isActive: props =>
        props.activeInlineStyles &&
        props.activeInlineStyles.includes(config.type),
    toggleEffect: props => {
        props.setEditorState(
            RichUtils.toggleInlineStyle(
                props.getEditorState(),
                config.type
            )
        )
    }
})


/* ------------------------ BLOCK ----------------------- */

// A schema that creates the props needed for a [BLOCK] button ('heading-four', 'blockquote', etc.)
export const createBlockStyleButton = config => ({
    isActive: props =>
        props.activeBlockStyle &&
        props.activeBlockStyle === config.type,
    toggleEffect: props => {
        props.setEditorState(
            RichUtils.toggleBlockType(
                props.getEditorState(),
                config.type
            )
        )
    }
})


/* ------------------------ GROUP ----------------------- */

// A schema that creates the props needed for any group button where group is a function.
export const createGroupButton = config => ({
    isActive: props => {

        let types = config.options

        // Override types names only for buttons created with the customStyles module
        if (config.custom) {
            types = config.options.map( option => `${props.customStylePrefix}${config.type.toUpperCase()}_${option}` )
        }

        if (config.schema === 'inline') {
            return props.activeInlineStyles &&
                props.activeInlineStyles.some( style => types.includes(style))
        }
        if (config.schema === 'block') {
            return props.activeBlockStyle &&
                types.some( type => props.activeBlockStyle === type )
        }
    }
})


/* ----------------------- CUSTOM ----------------------- */

// A schema that creates the props needed for a [CUSTOM] button
// !IMPORTANT! - Uses functions created at plugin initilization
// These functions are from the 'draft-js-custom-styles' library
// via createStyles(['font-size', 'color', 'background'], PREFIX)
// The result is an object, customStyleFunctions, which contains
// three sets of functions, { color, fontSize, and background }
// EX: The set called 'color', contains functions for toggling on
// and off a Draft InlineStyle. Example:
//
// customStyleFunctions.color.toggle(
//      editorState,
//      'CUSTOM_COLOR_#FF0099'
// )
//
// The schema below though handles as many cases as you want. When
// creating a button config, just put the name of the JSS property
// you want DraftJS to handle, as well as the value you want: EX:
// { type: 'backgroundColor', value: '#FF0099', ...rest of config }

export const createCustomStyleButton = config => ({
    isActive: props => {
        const PREFIX = props.customStylePrefix // CONFIG
        const CSS_PROPERTY = config.type // color
        const CSS_VALUE = config.value // #FF0099
        const STYLE_NAME = `${PREFIX}${CSS_PROPERTY.toUpperCase()}_${CSS_VALUE}` // CUSTOM_COLOR_#FF0099
        return props.activeInlineStyles && props.activeInlineStyles.includes(STYLE_NAME)
    },
    toggleEffect: props => {
        const PREFIX = props.customStylePrefix // CONFIG
        const CSS_PROPERTY = config.type // color
        const CSS_VALUE = config.value // #FF0099
        const STYLE_NAME = `${PREFIX}${CSS_PROPERTY.toUpperCase()}_${CSS_VALUE}` // CUSTOM_COLOR_#FF0099

        // Register the custom style name in the editor's stylesheet before you apply it
        let customStyleMap = props.getProps().customStyleMap
        customStyleMap = Object.assign(customStyleMap,
            // Editor's customStyleMap
            {
                //  'BOLD': { fontWeight: 'bold' },
                //  'ITALIC': { fontStyle: 'italic' },
                //  'UNDERLINE': { textDecoration: 'underline' },
                [`${STYLE_NAME}`]: { [`${CSS_PROPERTY}`]: CSS_VALUE }
                //  ... etc.
            }
        )

        // Toggle the style using its stylesheet name (ex:  'CUSTOM_COLOR_#FF0099', 'CUSTOM_FONTSIZE_24PX', etc.)
        props.setEditorState(
            props.customStyleFunctions[`${CSS_PROPERTY}`].toggle(
                props.getEditorState(),
                CSS_VALUE.toUpperCase()
            )
        )
    }
})