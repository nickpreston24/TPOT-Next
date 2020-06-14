import Firebase from '.'

export class FirebaseUserService {
    db: any

    constructor(db: Firebase) {
        this.db = db
    }

    getFirebaseUser = (id: number) => {
        this.db.collection('users')
            .doc(id)
            .get()
            .then((documentSnapshot) => {
                console.log(documentSnapshot.data())
            })
    }
}