import React from 'react';
import createStore from './functions/createStore';
import Toolbar from './components/Toolbar';

export default (config = {}) => {
  const store = createStore({});

  return {
    initialize: pluginFunctions => {
      store.updateItem('getPlugins', pluginFunctions.getPlugins);
      store.updateItem('getProps', pluginFunctions.getProps);
      store.updateItem('setEditorState', pluginFunctions.setEditorState);
      store.updateItem('getEditorState', pluginFunctions.getEditorState);
      store.updateItem('getReadOnly', pluginFunctions.getReadOnly);
      store.updateItem('setReadOnly', pluginFunctions.setReadOnly);
      store.updateItem('getEditorRef', pluginFunctions.getEditorRef);
    },

    // Re-Render the text-toolbar on selection change
    onChange: editorState => {
      store.updateItem('selection', editorState.getSelection());
      return editorState;
    },
    ScribeToolbar: props => (
      <Toolbar {...props} store={store} />
    ),
  };
};