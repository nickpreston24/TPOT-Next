import { useRouter } from "next/router"
import { Tooltip, PseudoBox, Icon, Text, Button } from "@chakra-ui/core"
import { FC } from "react"

// A custom (very purple) button for the Navbar / Sidebar
// Base button that has an action it executes on click.
// Could be derived into a Slotted component later
export const NavbarButton: FC<NavbarButtonProps> = (props) => {
    const { icon, title, activationRoute, disable, toolTip, onClickFn, ...rest } = props

    const { route } = useRouter()
    const isActive = route === activationRoute

    return (
        <Tooltip aria-label="navbar-tooltip" label={toolTip}>

            <PseudoBox
                onClick={() => onClickFn()}
                pl={3} pr={6}
                as="button"
                height="52px"
                rounded="md"
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
                outline="0 !important" // kill the hovering outline
                _hover={{ bg: "primary.700", cursor: disable ? 'not-allowed' : 'auto' }}
                bg={isActive ? "primary.700" : "none"}
            >
                {icon && <Icon color="primary.300" name={icon} />}
                {title && <Text fontSize="sm"
                    ml={4} flexGrow={1} textAlign="left"
                    color={isActive ? "#FFF" : "gray.400"}
                    fontWeight={isActive ? 500 : 400}
                >
                    {title}
                </Text>}
            </PseudoBox>

        </Tooltip>
    )
}


// Button that goes at the bottom. Very purple
export const SettingsButton = props =>
    <Button
        w="100%"
        leftIcon="settings"
        variantColor="primary"
        isDisabled={props.disabled}
        onClick={props.onClick}
        fontWeight={300}
    >
        Settings
    </Button>

type NavbarButtonProps = {
    icon?: string,
    title?: string,
    disable?: boolean,
    toolTip?: string,

    activationRoute: string,
    onClickFn: Function
}