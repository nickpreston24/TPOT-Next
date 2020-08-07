import { observable } from 'mobx'
import { AppAction } from '../models/AppAction'
// import { AppButton } from '../components/atoms'

/**
 * Holds current Toolbox App information
 */

export class AppStore {
    @observable currentApp: string = "Scribe"
    // @observable appActions: AppAction[]
    // @observable currentApp: AppButton
}