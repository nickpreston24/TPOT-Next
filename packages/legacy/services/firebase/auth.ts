import { auth } from "./firebase";

// Sign Up
export const doCreateUserWithEmailAndPassword = (
    email: string,
    password: string
) => auth.createUserWithEmailAndPassword(email, password);

// Sign In
export const doSignInWithEmailAndPassword = (email: string, password: string) =>
    auth.signInWithEmailAndPassword(email, password)
        .catch(console.error)

// Sign out
export const doSignOut = () => auth.signOut()
    .catch(console.error)


// Password Reset
export const doPasswordReset = (email: string) =>
    auth.sendPasswordResetEmail(email);

// Password Change
export const doPasswordUpdate = async (password: string) => {
    if (auth.currentUser) {
        await auth.currentUser.updatePassword(password);
    }
    throw Error("No auth.currentUser!");
};
