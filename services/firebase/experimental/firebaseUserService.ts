import { db } from '..'

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
                console.log(documentSnapshot.data())
            })
    }
}