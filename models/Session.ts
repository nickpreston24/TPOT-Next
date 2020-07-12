/* The typed representation of a session (paper) from Firestore DB */

import { CheckoutStatus } from "constants/CheckoutStatus";

export class Session {
    authorId: number;
    paperId?: number;
    title: string;
    filename: string;
    status: string;
    code: string;
    contributors: string[] = [];
    date_uploaded: Date;
    date_modified: Date;
    slug: string;
    excerpt: string;
    draft?: string = "";
    original?: string = "";
    stylesheet?: string = "";

    static create(props): Session {
        let { authorId, paperId, title, excerpt, filename, status, code } = props;
        return Object.assign(new Session(), { authorId, paperId, title, excerpt, filename, status, code } = props);
    }

    public lock = () => this.status = CheckoutStatus.CheckedOut

    public unlock = () => this.status = CheckoutStatus.InProgress

    public toString = (): string => `Session: ${this.title}\n${this.code}`;
}
