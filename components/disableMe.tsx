import React from 'react';
/**
 * Disables a given component
 * @usage `style={disableMe(true)}`
 * @param disabled A simple boolean - can from anything, including a hook.
 */
export function disableMe(disabled: boolean): React.CSSProperties {
    return {
        opacity: disabled ? 0.25 : 1,
        pointerEvents: disabled ? "none" : "initial",
    };
}
