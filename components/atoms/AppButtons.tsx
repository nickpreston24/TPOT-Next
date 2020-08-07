import { useRouter } from "next/router"
import { Tooltip, PseudoBox, Icon, Text, Button } from "@chakra-ui/core"
import { SampleButtonCommand } from "components/commands"
import { FC } from "react"

// A custom (very purple) button for the Navbar / Sidebar
export const NavbarButton = props => {
    const { icon, title, activationRoute, disable, toolTip, ...rest } = props

    const { route } = useRouter()
    const isActive = route === activationRoute

    return (
        <Tooltip aria-label="navbar-tooltip" label="Test">

            <PseudoBox
                onClick={props.onClick}
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
                <Icon color="primary.300" name={icon} />
                <Text fontSize="sm"
                    ml={4} flexGrow={1} textAlign="left"
                    color={isActive ? "#FFF" : "gray.400"}
                    fontWeight={isActive ? 500 : 400}
                >
                    {title}
                </Text>
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



type ActionButtonProps = {
    command: SampleButtonCommand
}

// Base button that has an action it executes on click.
// Could be derived into a Slotted component later
export const ActionButton: FC<ActionButtonProps> = ({ command, children }) => {
    return <button onClick={() => command.execute()}>{children}</button>
}