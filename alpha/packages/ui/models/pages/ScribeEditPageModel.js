import CommonModel from '../common/CommonModel'
import PageModel from '../common/PageModel'
import { types } from 'mobx-state-tree'

const ScribeEditPageModel = types.compose(
  CommonModel,
  PageModel,
  types
    .model({})
    .views(self => ({}))
    .actions(self => ({}))
    .named('ScribeEditPageModel')
)

export default ScribeEditPageModel
