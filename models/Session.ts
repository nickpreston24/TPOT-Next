/* The typed representation of a session (paper) from Firestore DB */

import { CheckoutStatus } from "constants/CheckoutStatus";
import { Language } from "constants/languages";

export class Session {

    authorId?: number;
    paperId?: number;
    title: string;
    filename?: string;
    slug?: string;
    excerpt?: string;
    status: string;
    code: string;
    language: string | Language;

    contributors: string[] = [];
    lastContributor?: string = "" // For now, this will be the email - MP

    categories: string[] = [];

    date_uploaded: Date;
    date_modified: Date;

    constructor(props) {

        // isDev() && console.log('props', props)
        // Allows for DTOs
        if (!props)
            return

        let { authorId, paperId, categories
            , language, title, excerpt, filename
            , status, code, lastContributor
            , date_uploaded, date_modified
        } = props;

        //Set defaults/fallbacks:

        language = !!language ? language.trim() : ""

        this.title = title.replace(/[_;:]/g, '');
        let slug =
            (title || '')
                .replace(/[',?!;:]/g, '')
                .replace(/_/, ' ')
                .replace(/\s/g, '-')
                .toLowerCase()

        // console.log('slug :>>', slug)
        // console.log('language', language)

        this.slug = slug || '';
        this.authorId = authorId || -1
        this.paperId = paperId || -1
        this.status = status || CheckoutStatus.InProgress
        this.excerpt = excerpt || ''
        this.filename = filename || '';
        this.language = language || Language.English;
        this.excerpt = excerpt || '';
        this.code = code || '<p></p>';
        this.contributors = [] // TODO: add functionality in other components for deciding this.
        this.lastContributor = lastContributor || ''
        this.categories = categories || []
        this.date_modified = date_modified || null;
        this.date_uploaded = date_uploaded || null;
    }

    static create(props): Session {
        return new Session(props);
    }

    public toJSON() {
        return {
            authorId: this.authorId,
            paperId: this.paperId,
            title: this.title,
            status: this.status,
            language: this.language,
            code: this.code,
            slug: this.slug,
            excerpt: this.excerpt,
            categories: this.categories,
            contributors: this.contributors,
            lastContributor: this.lastContributor,
            date_modified: this.date_modified,
            date_uploaded: this.date_uploaded,
            filename: this.filename,
        }
    }
}
