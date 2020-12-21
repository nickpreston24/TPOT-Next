import CommonModel from '../common/CommonModel'
import { types } from 'mobx-state-tree'

const DashboardLayoutModel = types.compose(
  CommonModel,
  types
    .model({
      title: 'Toolbox'
    })
    .views(self => ({}))
    .actions(self => ({
      setTitle(str) {
        self.title = str
      }
    }))
    .named('DashboardLayoutModel')
)

export default DashboardLayoutModel
