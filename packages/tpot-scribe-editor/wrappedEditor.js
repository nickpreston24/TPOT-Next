import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const WrappedEditor = React.forwardRef((props, ref) => {
    const [Editor, setEditor] = useState(false)

    useEffect(() => {
        let ScribeEditor = require('./editor').default
        // let ScribeEditor = dynamic(() => import('./editor'))
        setEditor(ScribeEditor)
        console.log('CK Editor loaded.')
    },
        [window]
        // [] // what if this worked?
    )

    if (!Editor && !props) return <>Loading...</>

    console.log('window.innerHeight', window.innerHeight);
    return <Editor ref={ref} />
})


export default WrappedEditor
