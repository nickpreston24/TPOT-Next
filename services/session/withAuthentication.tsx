import React, { useState } from 'react';
// import { AuthUserContext } from '../session';
import { AuthUserContext } from '../firebase/AuthUserContext';
// import { withFirebase } from '../firebase';

import { firebase } from "../firebase";

interface InterfaceProps {
    authUser?: any;
}

interface InterfaceState {
    authUser?: any;
}

export const withAuthentication = (Component: any) => {

    const WithAuthentication: React.ComponentClass<InterfaceProps, InterfaceState> = () => {
        const [authUser, setAuthUser] = useState(null);


        return (
            <AuthUserContext.Provider value={authUser}>
                <Component />
            </AuthUserContext.Provider>
        );
    }
    return WithAuthentication;
}

// export const withAuthentication = (Component: any) => {
//     class WithAuthentication extends React.Component<
//         InterfaceProps,
//         InterfaceState
//         > {
//         constructor(props: any) {
//             super(props);

//             this.state = {
//                 authUser: null
//             };
//         }

//         public componentDidMount() {
//             firebase.auth.onAuthStateChanged(authUser => {
//                 authUser
//                     ? this.setState(() => ({ authUser }))
//                     : this.setState(() => ({ authUser: null }));
//             });
//         }

//         public render() {
//             const { authUser } = this.state;

//             return (
//                 <AuthUserContext.Provider value={authUser}>
//                     <Component />
//                 </AuthUserContext.Provider>
//             );
//         }
//     }
//     return WithAuthentication;
// };



// const withAuthentication = <T extends object>(C: React.ComponentClass<T>) => {

//     return class AuthComponent extends React.Component<T>{
//         listener: any;

//         constructor(props) {
//             console.log('props :>> ', props);
//             super(props);
//             this.state = { authUser: null };
//         }

//         componentDidMount() {
//             console.log('this.props :>> ', this.props);
//             const { auth, firebase } = this.props.firebase;
//             this.listener = auth.onAuthStateChanged(
//                 authUser => {
//                     authUser
//                         ? this.setState({ authUser })
//                         : this.setState({ authUser: null });
//                 },
//             );
//         }

//         componentWillUnmount() {
//             if (this.listener)
//                 this.listener();
//         }

//         render() {
//             return (
//                 <AuthUserContext.Provider value={this.state.authUser}>
//                     <Component {...this.props} />
//                 </AuthUserContext.Provider>
//             );
//         }
//     }
// }

export default withAuthentication