import * as ROUTES from '../../constants/routes'
import { ICommand } from "./Command";
import { appStore } from '../../stores';
import { SwitchAppCommand } from './AppCommands'
import { notify } from 'components/Toasts';
import { isDev } from 'helpers';

/* An invoker is like a remote control
* Feel free to come up with a better name
* 
* Scribe Remote for the Scribe App whenever it is active.
*/
export class AppRemote {
    private openSettings: ICommand;
    private gotoScribe: ICommand

    constructor() {
        this.gotoScribe = new SwitchAppCommand(appStore, ROUTES.SCRIBE);
        this.openSettings = new SwitchAppCommand(appStore, ROUTES.SETTINGS);
// console.log('openSettings', this.openSettings)
    }

    public OpenSettings() {
// console.log('openSettings', this.openSettings)
        this.openSettings.execute()
    }

    public GotoScribe() {
        this.gotoScribe.execute();
    }
}

// Add new apps as necessary
const appRemote = new AppRemote()

isDev() && console.log('appRemote', appRemote)

export default AppRemote;

export {
    appRemote
}