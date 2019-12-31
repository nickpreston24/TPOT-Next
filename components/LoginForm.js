import { observer, inject } from 'mobx-react'
import MobxReactForm from 'mobx-react-form'
import dvr from 'mobx-react-form/lib/validators/DVR'
import React, { Component } from 'react'
import validatorjs from 'validatorjs'
import { Button, TextField, Box } from '@material-ui/core'
import { observable, toJS } from 'mobx'
import { withRouter } from 'next/router'
import Link from 'next/link'

@inject('store')
@observer
@withRouter
class LoginForm extends Component {

    render() {

        const { router, store } = this.props
        const { signIn, forgot, register } = store
        const mode = router.query.mode || 'login'

        const plugins = {
            dvr: dvr(validatorjs)
        }

        let fields = [{
            name: 'first',
            label: 'First',
            placeholder: 'First Name',
            rules: 'required|string',
        }, {
            name: 'last',
            label: 'Last',
            placeholder: 'Last Name',
            rules: 'required|string',
        }, {
            name: 'email',
            label: 'Email',
            placeholder: 'Insert Email',
            rules: 'required|email|string|between:5,25',
        }, {
            name: 'password',
            label: 'Password',
            placeholder: 'Insert Password',
            rules: 'required|string',
        }]

        if (mode == 'forgot') {
            fields = [fields[2]]
        }
        if (mode == 'login') {
            fields = [fields[2], fields[3]]
        }

        const hooks = {
            onSuccess(form) {
                let values = form.values()
                if (mode == 'login') {
                    signIn(values)
                }
                if (mode == 'register') {
                    register(values)
                }
                if (mode == 'forgot') {
                    forgot(values)
                }
            },
            onError(form) {
                alert('Form has errors!')
                console.log('All form errors', form.errors())
            }
        }

        const form = new MobxReactForm({ fields }, { plugins, hooks })

        return (
            <Box fontSize={14} fontFamily="'Poppins', sans-serif" display="flex" flexDirection="column" width={300} height={450} border={1} >
                <Box flexGrow={1}>
                    <InputFields {...{ form, mode }} />
                    {mode == 'forgot' && <ResetText />}
                </Box>
                <NavText {...{ form, mode }} />
                <FormButton {...{ form, mode }} />
            </Box>
        )
    }
}

export default LoginForm

const InputFields = observer(({ form, mode }) => {
    const fields = Object.keys(toJS(form.fields))
    return (
        <Box border={1} flexDirection="column">
            <form onSubmit={form.onSubmit}>
                {fields.map(key => (
                    <Box height={90} key={key}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            type={key}
                            autoComplete={key}
                            id={form.$(`${key}`).id}
                            label={form.$(`${key}`).label}
                            error={form.$(`${key}`).hasError}
                            helperText={form.$(`${key}`).error}
                            {...form.$(`${key}`).bind()}
                        />
                    </Box>
                ))}
            </form>
        </Box>
    )
})

const ResetText = () =>
    <Box textAlign="center" px={2}>
        <p>An email will be send to the email registered with your account. Clicking on the link will send you to a webpage where you can reset your password. Be sure to check your spam folder if you do not see the request!</p>
    </Box>

const NavText = observer(({ form, mode }) => (
    <>
        {mode == 'login' && (<>
            <Box><Link href="/login?mode=forgot"><a>Forgot Your Password?</a></Link></Box>
            <Box>{`Not a member yet? `}<Link href="/login?mode=register"><a>Create an Account</a></Link></Box>
        </>)}
        {mode != 'login' && <Box>{`Already Have an Account? `}<Link href="/login"><a>Log In</a></Link></Box>}
    </>
))

const FormButton = observer(({ form, mode }) => (
    <Button
        fullWidth
        color="primary"
        variant="contained"
        onClick={form.onSubmit}
    >Submit</Button>
))

