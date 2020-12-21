import AppModel from '../common/AppModel'
import CommonModel from '../common/CommonModel'
import { types } from 'mobx-state-tree'

const ToolboxAppModel = types.compose(
  CommonModel,
  AppModel,
  types
    .model({
      name: 'toolbox',
      shortName: 'Toolbox',
      fullName: 'TPOT Toolbox'
    })
    .views(self => ({}))
    .actions(self => ({}))
    .named('ToolboxAppModel')
)

export default ToolboxAppModel
