import * as ROUTES from '../../constants/routes'
import { ICommand } from "./Command";
import { FreshEditCommand, CheckoutCommand } from "./ScribeCommands";
import { scribeStore, appStore } from '../../stores';

/* An invoker is like a remote control
* Feel free to come up with a better name
* 
* Scribe Remote for the Scribe App whenever it is active.
*/
export class AppRemote {

    gotoCheckout: ICommand
    gotoBlankEditor: ICommand;

    constructor(checkoutCommand, newEditCommand) {
        // console.log('checkoutCommand', checkoutCommand)
        this.gotoCheckout = checkoutCommand;
        // console.log('this.gotoCheckout', this.gotoCheckout)
        this.gotoBlankEditor = newEditCommand;

        console.log('this', this)
    }

    public Checkout() {
        this.gotoCheckout.execute();
    }

    public CreateNew() {
        this.gotoBlankEditor.execute();
    }
}

const appRemote = new AppRemote(
    new CheckoutCommand(appStore, ROUTES.CHECKOUT)
    , new FreshEditCommand(appStore, ROUTES.EDIT)
)

export default AppRemote;

export {
    appRemote
}