import { ReactNode } from "react"
import { isDev } from "helpers"

export interface ICommand {
    execute(): void;
    unexecute(): void;
}

export default ICommand

export abstract class Command implements ICommand {

    public reciever?: ReactNode // e.g. a button, Editor, or any React Component that needs to communicate with this command.
    public abstract execute(): void // Abstract here means it's required, but each base class implements it differently.
    public abstract unexecute(): void

    constructor(reciever?: ReactNode) {
        Object.assign(this, reciever)
        // isDev() && console.log('this.reciever', this.reciever)
    }
}
