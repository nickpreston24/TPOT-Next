import CommonModel from '../common/CommonModel'
import { types } from 'mobx-state-tree'

const ScribeLayoutModel = types.compose(
  CommonModel,
  types
    .model({})
    .views(self => ({}))
    .actions(self => ({}))
    .named('ScribeLayoutModel')
)

export default ScribeLayoutModel
