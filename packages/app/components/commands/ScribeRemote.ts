import * as ROUTES from '../../constants/routes'
import { scribeStore } from '../../stores'
import { ICommand } from './Command'
import { CheckoutCommand, FreshEditCommand } from './ScribeCommands'

export class ScribeRemote {
  gotoCheckout: ICommand
  gotoBlankEditor: ICommand

  constructor(checkoutCommand, newEditCommand) {
    this.gotoCheckout = checkoutCommand
    this.gotoBlankEditor = newEditCommand
  }

  public Checkout() {
    this.gotoCheckout.execute()
  }

  public CreateNew() {
    this.gotoBlankEditor.execute()
  }
}

const scribeRemote = new ScribeRemote(
  new CheckoutCommand(scribeStore, ROUTES.CHECKOUT),
  new FreshEditCommand(scribeStore, ROUTES.NEW)
)

export default ScribeRemote

export { scribeRemote }
