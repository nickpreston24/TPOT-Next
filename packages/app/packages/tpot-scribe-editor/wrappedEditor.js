import React, { useEffect, useState } from 'react'

const WrappedEditor = React.forwardRef((props, ref) => {
    const [Editor, setEditor] = useState(false)

    useEffect(() => {
        let ScribeEditor = require('./editor').default
        setEditor(ScribeEditor)
    },
        [window]
    )

    if (!Editor && !props) return <>Loading...</>

    return <Editor ref={ref} />
})


export default WrappedEditor
