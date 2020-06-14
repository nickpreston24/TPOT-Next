import { WordPressPaper } from '../paper';
import { Session } from '../../stores/wordpress';
export interface WordpressSession {
    firebaseUserId: string;
    paper: WordPressPaper;
    session?: Session;
}
