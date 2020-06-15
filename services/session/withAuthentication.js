import React, { useState } from 'react';
import router from 'next/router';
import { auth, firebase } from '@services/firebase'
import { AuthUserContext } from '../firebase/AuthUserContext';

/* Mine */

// const withAuthentication = Component => {



//     const [authUser, setAuthUser] = useState(null);


//     return (
//         <AuthUserContext.Provider value={authUser}>
//             <Component />
//         </AuthUserContext.Provider>
//     );
// }


const withAuthentication = Component => {

    class WithAuthentication extends React.Component {
        constructor(props) {
            super(props);
            this.state = { authUser: null, };
            console.log('props :>> ', props);
        }

        componentDidMount() {
            console.log('this.props :>> ', this.props);
            // const { auth } = this.props.firebase;
            this.listener = auth.onAuthStateChanged(
                authUser => {
                    authUser
                        ? this.setState({ authUser })
                        : this.setState({ authUser: null });
                },
            );
        }

        componentWillUnmount() {
            if (!!this.listener)
                this.listener();
        }

        render() {
            return (
                <AuthUserContext.Provider value={this.state.authUser}>
                    <Component {...this.props} />
                </AuthUserContext.Provider>
            );
        }
    }

    return WithAuthentication;
};

export default withAuthentication;


/* Medium */

// const withAuthentication = (Component) => {
//     return class extends React.Component {

//         constructor(props) {
//             super(props);
//             console.log('props :>> ', props);
//             this.state = { status: 'LOADING', }
//         }

//         componentDidMount() {

//             console.log('this.props :>> ', this.props);
//             // const { auth } = this.props.firebase;
//             auth.onAuthStateChanged(authUser => {
//                 console.log(authUser);
//                 if (authUser) { this.setState({ status: 'SIGNED_IN' }); } else { router.push('/'); }
//             });
//         }

//         renderContent() {
//             const { status } = this.state;
//             if (status == 'LOADING') { return <h1>Loading ......</h1>; }
//             else if (status == 'SIGNED_IN') {
//                 return <Component {...this.props} />
//             }
//         }

//         render() {
//             return (<>
//                 {this.renderContent()}
//             </>);
//         }
//     };
// }


