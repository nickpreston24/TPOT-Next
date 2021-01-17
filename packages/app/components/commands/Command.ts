import { ReactNode } from 'react'

export interface ICommand {
  execute(): void
  unexecute(): void
}

export default ICommand

export abstract class Command implements ICommand {
  public reciever?: ReactNode
  public abstract execute(): void
  public abstract unexecute(): void

  constructor(reciever?: ReactNode) {
    Object.assign(this, reciever)
  }
}
