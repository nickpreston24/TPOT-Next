import { observable, action } from 'mobx'
import { CheckoutStatus } from 'constants/CheckoutStatus';

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


    // @observable dirty: boolean = false;
    // @observable lastSession: Session = createInstance(Session);
    @observable lastStatus: CheckoutStatus = CheckoutStatus.NotStarted;
    @observable currentStatus: CheckoutStatus = CheckoutStatus.NotStarted;

    @action setStatus = (status: CheckoutStatus) => {
        this.lastStatus = this.currentStatus
        this.currentStatus = status;
// console.log('this.currentStatus', this.currentStatus)
    }

}

export const scribeStore = ScribeStore.getInstance();