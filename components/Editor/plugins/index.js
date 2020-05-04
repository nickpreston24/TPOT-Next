import createLinkifyPlugin from 'draft-js-linkify-plugin'
import createScribeToolbarPlugin from './draft-js-scribe-toolbar'

export const linkifyPlugin = createLinkifyPlugin()
export const scribeToolbarPlugin = createScribeToolbarPlugin()

export const { ScribeToolbar } = scribeToolbarPlugin

const plugins = [
  linkifyPlugin,
  scribeToolbarPlugin
]

export default plugins