import CommonModel from '../common/CommonModel'
import DashboardLayoutModel from './DashboardLayoutModel'
import ScribeLayoutModel from './ScribeLayoutModel'
import { types } from 'mobx-state-tree'

const LayoutManagerModel = types.compose(
  CommonModel,
  types
    .model({
      dashboard: types.optional(DashboardLayoutModel, {}),
      scribe: types.optional(ScribeLayoutModel, {})
    })
    .views(self => ({}))
    .actions(self => ({}))
    .named('LayoutManagerModel')
)

export default LayoutManagerModel
