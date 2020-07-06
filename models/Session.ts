/* The typed representation of a session (paper) from Firestore DB */

import { CheckoutStatus } from "constants/CheckoutStatus";

export class Session {
    authorId: number;
    paperId: number;
    status: string;
    contributors: string[];
    date_uploaded: Date;
    date_modified: Date;
    draft: string;
    code: string;
    original: string;
    stylesheet: string;
    filename: string;
    title: string;
    slug: string;
    excerpt: string;

    public lock = () => this.status = CheckoutStatus.CheckedOut

    public unlock = () => this.status = CheckoutStatus.InProgress

    public toString = (): string => `Session: ${this.title}\n${this.code}`;
}
