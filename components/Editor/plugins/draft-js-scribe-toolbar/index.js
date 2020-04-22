import React from 'react';
import createStore from './functions/createStore';
import createStyles from 'draft-js-custom-styles';
import Toolbar from './components/Toolbar';

export default (config = {}) => {
  const store = createStore({});

  const ScribeToolbar = props => (
    <Toolbar {...props} store={store} />
  )

  return {
    initialize: pluginFunctions => {
      const PREFIX = 'CUSTOM_'
      const { styles } = createStyles(['font-size', 'color', 'background'], PREFIX);
      store.updateItem('getPlugins', pluginFunctions.getPlugins);
      store.updateItem('getProps', pluginFunctions.getProps);
      store.updateItem('setEditorState', pluginFunctions.setEditorState);
      store.updateItem('getEditorState', pluginFunctions.getEditorState);
      store.updateItem('getReadOnly', pluginFunctions.getReadOnly);
      store.updateItem('setReadOnly', pluginFunctions.setReadOnly);
      store.updateItem('getEditorRef', pluginFunctions.getEditorRef);
      store.updateItem('customStyleFunctions', styles)
      store.updateItem('customStylePrefix', PREFIX)
    },

    // Re-Render the text-toolbar on selection change
    onChange: editorState => {
      store.updateItem('selection', editorState.getSelection());
      return editorState;
    },

    ScribeToolbar: ScribeToolbar,
  };
};