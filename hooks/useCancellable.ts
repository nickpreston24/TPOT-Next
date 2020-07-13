import { useMemo, useEffect } from 'react'

interface CancellationToken {
    isCancelled: boolean
    cancel(): void
}

export function useCancellationToken(): CancellationToken {
    return useMemo(() => {
        const token = {
            isCancelled: false,
            cancel: () => { }
        }

        token.cancel = () => token.isCancelled = true

        return token as CancellationToken
    }, [])
}

/**
 * useCancelableEffect
 * 
 * Purpose: 
 * Create a 'useEffect' that can be cancelled by a component.
 * 
 * Source:
 * https://dev.to/wozzo/usecancellationtoken-avoid-memory-leaks-in-react-4j69
 * 
 *  Usage:
 *  const [movies, setMovies] = useState([] as Movies[])
*   const cancellationToken = useCancellationToken()
    useCancellableEffect(async () => {
    const result = await fetch('http://example.com/movies.json')
    if (cancellationToken.isCancelled) {
        return
    }
    setMovies(result)
}, [setMovies], cancellationToken)
 */
export function useCancellableEffect(action: () => void, dependencies: any[], cancellationToken: CancellationToken) {
    useEffect(() => {
        action()
    }, [...dependencies, cancellationToken])
    useEffect(() => () => cancellationToken.cancel(), [])
}

