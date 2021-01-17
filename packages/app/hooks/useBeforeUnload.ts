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
        try {
            window.addEventListener('beforeunload', handleBeforeunload)
            return () => window.removeEventListener('beforeunload', handleBeforeunload)
        } catch (error) {
            console.log('no window for beforeunload')
            return
        }
    }, [])
}

export function usePreventWindowUnload(preventDefault) {
    useEffect(() => {
        if (!preventDefault) return;
        const handleBeforeUnload = event => event.preventDefault();
        try {
            window.addEventListener("beforeunload", handleBeforeUnload);
            return () => window.removeEventListener("beforeunload", handleBeforeUnload);
        } catch (error) {
            console.log('no window for preventwindowunload')
            return
        }
    }, [preventDefault]);
}

export default useBeforeUnload