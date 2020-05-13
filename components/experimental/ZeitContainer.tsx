import { FC } from 'react'
import { BasicProps } from './BasicProps'

export interface ZeitContainerProps extends BasicProps {
    color?: string;
    backgroundColor?: string;
    height: number;
    width: number;
}  

const ZeitContainer: FC<ZeitContainerProps> = ({
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
