import { notify } from '../components/Toasts';
import { checkoutSession, saveSession, updateSession } from '../stores/sessionsAPI';
import { CheckoutStatus } from '../constants/CheckoutStatus';
import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { createInstance } from '../models/domain';
import { Session } from '../models/Session';
import Router, { useRouter } from 'next/router';
import { useAuth, usePrevious, useWordpress } from 'hooks';
import { Paper } from 'models';
import { isDev } from 'helpers';
import { Language } from 'constants/languages';

const context = createContext(null);

/**
 * Hook
 */
export const useSessions = () => {
    return useContext(context);
}

/**
 * Provider HOC
 */
export const ProvideSessions = ({ children }) => {
    const sessions = useSessionProvider();
    return (
        <context.Provider value={sessions}>{children}</context.Provider>
    )
}

// const initialState = {
//     session: Session.create({}),
// }

export enum Actions {
    Update = 'Update',
    Save = 'Save',
    Publish = 'Publish',
    Status = "Status",
    New = "New"
}

// /**
//  * Modifies the current state according to the action specified 
//  */
// function reducer(state, action) {

//     const { payload } = action;

//     let session = payload?.session;
//     console.log('session (from payload) :>> ', session);
//     switch (action.type) {

//         case Actions.New:
//             return {
//                 ...state,
//                 ...payload,
//                 session: {
//                     ...state.session,
//                     status: CheckoutStatus.NotStarted
//                 }
//             }

//         // Prep the state for paper update:
//         case Actions.Update:
//             return {
//                 ...state,
//                 ...payload,
//                 session: {
//                     ...state.session,
//                     status: CheckoutStatus.CheckedOut,  // Allow instant unlock on update.
//                     lastStatus: state?.status,
//                 }
//                 // isDirty: false,
//             }

//         // Prep the state for paper save:
//         case Actions.Save:
//             return {
//                 ...state,
//                 ...payload,
//                 session: {
//                     ...state.session,
//                     status: CheckoutStatus.CheckedOut,  // Allow instant unlock on update.
//                     lastStatus: state?.status,
//                 }
//                 // isDirty: false,
//             }

//         // // Prep the state for publishing a paper:
//         // case Actions.Publish:
//         //     return {
//         //         ...state,
//         //         ...payload,
//         //         // isDirty: false,
//         //     };

//         // Patch the Statuses Only:
//         case Actions.Status:
//             return {
//                 ...state,
//                 session: {
//                     ...state.session,
//                     status: payload.status
//                 },
//                 // isDirty: payload.CheckoutStatus === CheckoutStatus.NotStarted ? false : true,
//             }

//         default:
//             return {
//                 ...state,
//                 ...payload
//             };
//     }
// }

/**
 * Loads the API
 */
function useSessionProvider() {

    // const [state, dispatchSession] = useReducer(reducer, initialState)
    const [session, setSession] = useState(Session.create({}));
    const previousState = usePrevious(session);
    const lastStatus = usePrevious(session?.status)
    const lastSession = usePrevious(session)
    const { user } = useAuth();
    const { publish } = useWordpress();

    // useEffect(() => {
    //     isDev() && console.log('previousstate :>> ', previousState);
    //     isDev() && console.log('next state :>> ', session);

    // }, [session]);

    // // Run save when session status changes
    // useEffect(() => {
    //     let currentStatus = state?.session?.status;
    //     // let lastStatus = lastSession?.session?.status;
    //     console.log('currentStatus :>> ', currentStatus);
    //     console.log('lastStatus :>> ', lastStatus);

    //     if (!!lastStatus && currentStatus !== lastStatus) {
    //         if (currentStatus === CheckoutStatus.InProgress
    //             || lastStatus === CheckoutStatus.NotStarted)
    //             console.log('SAVE')
    //         //         savePaper();
    //         if (currentStatus === CheckoutStatus.CheckedOut
    //             //         //  || state.session.isDirty
    //         ) {
    //             console.log('UPDATE')
    //             //         updatePaper();
    //         }
    //     }

    // }, [state?.session?.status]);

    const updatePaper = async (doc: string, session: Session) => {

        console.log('updating session :>> ', session);
        session.status = CheckoutStatus.CheckedOut
        await updateSession(doc as string, session)
        notify("Updated session", "success");
    }

    const savePaper = async (session: Session) => {

        // let session = state.session;
        // console.log('state (save paper())', state)

        // Have the hook perform the actual save:
        if (!session) {
            console.warn('Null session');
            return;
        }

        if (status === CheckoutStatus.FirstDraft || status === CheckoutStatus.Published) {
            console.log(`Session of status ${status} could not be saved`);
            return null;
        }

        if (status == CheckoutStatus.NotStarted) {
            session.date_uploaded = new Date();
        }

        console.log('saving session :>> ', session);
        let id = await saveSession(session);
        console.log('saved id :>> ', id);

        // dispatchSession({
        //     type: Actions.Save,
        //     payload: {
        //         session: session,
        //         status: CheckoutStatus.CheckedOut,
        //         lastStatus: previousState?.status,
        //         isDirty: false,
        //     }
        // })

        if (!!id) {
            console.log('checking out paper with id: ', id);
            Router.push('/scribe/edit/[doc]', `/scribe/edit/${id}`)
            await checkoutSession(id)
        }

        notify("Saved session", "success")

        return id;
    }

    const publishPaper = async (doc: string, session: Session) => {

        let code = `<p>test</p>`
        // Publish a Paper {New | Existing} to Wordpress and send the updated Session to Firebase:
        // if (session.status === CheckoutStatus.CheckedOut) {
        let paper = new Paper({ ...session, code, author: 9 });
        console.log('paper :>> ', paper);

        publish(paper)
            .then(async (response) => {
                isDev() && console.log('response :>> ', response);

                if (!response.id) {
                    console.warn('Nothing came back from Wordpress');
                    return
                }

                let sessionUpdate = {
                    authorId: response.author || null,
                    paperId: response.id,

                    date_modified: response.modified,
                    status: CheckoutStatus.FirstDraft,
                    contributors: [user.email], //TODO: push and filter dups
                    code: response.content ? response.content.rendered : '',
                    original: '',
                    excerpt: '',
                    title: session.title,
                };

                // FYI:  This is a one-way street and it assumes we're not going to perform update()s,
                // at least for now.  Only way we can do proper updates is if we prevent users from committing the same draft.
                // We have Sessions checked-out state as a stopgap

                await updateSession(doc as string, sessionUpdate)
                // console.log('published session :>> ', sessionUpdate);

                // state.lastSession = sessionUpdate;

                // if (!document) {
                //     notify(`Failed to create Session for: ${session.title}`, 'warn')
                //     return;
                // }
                // else {
                //     notify(`New Session created for: ${session.title}\n`, 'success')
                //     // await updateSession(doc as string, { status: CheckoutStatus.FirstDraft })
                // }

                // return document;
            })
        return
        // }
    }

    return {
        updatePaper,
        savePaper,
        publishPaper,

        session,
        setSession,
        // lastStatus: previousState.session.status,
    }
}