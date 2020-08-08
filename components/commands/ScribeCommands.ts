import { Command } from './Command'
import Router from 'next/router'
import { ScribeStore } from '../../stores'
import { CheckoutStatus } from '../../constants';

export class FreshEditCommand extends Command {

    private activationRoute: string;
    private scribeStore: ScribeStore;

    constructor(store: ScribeStore, route: string) {
        super(null)
        this.activationRoute = route;
        this.scribeStore = store
    }

    public execute(): void {
        Router.push(this.activationRoute)
        this.scribeStore.lastStatus = CheckoutStatus.NotStarted;
        this.scribeStore.dirty = true;
    }

    public unexecute(): void {
        throw new Error("Method not implemented.");
    }
}

export class CheckoutCommand extends Command {

    private activationRoute: string;
    private scribeStore: ScribeStore;

    constructor(store: ScribeStore, route: string) {
        super(null)
        this.activationRoute = route;
        this.scribeStore = store
    }

    public execute(): void {
        Router.push(this.activationRoute)
        this.scribeStore.lastStatus = CheckoutStatus.CheckedOut;
        this.scribeStore.dirty = false;
    }

    public unexecute(): void {
        throw new Error("Method not implemented.");
    }
}