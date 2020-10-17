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

const initialState = {
    doc: '',
    isDirty: false,
    session: Session.create({}),
    language: Language.English
}

export enum Actions {
    Update = 'Update',
    Save = 'Save',
    Publish = 'Publish',
    Status = "Status"
}

/**
 * Modifies the current state according to the action specified 
 */
function reducer(state, action) {

    const { payload } = action;

    let session = payload?.session;

    switch (action.type) {

        // Prep the state for paper update:
        case Actions.Update:
            return {
                ...state,
                ...payload,
                isDirty: false,
            }

        // Prep the state for paper save:
        case Actions.Save:
            return {
                ...state,
                ...payload,
                isDirty: false,
            }

        // Prep the state for publishing a paper:
        case Actions.Publish:
            return {
                ...state,
                ...payload,
                isDirty: false,
            };

        // Patch the Statuses Only:
        case Actions.Status:
            return {
                ...state,
                session: {
                    status: payload.CheckoutStatus
                },
                isDirty: payload.CheckoutStatus === CheckoutStatus.NotStarted ? false : true,
            }

        default:
            return {
                ...state,
                ...payload
            };
    }
}

/**
 * Loads the API
 */
function useSessionProvider() {

    const [state, dispatchSession] = useReducer(reducer, initialState)

    const previousState = usePrevious(state);
    const lastStatus = usePrevious(state?.session?.status)
    const lastSession = usePrevious(state?.session)

    useEffect(() => {
        isDev() && console.log('previousstate :>> ', previousState);
        isDev() && console.log('next state :>> ', state);

    }, [state]);

    // Run save when session status changes
    useEffect(() => {
        let currentStatus = state?.session.status;

        if (currentStatus !== lastStatus &&
            state?.session.status == CheckoutStatus.InProgress) {
            savePaper();
        }

    }, [state?.session?.status]);

    const updatePaper = async (id, string, session: Session) => {

        console.log('updating session :>> ', session);

        // Update an existing paper:
        if (state.status === CheckoutStatus.CheckedOut) {
            dispatchSession({
                type: Actions.Update,
                payload: {
                    session: session,
                    status: CheckoutStatus.InProgress,  // Allow instant unlock on update.
                    lastStatus: previousState?.status,
                    isDirty: false,
                }
            })

            updateSession(id, session).then(() => {
                notify("Updated session", "success");
            })
        }
    }

    const savePaper = async () => {

        let session = state.session;
        console.log('state (save paper())', state)

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

        dispatchSession({
            type: Actions.Save,
            payload: { session: session, }
        })

        if (!!id) {
            Router.push('/scribe/edit/[doc]', `/scribe/edit/${id}`)
            await checkoutSession(id)
        }

        notify("Saved session", "success")

        return id;
    }

    const publishPaper = async (doc: string, session: Session) => {

        const { user } = useAuth();
        const { publish } = useWordpress();

        let code = `<p>test</p>`
        // Publish a Paper {New | Existing} to Wordpress and send the updated Session to Firebase:
        if (state.lastStatus === CheckoutStatus.CheckedOut && status === CheckoutStatus.FirstDraft) {
            let paper = new Paper(session.title, code);
            publish(paper)
                .then(async (response) => {
                    isDev() && console.log('response :>> ', response);

                    if (!response.id) {
                        // console.warn(messages.WarnNoWPResponse);
                        // notify(messages.WarnNoWPResponse, 'warn');
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

                    state.lastSession = sessionUpdate;

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
        }
    }

    return {
        updatePaper,
        savePaper,

        session: state?.session,
        dispatchSession,
    }
}