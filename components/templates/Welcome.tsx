import React, { FC, ReactNode, useState } from 'react'
import NextLink from 'next/link'
import { Button, Flex, Heading, Box, Stack, Input, Text, Icon, ButtonProps, useTheme, FormControl, FormLabel, FormErrorMessage, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/core'
import { useFormik, FormikProps, FormikValues } from 'formik';
import SplashScreen from '../svg/MonitorDashboard'


type ModeTypes = 'default' | 'login' | 'register'

type WelcomeTemplateProps = {
    mode?: ModeTypes,
    title?: string,
    children?: ReactNode,
    subtitle?: string | ReactNode,
    primaryButtonProps?: Partial<ButtonProps>,
    formTitle?: string,
    formik: FormikProps<FormikValues>
}

const Template: FC<WelcomeTemplateProps> = ({
    mode = 'default',
    title = 'Enter a Title',
    subtitle = 'Enter a Subtitle',
    children,
    primaryButtonProps = {
        children: 'Primary',
        variantColor: 'primary',
        variant: 'outline'
    },
    formik = useFormik({
        initialValues: {},
        onSubmit: () => { },
    })
}) => {

    const theme = useTheme()
    const gradient = `linear-gradient(135deg, ${theme.colors["gray"][900]} 0%, ${theme.colors["gray"][700]} 100%)`

    const mainWidth = ['default'].includes(mode) ? '100%' : (2 / 3)
    const formWidth = ['default'].includes(mode) ? '0%' : (1 / 3)

    return (
        <Flex id="frame" style={{ background: gradient }} justifyContent="center" alignItems="center" position="absolute" height="100%" width="100%">
            <Stack h="100%" w="100%" maxW={1200} maxH={700} overflow="auto" direction="row" spacing={0} bg="primary.600" borderRadius="lg" shadow="2xl" transition="all 1s ease-in-out 0s">
                <Flex h="100%" w={mainWidth} alignItems="flex-start" bg="gray.100" transition="all 0.3s ease-out">
                    <Stack width="100%" align="center" spacing={3} px={16} >
                        <Flex w={600} h={500} justifyContent="center" alignItems="center">
                            <SplashScreen />
                        </Flex>
                        <Heading color="gray.700" >{title}</Heading>
                        <Heading fontWeight={400} color="gray.700" size="md">
                            {subtitle}
                        </Heading>
                        <Stack direction="row" mt={6}>
                            <Button fontWeight="normal" variantColor="primary" {...primaryButtonProps} >
                                {primaryButtonProps.children}
                            </Button>
                            {children}
                        </Stack>
                    </Stack>
                </Flex>
                <Flex h="100%" w={formWidth} alignItems="flex-start" pt={20} transition="all 0.3s ease-out">
                    <Stack minW={400} spacing={3} align="stretch" px={16} overflow="hidden" >
                        <Heading color="gray.100" pb={16} >{formTitles[mode]}</Heading>
                        {/* FORMIK Form starts here */}
                        <form onSubmit={formik.handleSubmit}>
                            {['forgot'].includes(mode) && (
                                <Box mb={6} color="white">We will send you an email to reset your password. Please check your spam folder!</Box>
                            )}
                            <TextField name="firstName" type="text" enabledModes={['register']} {...{ mode, formik }} />
                            <TextField name="lastName" type="text" enabledModes={['register']} {...{ mode, formik }} />
                            <TextField name="email" type="email" enabledModes={['login', 'register', 'forgot']} {...{ mode, formik }} />
                            <TextField name="password" type="password" enabledModes={['login', 'register']} {...{ mode, formik }} />
                            {formButtonText[mode] && (
                                <Button isLoading={formik.isSubmitting} type="submit" my={6} w="100%" fontWeight={400} variantColor="green">
                                    {formButtonText[mode]}
                                </Button>
                            )}
                            {['login'].includes(mode) && (
                                <Stack spacing={4}>
                                    <Text textAlign="center" color="primary.100" fontSize="sm">
                                        {"Don't have an account? "}
                                        <Button color="white" variant="link" fontSize="sm">
                                            <NextLink href="/?m=register">
                                                <a>Create One</a>
                                            </NextLink>
                                        </Button>
                                    </Text>
                                    <Text textAlign="center" color="primary.100" fontSize="sm">
                                        {"Did you "}
                                        <Button color="white" variant="link" fontSize="sm" >
                                            <NextLink href="/?m=forgot">
                                                <a>forget</a>
                                            </NextLink>
                                        </Button>
                                        {" your password... "}
                                    </Text>
                                </Stack>
                            )}
                            {['register'].includes(mode) && (
                                <Text textAlign="center" color="primary.100" fontSize="sm">
                                    {"Have an account already? "}
                                    <Button color="white" variant="link" fontSize="sm" >
                                        <NextLink href="/?m=login">
                                            <a><b>Sign In</b></a>
                                        </NextLink>
                                    </Button>
                                </Text>
                            )}
                            {['forgot'].includes(mode) && (
                                <Text textAlign="center" color="primary.100" fontSize="sm">
                                    {"Remember your password? "}
                                    <Button color="white" variant="link" fontSize="sm" >
                                        <NextLink href="/?m=login">
                                            <a><b>Sign In</b></a>
                                        </NextLink>
                                    </Button>
                                </Text>
                            )}
                        </form>
                        {/* FORMIK Form ends here */}
                    </Stack>
                </Flex>
            </Stack>
        </Flex>
    )
}

export default Template

const formTitles = {
    default: 'Form',
    register: 'Register',
    login: "Sign In",
    forgot: "Forgot?",
}

const formButtonText = {
    default: null,
    register: 'Sign me up!',
    login: "Let's go!",
    forgot: "Send Code",
}

const formIcons = {
    email: 'at-sign',
    password: 'lock',
    firstName: 'chevron-right',
    lastName: 'chevron-right',
}

const placeholders = {
    email: 'jsmith2@gmail.com',
    password: 'password1234',
    firstName: 'John',
    lastName: 'Smith',
}

// Text field is a makeshift formik binding for Chakra
const TextField = ({ name, type, enabledModes, mode, formik }) => {

    let placeholder = placeholders[name]
    let isPassword = ['password'].includes(name)
    let label = name.replace(/([A-Z])/g, ' $1').toLowerCase()
    label = label.charAt(0).toUpperCase() + label.slice(1)

    let children = null
    const enabled = enabledModes.includes(mode)
    const field = formik.getFieldProps(name)
    const meta = formik.getFieldMeta(name)
    const { error, touched } = meta
    const inputError = error && touched
    const inputSuccess = !error && touched

    const [showPassword, setShowPassword] = useState(false)
    const togglePassword = () => setShowPassword(!showPassword)

    const rightIcon = inputSuccess ? 'check' : null
    const showicon = showPassword ? 'view-off' : 'view'
    const inputType = isPassword ? showPassword ? 'text' : 'password' : type

    if (enabled) {
        children = (
            <FormControl isInvalid={inputError} width="100%" >
                <FormLabel color="white" htmlFor={name}>{label}</FormLabel>
                <InputGroup>
                    <InputLeftElement children={<Icon name={formIcons[name]} fontSize="md" color="gray.300" />} />
                    <Input width="100%" id={name} placeholder={placeholder} type={inputType} {...field} />
                    <InputRightElement children={(
                        <>
                            {isPassword
                                ? <Button onClick={togglePassword} variant="ghost"><Icon name={showicon} fontSize="lg" color="primary.600" /></Button>
                                : inputSuccess && <Icon name={rightIcon} fontSize="sm" color="green.500" />
                            }
                        </>
                    )} />a
                </InputGroup>
                <Box opacity={inputError ? 100 : 0} transition="all 0.3s ease-in-out">
                    <FormErrorMessage color="orange.200">{error}</FormErrorMessage>
                </Box>
            </FormControl>
        )
    }

    return (
        <Box h={!enabled ? 0 : inputError ? 100 : 80} transition={inputError && "all 0.2s ease-out"} width="100%" >
            {children}
        </Box>
    )
}