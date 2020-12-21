import CommonModel from '../common/CommonModel'
import { types } from 'mobx-state-tree'

const PageModel = types.compose(
  CommonModel,
  types
    .model({
      name: 'toolbox',
      shortName: 'Toolbox',
      fullName: 'TPOT Toolbox'
    })
    .views(self => ({}))
    .actions(self => ({}))
    .named('PageModel')
)

export default PageModel
