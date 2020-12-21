import { getSnapshot, onSnapshot, types } from 'mobx-state-tree'

import CommonModel from './common/CommonModel'
import DetailsModel from './components/DetailsModel'
import LayoutManagerModel from './layouts/LayoutManagerModel'
import ScribeAppModel from './apps/ScribeAppModel'
import SettingsAppModel from './apps/SettingsAppModel'
import ToolboxAppModel from './apps/ToolboxAppModel'
import { createContext } from 'react'
import makeInspectable from 'mobx-devtools-mst'

export const RootModelContext = createContext(null)
export const StoreProvider = RootModelContext.Provider

const RootModel = types
  .model({
    toolbox: types.optional(ToolboxAppModel, {}),
    scribe: types.optional(ScribeAppModel, {}),
    settings: types.optional(SettingsAppModel, {}),
    // auth: types.optional( TYPE, {}),
    // anims: types.optional( TYPE, {}),
    // storage: types.optional( TYPE, {}),
    // routing: types.optional( TYPE, {}),
    layouts: types.optional(LayoutManagerModel, {}),
    details: DetailsModel
  })
  .views(self => ({}))
  .actions(self => ({}))
  .named('RootModel')

const initialState = {
  details: {
    text: 'cats',
    tags: ['chinese', 'diabolical doctrine', 'salvation', 'faith']
  },
  scribe: {
    longName: 'Congo!'
  }
}

let storeInstance = RootModel.create(initialState)

makeInspectable(storeInstance)

export const store = storeInstance

console.log(getSnapshot(store.scribe))

// onSnapshot(store, snapshot => {
//   console.log(snapshot.scribe)
//   // localStorage.setItem('rootState', JSON.stringify(snapshot));
// })
