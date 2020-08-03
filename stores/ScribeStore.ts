import { observable } from 'mobx'
import { CheckoutStatus } from 'constants/CheckoutStatus';

/**
 * Holds contextual information for the Scribe app
 */
export class ScribeStore {

    @observable dirty: boolean = false;
    @observable lastStatus: CheckoutStatus = CheckoutStatus.NotStarted;
    @observable lastSession: string = ''

}

export const scribeStore = new ScribeStore();
export default scribeStore;