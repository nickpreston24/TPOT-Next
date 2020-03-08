import createLinkifyPlugin from 'draft-js-linkify-plugin'
import createRichButtonsPlugin from 'draft-js-richbuttons-plugin'
 
export const linkifyPlugin = createLinkifyPlugin()
export const richButtonsPlugin = createRichButtonsPlugin() // export the instance for RichButtons.js's custom buttons

const plugins = [
  linkifyPlugin,
  richButtonsPlugin,
]

export default plugins