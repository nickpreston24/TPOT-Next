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
        const { setStatus } = this.scribeStore
        setStatus(CheckoutStatus.NotStarted)
        // this.scribeStore.dirty = true;
        // console.log('this.activationRoute', this.activationRoute)
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

        this.scribeStore.lastStatus = this.scribeStore.currentStatus;
        this.scribeStore.currentStatus = CheckoutStatus.CheckedOut;
        // this.scribeStore.dirty = false;
        Router.push(this.activationRoute)
    }

    public unexecute(): void {
        throw new Error("Method not implemented.");
    }
}