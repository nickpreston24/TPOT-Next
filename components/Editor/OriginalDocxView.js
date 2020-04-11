import React, { useState, useEffect } from 'react'
import { Box, CircularProgress } from '@material-ui/core'

import ReactHtmlParser from "react-html-parser";

// @inject('store')
// @observer
const OriginalDocxViewFC = (props) => {

    const { hidden = false, loading = false, domTree } = props;
    console.log(hidden, loading, domTree
        // ,'props.state : ',props.state
    )
    const [state, setState] = useState({ loading: true, domTree: null });

    // Eases the load of the conversion and displays a wheel in the meantime
    useEffect(() => {
        console.log('use eff')

        if (!state.domTree) {
            if (!!props.state) {
                console.log('react tree')
                const reactTree = ReactHtmlParser(props.state)
                console.log('react tree: ', reactTree)
                // asyncCall().then(setVal);
                // console.log(ReactHtmlParser, props.state, state.domTree)
                // ReactHtmlParser(props.state)
                //     .then(result => {
                //         setState({
                //             loading: false,
                //             domTree: result
                //         })
                //     })                
            }
        }

        return () => {
            // cleanup
        };

    }, []);


    return <Box border={0} p={2} flexGrow={1} display={hidden ? 'none' : 'flex'} fontSize={18} justifyContent="center">
        <Box maxWidth={800} display="block">
            {!!loading ? <CircularProgress /> : <>{domTree}</>}
        </Box>
    </Box>;
};

class OriginalDocxView extends React.Component {

    state = {
        loading: true,
        domTree: null
    }

    // Eases the load of the conversion and displays a wheel in the meantime
    async componentDidUpdate() {
        console.log(this.state.domTree, this.props.state)
        if (!this.state.domTree) {
            if (this.props.state) {
                const reactTree = await ReactHtmlParser(this.props.state)
                this.setState({
                    loading: false,
                    domTree: reactTree
                })
            }
        }
    }

    render() {
        const { hidden } = this.props
        let { loading, domTree } = this.state

        return (
            <Box border={0} p={2} flexGrow={1} display={hidden ? 'none' : 'flex'} fontSize={18} justifyContent="center" >
                <Box maxWidth={800} display="block">
                    {!!loading
                        ? <CircularProgress />
                        : <>{domTree}</>
                    }
                </Box>
            </Box>
        )
    }
}


export default OriginalDocxViewFC
