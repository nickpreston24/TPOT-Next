import { db } from '..'
import { isDev } from 'helpers'

export class FirebaseUserService {
    db: any

    constructor() {
        this.db = db
    }

    getFirebaseUser = async (id: number) => {
        this.db.collection('users')
            .doc(id)
            .get()
            .then((documentSnapshot) => {
                isDev() && console.log(documentSnapshot.data())
            })
    }
}