import { useEffect } from 'react'

export const useBeforeUnload = (
    value: ((e: BeforeUnloadEvent) => any) | string
) => {
    const handleBeforeunload = (event: BeforeUnloadEvent) => {
        let returnValue
        if (typeof value === 'function') {
            returnValue = value(event)
        } else {
            returnValue = value
        }
        if (returnValue) {
            event.preventDefault()
            event.returnValue = returnValue
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