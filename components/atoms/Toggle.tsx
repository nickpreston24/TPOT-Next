import { Component, ReactNode, FC, useState } from "react";
import { hasRender, hasChildren } from '../utils/composition'

// Advanced
export type Props = { onToggle: (on: boolean) => void } & RenderProps
type RenderProps =
    | { children: (api: API) => ReactNode }
    | { render: (api: API) => ReactNode }

export const initialState = { on: false }
export type State = Readonly<typeof initialState>
type API = ReturnType<Toggle['getApi']>

/**
 * A Universal Toggler
 * Inspiration: 
 */
export class Toggle extends Component<Props, State> {

    readonly state = initialState;

    private toggle = () => this.setState(
        ({ on }) => ({ on: !on }),
        () => this.props.onToggle(this.state.on)
    );


    private getApi() {
        return {
            on: this.state.on,
            toggle: this.toggle,
        };
    }

    render() {

        const { children } = this.props;

        //// Original:
        // if (!isFunction(children)) {
        //     throw new Error('children is mandatory and needs to be a function!');
        // }

        // Advanced:
        if (hasRender(this.props)) {
            return this.props.render(this.getApi());
        }

        if (hasChildren(this.props)) {
            return this.props.children(this.getApi());
        }

        throw new Error('One of children or render props is mandatory and needs to be a function!');
    }
}

// Attempted FC
// export const Toggle: FC<Props> = (props) => {

//     const [state, setState] = useState(initialState);

//     const toggle = () => {
//         setState({
//             on: !state.on,
//         })
//         props.onToggle(state.on)
//     }

//     const getApi = () => {
//         return {
//             on: state.on,
//             toggle: toggle,
//         };
//     }

//     //// Original:
//     // const { children } = this.props;
//     // if (!isFunction(children)) {
//     //     throw new Error('children is mandatory and needs to be a function!');
//     // }

//     // Advanced:
//     if (hasRender(props)) {
//         return props.render(getApi());
//     }

//     if (hasChildren(props)) {
//         return props.children(getApi());
//     }

//     throw new Error('One of children or render props is mandatory and needs to be a function!');
// }

