import CommonModel from '../common/CommonModel'
import { types } from 'mobx-state-tree'

const AppModel = types.compose(
  CommonModel,
  types
    .model({
      name: 'app',
      shortName: 'App',
      fullName: 'Company App'
    })
    .views(self => ({}))
    .actions(self => ({}))
    .named('AppModel')
)

export default AppModel
