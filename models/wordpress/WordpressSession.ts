import { WordPressPaper } from '../paper';
import { Session } from '../../stores/PaperStore';
export interface WordpressSession {
    firebaseUserId: string;
    paper: WordPressPaper;
    session?: Session;
}
