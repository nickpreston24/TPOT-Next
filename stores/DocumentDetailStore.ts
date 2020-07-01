import { observable, action } from "mobx"
import moment from "moment"

export default class DetailState {

    paper: any;
    
    /**
     * @type Boolean
     * @description
     * An observable for hiding/showing the Unlock Button
     */
    @observable allowUnlock = false

    /**
     * @type Number
     * @description
     * An observable for the time in seconds since the last save
     */
    @observable seconds_since_last_save = 0

    /**
     * @description
     * checkUnlock() to make sure the prospective document is available to edit
     * before it can be unlocked. The reason we know this will work is if
     * another user has the document checked out, it is autosaving every 60
     * seconds. It then updates the "date_modified" field in Firebase. So if
     * we do a local operation against the staticly retrieved "date_modified"
     * and check to see if it is say, 70 seconds since it was last updated,
     * then it is possible to know the other user is not online, or having 
     * internet trouble or is no longer actively autosaving the document.
     * This means we can safely adjust the status on Firebase to "in-progress",
     * bypassing the local check for viability and gain access to the document
     * 
     * Obviously a better thing to do would be to handle this all serverside
     * with a backend that knows what users are online and who is currently in
     * a document, but for now, this should be safe enough considering we won't
     * have many concurrent users all begging to edit at the same time.
     */
    @action checkUnlock = async (paper: any) => {
        // let { paper } = this.props
        let { date_modified_timestamp } = paper
        let now = moment(new Date())
        let end = moment(date_modified_timestamp.toDate())
        let duration = moment.duration(now.diff(end)).asSeconds()
        // Return if not enough time has passed
        if (duration <= 70) { return }
        // Else enable the unlock button
        this.allowUnlock = true
    }

    @observable open = false

    @action expand = () => this.open = true
    @action collapse = () => this.open = false

}

export const details = new DetailState();