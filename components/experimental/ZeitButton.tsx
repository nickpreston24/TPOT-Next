import { FC } from 'react'
import { ZeitComponentProps } from './ZeitContainer'

interface ButtonProps extends ZeitComponentProps {
    onClick: () => void;
}

const ZeitButton: FC<ButtonProps> = ({
    color
    , backgroundColor
    , onClick
    , text
    , ...rest
}) => {
    return <button
        title={text}
        style={{ backgroundColor, color }}
        onClick={onClick}>{text}
        {/* {... { rest }} */}
    </button>
}

export default ZeitButton