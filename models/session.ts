import Model from './model'

class Session extends Model {
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

    constructor(props) {
        super(props);
    }

    // set slug(slug:string) {

    // }

}

export default Session;