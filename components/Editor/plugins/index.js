// import 'draft-js-static-toolbar-plugin/lib/plugin.css';
import createLinkifyPlugin from 'draft-js-linkify-plugin'
import createToolbarPlugin from 'draft-js-static-toolbar-plugin';
import createScribeToolbarPlugin from './draft-js-scribe-toolbar'

export const toolbarPlugin = createToolbarPlugin();
export const linkifyPlugin = createLinkifyPlugin()
export const scribeToolbarPlugin = createScribeToolbarPlugin()

export const { Toolbar } = toolbarPlugin;
export const { ScribeToolbar } = scribeToolbarPlugin

const plugins = [
  toolbarPlugin,
  linkifyPlugin,
  scribeToolbarPlugin,
]

export default plugins