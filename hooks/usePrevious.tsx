import { useEffect, useRef } from 'react'

export const usePrevious = value => {

    // 1) Stuff value into a ref for later
    const ref = useRef(value)

    // 2) Runs when consumer has rendered:
    useEffect(() => {
        ref.current = value;
    }, [value]); // 3) Runs again when the value changes

    return ref.current;
}

export default usePrevious
