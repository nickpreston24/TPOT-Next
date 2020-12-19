import {
  getParent,
  getPath,
  getSnapshot,
  getType,
  types
} from 'mobx-state-tree'

const CommonModel = types
  .model({})
  .views(self => ({
    get parent() {
      return getParent(self)
    },
    get snap() {
      return getSnapshot(self)
    },
    get path() {
      return getPath(self)
    },
    get type() {
      return getType(self)
    }
  }))
  .actions(self => ({}))
  .named('CommonModel')

export default CommonModel
