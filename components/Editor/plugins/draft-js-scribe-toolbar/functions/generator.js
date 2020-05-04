import { withProps } from 'recompose'
import { createGroupButton, createInlineStyleButton, createBlockStyleButton, createCustomStyleButton } from './schemas'
import ActionWrappedButton from './parts'

export const generateButton = config => {

    const { schema, group } = config
    let parentProps = {}

    if (group) {
        parentProps = createGroupButton(config)
    } else if (schema == 'inline') {
        parentProps = createInlineStyleButton(config)
    } else if (schema == 'block') {
        parentProps = createBlockStyleButton(config)
    } else if (schema == 'custom') {
        parentProps = createCustomStyleButton(config)
    }

    const ButtonWithEffects = withProps(parentProps)(ActionWrappedButton)
    return withProps(config)(ButtonWithEffects)

}
