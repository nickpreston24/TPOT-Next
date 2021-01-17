import * as ROUTES from '../../constants/routes'
import { appStore } from '../../stores'
import { SwitchAppCommand } from './AppCommands'
import { ICommand } from './Command'

export class AppRemote {
  private openSettings: ICommand
  private gotoScribe: ICommand

  constructor() {
    this.gotoScribe = new SwitchAppCommand(appStore, ROUTES.SCRIBE)
    this.openSettings = new SwitchAppCommand(appStore, ROUTES.SETTINGS)
  }

  public OpenSettings() {
    this.openSettings.execute()
  }

  public GotoScribe() {
    this.gotoScribe.execute()
  }
}

const appRemote = new AppRemote()

export default AppRemote

export { appRemote }
