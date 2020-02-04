import MobxReactForm from 'mobx-react-form'
import dvr from 'mobx-react-form/lib/validators/DVR'
import React, { Component } from 'react'
import validatorjs from 'validatorjs'
import { inject, observer } from 'mobx-react'

// : DocumentForm is a wrapper that provides a prop, {form} that can be used by
// : the Editor and Details Panel. Includes pretty good validaton, but more can
// : be added, with something like Typescript to mirror the schema that is in 
// : Firebase but validating it locally here to get it perfect on every submit.
@inject('store')
@observer
class DocumentForm extends Component {

    render() {

        const { document, store, children } = this.props

        if (!!document.data) {

            const { getTime, signIn, forgot, register } = store
            const { title, slug, excerpt } = document.data

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
            },]

            const hooks = {
                onBlur(form) {
                    form.validate()
                        .then(({ isValid }) => {
                            if (isValid) {
                                let values = form.values()
                                let date_modified = getTime()
                                document.set({ ...values, date_modified }, { merge: true })
                            } else {
                                form.submit()
                            }
                            // ... // Use `isValid` to check the validation status
                        })

                },
                onSuccess(form) {
                    let values = form.values()
                    console.log(values)
                },
                onError(form) {
                    // alert('Form has errors!')
                    console.log('All form errors', form.errors())
                }
            }

            // This is a MobX React form instance that is passed as a consumable to children components.
            const form = new MobxReactForm({ fields }, { plugins, hooks, options })

            // Set the initial values for the form based on the first fetch of data
            form.update({ title, slug, excerpt })

            // Force the helper text to display to help the user by validating on mount
            form.validate()

            return (
                <FormProvider value={form}>
                    {children}
                </FormProvider>
            )

        } else {
            return (
                <p>Loading...</p>
            )
        }
    }
}

export default DocumentForm

export const FormContext = React.createContext(null);

export const FormProvider = FormContext.Provider

export const withForm = Component => props => (
    <FormContext.Consumer>
        {value => <Component {...props} form={value} />}
    </FormContext.Consumer>
)