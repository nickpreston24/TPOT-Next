import Model from './model'

/* Basic representation of Post
* NOTE: Should never be exported
*/
interface WordPressPost {
    title: string;
    url: string;
    tags: string[]
    status: string
}

class Post extends Model implements WordPressPost {
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
export class Paper extends Post implements WordPressPaper{

    title: string;
    url: string;
    tags: string[];
    status: string;
    authorId: number;
    content: string;

    constructor(title: string = null, url: string = null) {
        super()
        Object.assign(this, { title, url })
    }

    static Create(): Paper {
        return new Paper()
    }

    // Sample:
    private validName(name: string) {
        if (name.length > 0 && /^[a-zA-Z]+$/.test(name)) {
            return true
        } else {
            throw new Error('Invalid name format')
        }
    }
}