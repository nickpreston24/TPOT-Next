import * as ROUTES from '../../constants/routes'
import { ICommand } from "./Command";
import { FreshEditCommand, CheckoutCommand } from "./ScribeCommands";
import { scribeStore } from '../../stores';

/* An invoker is like a remote control
* Feel free to come up with a better name
* 
* Scribe Remote for the Scribe App whenever it is active.
*/
export class ScribeRemote {

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

const scribeRemote = new ScribeRemote(
    new CheckoutCommand(scribeStore, ROUTES.CHECKOUT)
    , new FreshEditCommand(scribeStore, ROUTES.EDIT)
)

export default ScribeRemote;

export {
    scribeRemote
}