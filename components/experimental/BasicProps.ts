import { ReactNode } from 'react'

/** Base (Optional) properties for most React TSX Components */
export interface BasicProps {
    text?: string;
    children?: ReactNode;
}