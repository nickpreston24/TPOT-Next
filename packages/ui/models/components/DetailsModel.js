import { getSnapshot, types } from 'mobx-state-tree'

import CommonModel from '../common/CommonModel'

const DetailsModel = types.compose(
  CommonModel,
  types
    .model({
      text: '...',
      tags: types.array(types.string)
    })
    .views(self => ({}))
    .actions(self => ({
      setText(text) {
        const dashboard = self.parent.layouts.dashboard
        dashboard.setTitle(text)
        self.text = text
      }
    }))
    .named('DetailsModel')
)

export default DetailsModel
