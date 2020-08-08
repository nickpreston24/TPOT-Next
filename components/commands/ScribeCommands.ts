import { Command } from './Command'
import Router from 'next/router'
import { ScribeStore } from '../../stores'
import { CheckoutStatus } from '../../constants';

export class FreshEditCommand extends Command {

    private activationRoute: string;
    private scribeStore: ScribeStore;

    constructor(store: ScribeStore, route: string) {
        super()
        this.activationRoute = route;
        this.scribeStore = store
    }

    public execute(): void {
        // this.scribeStore.lastStatus = null;
        this.scribeStore.currentStatus = CheckoutStatus.NotStarted;
        this.scribeStore.dirty = true;
        Router.push(this.activationRoute)
    }

    public unexecute(): void {
        throw new Error("Method not implemented.");
    }
}

export class CheckoutCommand extends Command {

    private activationRoute: string;
    private scribeStore: ScribeStore;

    constructor(store: ScribeStore, route: string) {
        super()
        this.activationRoute = route;
        this.scribeStore = store
    }

    public execute(): void {
        // this.scribeStore.lastSession.status = CheckoutStatus.InProgress; // Reset to In Progress when moving from /checkout/ route;
        // console.log('this.scribeStore.lastSession', this.scribeStore.lastSession)
        
        this.scribeStore.lastStatus = CheckoutStatus.NotStarted;
        this.scribeStore.currentStatus = CheckoutStatus.CheckedOut;
        this.scribeStore.dirty = false;
        Router.push(this.activationRoute)
    }

    public unexecute(): void {
        throw new Error("Method not implemented.");
    }
}