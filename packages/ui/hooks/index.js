import { useContext } from 'react'
import { RootModelContext } from '../models/RootModel'

export const useRootStore = () => {
    const store = useContext(RootModelContext)
    if (store === null) {
        throw new Error("Store context cannot be null, please add a <StoreProvider /> in _app.js");
    }
    return store
}

export const useDetailsModel = () => {
    const store = useRootStore()
    return store.details
}

export const useLayouts = () => {
    const store = useRootStore()
    return store.layouts
}

export const useDashboardLayout = () => {
    const layouts = useLayouts()
    return layouts.dashboard
}