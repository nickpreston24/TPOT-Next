import AppModel from '../common/AppModel'
import CommonModel from '../common/CommonModel'
import { types } from 'mobx-state-tree'

const SettingsAppModel = types.compose(
  CommonModel,
  AppModel,
  types
    .model({
      name: 'settings',
      shortName: 'Settings',
      fullName: 'TPOT Settings'
    })
    .views(self => ({}))
    .actions(self => ({}))
    .named('SettingsAppModel')
)

export default SettingsAppModel
