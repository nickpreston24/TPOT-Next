import { useEffect } from 'react'

export const useBeforeUnload = (
    value: ((evt: BeforeUnloadEvent) => any) | string
) => {
    const handleBeforeunload = (evt: BeforeUnloadEvent) => {
        let returnValue
        if (typeof value === 'function') {
            returnValue = value(evt)
        } else {
            returnValue = value
        }
        if (returnValue) {
            evt.preventDefault()
            evt.returnValue = returnValue
        }
        return returnValue
    }

    useEffect(() => {
        window.addEventListener('beforeunload', handleBeforeunload)
        return () => window.removeEventListener('beforeunload', handleBeforeunload)
    }, [])
}

export function usePreventWindowUnload(preventDefault) {
    useEffect(() => {
        if (!preventDefault) return;
        const handleBeforeUnload = event => event.preventDefault();
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [preventDefault]);
}

export default useBeforeUnload