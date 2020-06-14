import React, { useEffect, useState } from 'react'

const WrappedEditor = React.forwardRef((props, ref) => {
    const [Editor, setEditor] = useState(false)

    useEffect(() => {
        let ScribeEditor = require('./editor').default
        setEditor(ScribeEditor)
    }, [window])

    if (!Editor) return <></>

    return <Editor ref={ref} />
})

export default WrappedEditor
