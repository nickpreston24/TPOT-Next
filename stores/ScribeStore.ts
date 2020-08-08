import { observable } from 'mobx'
import { CheckoutStatus } from 'constants/CheckoutStatus';
import { Session, createInstance } from 'models';

/**
 * Holds contextual information for the Scribe app
 */
export class ScribeStore {

    // Optional singleton support
    static instance = null;
    static getInstance() {
        if (!ScribeStore.instance)
            ScribeStore.instance = new ScribeStore();

        return this.instance;
    }


    @observable dirty: boolean = false;
    @observable lastStatus: CheckoutStatus = CheckoutStatus.NotStarted;
    @observable currentStatus: CheckoutStatus = CheckoutStatus.NotStarted;
    @observable lastSession: Session = createInstance(Session);

}

export const scribeStore = ScribeStore.getInstance();