import { notify } from '../components/Toasts';
import { saveSession, updateSession } from '../stores/sessionsAPI';
import { CheckoutStatus } from '../constants/CheckoutStatus';
import { createContext, useContext, useState } from 'react';
import { createInstance } from '../models/domain';
import { Session } from '../models/Session';

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

/**
 * Loads the API
 */
function useSessionProvider() {

    // const [session, setSession] = useState(new Session({}))

    const [state, setState] = useState<any>({
        doc: '',
        isDirty: false,
        lastSession: createInstance(Session),
        // session: createInstance(Session)
        status: CheckoutStatus.NotStarted
    })

    const updatePaper = async (session: Session) => {

        // Update an existing paper:
        if (state.status === CheckoutStatus.CheckedOut) {

            // WARNING: Firebase hates custom objects, so just use plain old JSON here:
            let sessionUpdate = session.toJSON();

            sessionUpdate.date_modified = new Date();

            setState(state.doc as string, sessionUpdate)
                .then(() => notify("Updated session", "success"))
                .then(() =>
                    setState({
                        lastSession: sessionUpdate,
                        isDirty: false,
                        ...state
                    }))
        }
    }

    const savePaper = async (session: Session) => {

        // Save a new paper:
        if (state.status == CheckoutStatus.NotStarted) {

            let nextSession = session.toJSON();

            // isDev() && console.log('nextSession :>> ', nextSession);

            nextSession.date_modified = new Date();

            let id = await saveSession(nextSession);
            notify("Saved session", "success")

            setState({
                status: CheckoutStatus.CheckedOut,
                isDirty: false
            })

            // isDev() && console.log('created Session id :>> ', id);

            // let doc = DOC(id) as any;
            // router.push({...doc})
            // router.push('/scribe/edit/[doc]', `/scribe/edit/${id}`)
            // await checkoutSession(id)

            return id;
        }
    }

    // // Publish a Paper {New | Existing} to Wordpress and send the updated Session to Firebase:
    // if (lastStatus === CheckoutStatus.CheckedOut && status === CheckoutStatus.FirstDraft) {
    //     let paper = new Paper(session.title, code);
    //     publish(paper)
    //         .then(async (response) => {
    //             isDev() && console.log('response :>> ', response);

    //             if (!response.id) {
    //                 console.warn(messages.WarnNoWPResponse);
    //                 notify(messages.WarnNoWPResponse, 'warn');
    //                 return
    //             }

    //             let sessionUpdate = {
    //                 authorId: response.author || null,
    //                 paperId: response.id,

    //                 date_modified: response.modified,
    //                 status: CheckoutStatus.FirstDraft,
    //                 contributors: [authUser.email], //TODO: push and filter dups
    //                 code: response.content ? response.content.rendered : '',
    //                 original: '',
    //                 excerpt: '',
    //                 title: session.title,
    //             };

    //             // FYI:  This is a one-way street and it assumes we're not going to perform update()s,
    //             // at least for now.  Only way we can do proper updates is if we prevent users from committing the same draft.
    //             // We have Sessions checked-out state as a stopgap

    //             await updateSession(doc as string, sessionUpdate)
    //             // console.log('published session :>> ', sessionUpdate);

    //             scribeStore.lastSession = Session.create(sessionUpdate);

    //             // if (!document) {
    //             //     notify(`Failed to create Session for: ${session.title}`, 'warn')
    //             //     return;
    //             // }
    //             // else {
    //             //     notify(`New Session created for: ${session.title}\n`, 'success')
    //             //     // await updateSession(doc as string, { status: CheckoutStatus.FirstDraft })
    //             // }

    //             // return document;
    //         })
    //     return
    // }

    return {
        updatePaper,
        savePaper,
    }
}



