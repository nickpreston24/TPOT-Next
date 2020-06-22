import MobxReactForm from 'mobx-react-form'
import dvr from 'mobx-react-form/lib/validators/DVR'
import React, { Component } from 'react'
import validatorjs from 'validatorjs'
import {  observer } from 'mobx-react'
import { toJS } from 'mobx'

// : DocumentForm is a wrapper that provides a prop, {form} that can be used by
// : the Editor and Details Panel. Includes pretty good validaton, but more can
// : be added, with something like Typescript to mirror the schema that is in
// : Firebase but validating it locally here to get it perfect on every submit. 

class DocumentForm extends Component {

    // Actions to take when the document page is mounted
    componentDidMount() {
        if (!this.props.document) return
        this.props.document.set({
            contributors: this.props.store.authUser.email,
            status: 'checked-out'
           }, { merge: true })
    }

    // Actions to take before you leave the document page
    componentWillUnmount() {
        if (!this.props.document) return
        this.props.document.set({
            status: 'in-progress'
           }, { merge: true })
    }

    render() {
        const { document, store, children } = this.props
        const { authUser } = store

        // No Document! Not safe to do anything beyond this point
        if (!document || document.isLoading == true) {
            return (
                <p>{`
                    Document was not recieved from [Doc].js page. Cannot safely provide the {form} prop to Editor 
                    or Details pane. User is currently ${
                    !!authUser ? 'Authorized 😀' : 'Not Authenticated! 💩'
                    }
                `}</p>
            )
        }
        // Yay! Document. We can do ANYTHING because it is 100% loaded now :)
        else {
            // Lets make a form from our loaded document and add the result as the {form} prop on our inputed child component

            // Document is now loaded fully so calling document.data should never be undefined
            const data = toJS(document.data)

            // Make a form from the document's data
            const form = createForm( document, store, data)

            // Pass the form to the child component && render
            return (
                <FormProvider value={form}>
                    <ObservedChildren {...{ children }} />
                </FormProvider>
            )
        }
    }
}



/* ------------------- FORM GENERATOR ------------------- */

function createForm( document, store, data ) {
    const { title, slug, excerpt, draft } = data
    const { getTime, signIn, forgot, register } = store

    // Set up all the fields, actions, and initial values from the document

    const plugins = {
        dvr: dvr(validatorjs)
    }

    const options = {
        showErrorsOnInit: true,
        showErrorsOnBlur: true,
        showErrorsOnChange: true,
        validateOnInit: true,
        validateOnBlur: true,
        validateOnChangeAfterInitialBlur: true,
        validateOnChangeAfterSubmit: true,
    }

    let fields = [{
        name: 'title',
        label: 'Title',
        placeholder: 'Name of Paper',
        rules: 'required|string|min:5',
    }, {
        name: 'slug',
        label: 'Slug',
        placeholder: 'name-of-paper',
        rules: 'required|string|min:5',
    }, {
        name: 'excerpt',
        label: 'Excerpt',
        placeholder: 'A brief description',
        rules: 'string',
    }, {
        name: 'draft',
        label: 'Draft State',
        placeholder: 'Welcome to Draft!',
        rules: 'string',
    }, {
        name: 'original',
        label: 'Original',
        placeholder: 'Welcome to Draft!',
        rules: 'string',
    }, {
        name: 'code',
        label: 'Code',
        placeholder: 'Welcome to Draft!',
        rules: 'string',
    }, {
        name: 'stylesheet',
        label: 'Draft State',
        placeholder: 'Welcome to Draft!',
        rules: 'string',
    }]

    const hooks = {
        onBlur(form) {
            form.validate()
                .then(({ isValid }) => {
                    if (isValid) {
                        let values = form.values()
                        let date_modified = getTime()
                        document.set({ ...values, date_modified }, { merge: true })
                        // document.fetch()
                    } else {
                        form.submit()
                    }
                })

        },
        onSuccess(form) {
            let values = form.values()
            console.log(values)
        },
        onError(form) {
            console.log('All form errors', form.errors())
        }
    }

    // This is a MobX React form instance that is passed as a consumable to children components.
    const form = new MobxReactForm({ fields }, { plugins, hooks, options })

    // Initialize the values of the form from the firestorter data
    form.init({ title, slug, excerpt, draft })

    // Force the helper text to display to help the user by validating on mount
    form.validate()

    return form
}



/* ------------ PROVIDERS, HOCS, & CONSUMERS ------------ */

const ObservedChildren = observer(({ children, document }) =>
    React.cloneElement(children, { document })
)

export default DocumentForm

export const FormContext = React.createContext(null)

export const FormProvider = FormContext.Provider

export const withForm = (Component) => (props) => (
    <FormContext.Consumer>
        {(value) => <Component {...props} form={value} />}
    </FormContext.Consumer>
)