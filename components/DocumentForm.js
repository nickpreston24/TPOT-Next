import { observer, inject } from 'mobx-react'
import MobxReactForm from 'mobx-react-form'
import dvr from 'mobx-react-form/lib/validators/DVR'
import React, { Component } from 'react'
import validatorjs from 'validatorjs'
import { Button, TextField, Box } from '@material-ui/core'
import { observable, toJS } from 'mobx'
import Link from 'next/link'

@inject('store')
@observer
class DocumentForm extends Component {

    render() {

        const { document, store } = this.props
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
                            document.set({ ...values, date_modified }, {merge: true})
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

        // const onChange = field => (e, k, payload) => {
        //     console.log('onchange')
        //     field.set(payload);
        //   }

        const form = new MobxReactForm({ fields }, { plugins, hooks, options })

        form.update({ title, slug, excerpt })
        form.validate()

        return (
            <InputFields {...{ form }} />
        )
    }
}

export default DocumentForm

const InputFields = observer(({ form, onChange }) => {
    const fields = Object.keys(toJS(form.fields))
    let { onBlur } = toJS(form.$hooks)

    return (
        <Box flexDirection="column">
            <form onSubmit={form.onSubmit}>
                <Box height={70}>
                    <TextField
                        fullWidth
                        error={form.$(`title`).hasError}
                        helperText={form.$(`title`).error}
                        {...form.$(`title`).bind({onBlur: () => onBlur(form)})}
                    />
                </Box>
                <Box height={70}>
                    <TextField
                        fullWidth
                        error={form.$(`slug`).hasError}
                        helperText={form.$(`slug`).error}
                        {...form.$(`slug`).bind({onBlur: () => onBlur(form)})}
                    />
                </Box>
                <Box height={70}>
                    <TextField
                        multiline
                        fullWidth
                        error={form.$(`excerpt`).hasError}
                        helperText={form.$(`excerpt`).error}
                        {...form.$(`excerpt`).bind({onBlur: () => onBlur(form)})}
                    />
                </Box>
            </form>
        </Box>
    )
})

