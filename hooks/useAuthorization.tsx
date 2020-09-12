import { useAuth } from './useAuth'
import { useEffect, useState } from 'react';

export const useAuthorization = () => {
    const { user, firebase } = useAuth();

    const [state, setState] = useState({});

    useEffect(() => {
        console.log('firebase.auth :>> ', firebase.auth);
        console.log('authUser :>> ', user);
    }, []);

    // const [listener, setListener] = useState(firebase.onAuthUserListener);

    // useEffect(() => {

    // setListener(authUser => {
    //     localStorage.setItem('authUser', JSON.stringify(authUser));
    //     setState({ authUser });
    //     console.log('state :>> ', state);
    //     console.log('localStorage :>> ', localStorage);
    // }),
    //     () => {
    //         localStorage.removeItem('authUser');
    //         this.setState({ authUser: null });
    //         console.log('localStorage (on removal) :>> ', localStorage);
    //     }
    // }, [firebase.onAuthUserListener])   

    return {
        user
    }
}