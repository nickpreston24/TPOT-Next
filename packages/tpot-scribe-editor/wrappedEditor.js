import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const WrappedEditor = React.forwardRef((props, ref) => {
    const [Editor, setEditor] = useState(false)

    useEffect(() => {
        let ScribeEditor = require('./editor').default
        setEditor(ScribeEditor)
    }, 
    [window]
    )

    if (!Editor) return <></>

    return <Editor ref={ref} />
})

// const WrappedEditor = dynamic(() => import('./editor'))

export default WrappedEditor
