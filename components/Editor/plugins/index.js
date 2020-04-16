import createLinkifyPlugin from 'draft-js-linkify-plugin'
import createRichButtonsPlugin from 'draft-js-richbuttons-plugin'
import createScribeToolbarPlugin from './draft-js-scribe-toolbar'
 
export const linkifyPlugin = createLinkifyPlugin()
export const richButtonsPlugin = createRichButtonsPlugin() // export the instance for RichButtons.js's custom buttons
export const scribeToolbarPlugin = createScribeToolbarPlugin()

export const { ScribeToolbar } = scribeToolbarPlugin

const plugins = [
  linkifyPlugin,
  scribeToolbarPlugin
  // richButtonsPlugin,
]

export default plugins