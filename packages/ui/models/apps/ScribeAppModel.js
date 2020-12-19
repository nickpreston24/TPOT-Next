import AppModel from '../common/AppModel'
import CommonModel from '../common/CommonModel'
import { types } from 'mobx-state-tree'

const ScribeAppModel = types.compose(
  CommonModel,
  AppModel,
  types
    .model({
      name: 'scribe',
      shortName: 'Scribe',
      fullName: 'TPOT Scribe',
      showDetails: false
    })
    .views(self => ({}))
    .actions(self => ({
      afterAttach() {
        console.log('attached')
      }
    }))
    .named('ScribeAppModel')
)

export default ScribeAppModel
