import * as ROUTES from '../../constants/routes'
import { ICommand } from "./Command";
import { appStore } from '../../stores';
import { SwitchAppCommand } from './AppCommands'

/* An invoker is like a remote control
* Feel free to come up with a better name
* 
* Scribe Remote for the Scribe App whenever it is active.
*/
export class AppRemote {
    private openSettings: any;
    private gotoScribe: ICommand

    constructor(gotoScribe: ICommand, openSettings: ICommand) {
        this.gotoScribe = gotoScribe;
        this.openSettings = openSettings;
    }

    OpenSettings() {
        this.openSettings.execute()
    }

    public GotoScribe() {
        this.gotoScribe.execute();
    }
}

// Add new apps as necessary
const appRemote = new AppRemote(
    new SwitchAppCommand(appStore, ROUTES.SCRIBE),
    new SwitchAppCommand(appStore, ROUTES.SETTINGS),
)

export default AppRemote;

export {
    appRemote
}