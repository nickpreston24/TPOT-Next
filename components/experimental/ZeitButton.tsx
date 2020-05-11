import { FC } from 'react'
import { ZeitContainerProps } from './ZeitContainer';

interface ButtonProps extends ZeitContainerProps {
    onClick: () => void;
}

const ZeitButton: FC<ButtonProps> = ({
    color
    , backgroundColor
    , onClick
    , text = 'click'
}) => {
    return <button
        title={text}
        style={{ backgroundColor, color }}
        onClick={onClick}>{text}</button>
}

export default ZeitButton;