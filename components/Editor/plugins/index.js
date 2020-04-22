import createLinkifyPlugin from 'draft-js-linkify-plugin'
import createRichButtonsPlugin from 'draft-js-richbuttons-plugin'
import createScribeToolbarPlugin from './draft-js-scribe-toolbar'
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';

export const linkifyPlugin = createLinkifyPlugin()
export const richButtonsPlugin = createRichButtonsPlugin() // export the instance for RichButtons.js's custom buttons

export const scribeToolbarPlugin = createScribeToolbarPlugin()
export const { ScribeToolbar } = scribeToolbarPlugin

const toolbarPlugin = createToolbarPlugin();
export const { Toolbar } = toolbarPlugin;

const plugins = [
  linkifyPlugin,
  scribeToolbarPlugin,
  toolbarPlugin
  // richButtonsPlugin,
]

export default plugins