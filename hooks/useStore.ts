import React, { useContext } from 'react'
// Just a helper for injecting any store into a component

// TODO: write a generic hook for pulling a given store out of a Set or Map of Stores.
// See: https://codesandbox.io/s/n31n1lw6ml?from-embed=&file=/src/store.js
// Adapt the following:
const useStore = <T>(context: React.Context<T>) => useContext(context);

export default useStore
