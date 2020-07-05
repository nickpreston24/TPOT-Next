/* The typed representation of a session (paper) from Firestore DB */

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


    public toString = (): string => `Session: ${this.title}\n${this.code}`;
}
