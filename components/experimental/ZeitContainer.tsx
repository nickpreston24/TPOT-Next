import { FC } from 'react'
import { BasicProps } from './BasicProps'

/* The Base required Props for a Zeit* UI component */
export interface ZeitComponentProps extends BasicProps {
    color?: string;
    backgroundColor?: string;
    height: number;
    width: number;
}  

const ZeitContainer: FC<ZeitComponentProps> = ({
    children
    , backgroundColor
    , color
    , height
    , width
}) => {
    return <div
        style={{ width, color, backgroundColor, height: `${height}px` }}>
        {children}
    </div>
}

export default ZeitContainer
