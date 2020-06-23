import { WordPressPaper } from './paper';


export interface Session {
    html: string,
    status: string,
    code?: string,
    excerpt?: string,
    //... docx, etc.
}
export interface WordpressSession {
    firebaseUserId: string;
    paper: WordPressPaper;
    session?: Session;
}
