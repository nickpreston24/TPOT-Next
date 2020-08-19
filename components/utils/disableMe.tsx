import { CSSProperties } from 'react';
/**
 * Disables a given component
 * @usage `style={disableMe(true)}`
 * @param disabled A simple boolean - can from anything, including a hook.
 */
export function disableMe(disabled: boolean): CSSProperties {
    return {
        opacity: disabled ? 0.25 : 1,
        pointerEvents: disabled ? "none" : "initial",
    };
}

/**
 * Hides a component
 * @param hidden A simple boolean - can from anything, including a hook.
 */
export function hideMe(hidden: boolean): CSSProperties {
    return {
        visibility: hidden ? "hidden" : "initial",
        pointerEvents: hidden ? "none" : "initial",
    }
}