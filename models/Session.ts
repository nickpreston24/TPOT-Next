/* The typed representation of a session (paper) from Firestore DB */

import { CheckoutStatus } from "constants/CheckoutStatus";

export class Session {
    authorId?: number = null;
    paperId?: number = null;
    title: string = '';
    status: string;
    code: string;
    contributors: string[] = [];
    date_uploaded: Date;
    date_modified: Date;
    filename?: string = '';
    slug?: string = '';
    excerpt?: string = '';
    lastContributor?: string = "" // For now, this will be the email - MP

    static create(props): Session {
        let { authorId, paperId, title, excerpt, filename, slug, status, code, lastContributor } = props;
        return Object.assign(new Session(), { authorId, paperId, slug, title, excerpt, filename, status, code, lastContributor } = props);
    }

    // public lock = () => this.status = CheckoutStatus.CheckedOut

    // public unlock = () => this.status = CheckoutStatus.InProgress

    // public toString = (): string => `Session: ${this.title}\n${this.code}`;
}
