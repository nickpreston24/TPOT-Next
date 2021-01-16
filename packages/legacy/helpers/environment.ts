import process from "process";
import { store } from "services/firebase/firebase";

const development: boolean = process.env.NODE_ENV === 'production' ? false : !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export function isDev(): boolean {
    return development;
}

export function isAdmin(): boolean {
    // store.collection('users').get()
    return true;
}

export default isDev;