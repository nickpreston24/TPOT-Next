/**
* My best understanding is that Paper is specialized Post.
* I'm keeping Post alive just in case I need to support it.
* 
* Paper is the representation of a any response or request from wpapi (npm)
*/
export class Paper {
    id?: number;
    title: string;
    url: string;
    tags: string[];
    status: string;
    author: number;
    content: string;
    slug: string;
    language: string;

    // categories: string[] = [];

    constructor(props) {

        // let { title: string, content: string, language?: string } = props;

        Object.assign(this, { ...props })
        // this.content = content || null;
        // this.title = title || null;
        // this.language = language;
        this.slug = (this.title || '')
            .replace(/\s/g, '-')
            .toLowerCase()
    }

    // // Sample code - TODO: expand it to actually validate slugs, author name, html, etc using regex:
    // private validName(name: string) {
    //     if (name.length > 0 && /^[a-zA-Z]+$/.test(name)) {
    //         return true
    //     } else {
    //         throw new Error('Invalid name format')
    //     }
    // }
}