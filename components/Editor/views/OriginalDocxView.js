import React from 'react'
import { Box, CircularProgress } from '@material-ui/core'
import {  observer } from 'mobx-react'
import ReactHtmlParser from 'react-html-parser'

class OriginalDocxView extends React.Component {

    state = {
        loading: true,
        domTree: null
    }

    // Eases the load of the conversion and displays a wheel in the meantime
    async componentDidUpdate() {
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
                    {loading
                        ? <CircularProgress />
                        : <>{domTree}</>
                    }
                </Box>
            </Box>
        )
    }
}

export default OriginalDocxView
