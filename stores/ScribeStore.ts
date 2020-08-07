import { observable } from 'mobx'
import { CheckoutStatus } from 'constants/CheckoutStatus';
import { isDev } from 'helpers';

/**
 * Holds contextual information for the Scribe app
 */
export class ScribeStore {

    // Optional singleton support
    static instance = null;
    static getInstance() {
        if (!ScribeStore.instance) {
            isDev() && console.count('ScribeStore -- init()')
            ScribeStore.instance = new ScribeStore();
        }
        return this.instance;
    }


    @observable dirty: boolean = false;
    @observable lastStatus: CheckoutStatus = CheckoutStatus.NotStarted;
    @observable lastSession: string = ''

}

export const scribeStore = ScribeStore.getInstance();
export default scribeStore;