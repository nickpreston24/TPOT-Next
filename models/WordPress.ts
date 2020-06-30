export interface WordPressConfig {
    endpoint: string;
    username: string;
    password: string;
}

/* Basic representation of Post
* NOTE: Should never be exported
*/
interface WordPressPost {
    title: string;
    url: string;
    tags: string[]
    status: string
}

// NOTE: Should never be exported
class Post implements WordPressPost {
    status: string;
    title: string;
    url: string;
    tags: string[];
}

export interface WordPressPaper extends WordPressPost {
    authorId: number;
    content: string;
}

/* 
* My best understanding is that Paper is specialized Post.
* I'm keeping Post alive just in case I need to support it.
*/
export class Paper extends Post implements WordPressPaper {

    title: string;
    url: string;
    tags: string[];
    status: string;
    authorId: number;
    content: string;

    // constructor(title: string = null, url: string = null) {
    //     // super({ title, url })
    //     super()
    // }

    // static Create(): Paper {
    //     return new Paper()
    // }

    // Sample code - TODO: expand it to actually validate slugs, author name, html, etc using regex:
    private validName(name: string) {
        if (name.length > 0 && /^[a-zA-Z]+$/.test(name)) {
            return true
        } else {
            throw new Error('Invalid name format')
        }
    }
}

export interface WordpressSession {
    firebaseUserId: string;
    paper: WordPressPaper;
    session?: Session;
}


/* The typed representation of a session (paper) from Firestore DB */
export class Session {
    status: string
    contributors: string[]
    date_uploaded: Date
    date_modified: Date
    draft: string
    code: string
    original: string
    stylesheet: string
    filename: string
    title: string
    slug: string
    excerpt: string;
}