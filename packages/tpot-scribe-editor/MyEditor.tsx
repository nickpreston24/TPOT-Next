import React, { createRef } from "react";
import { WordPressToolbar } from '../../components'
import { Spinner } from "@chakra-ui/core";

export class MyEditor extends React.Component<any, any> {
    state = { loading: true, contents: '' };
    CKEditor: any;
    ClassicEditor: any;
    ckeditorRef: React.RefObject<any>;

    constructor(props) {
        super(props)
        this.ckeditorRef = createRef();
    }

    getHtml = () => {
        const html = this.ckeditorRef.current.editor.getData()
        // console.log('html :>> ', html);
        return html;
    }

    setHtml = (text) => {
        this.ckeditorRef.current.editor.setData(text)
    }

    componentDidMount() {
        this.CKEditor = require("@ckeditor/ckeditor5-react");
        this.ClassicEditor = require("@ckeditor/ckeditor5-build-classic");
        this.setState({ loading: false });

        if (!!this.props.doc) {
            let data = this.props.doc.data;

            this.setState({ contents: data.code })
        }
    }

    render() {
        console.log('this.ckeditorRef :>> ', this.ckeditorRef);
        return this.CKEditor ? (
            <div className="container" >
                <WordPressToolbar {...{ getHtml: this.getHtml }} />
                <this.CKEditor
                    ref={this.ckeditorRef}
                    editor={this.ClassicEditor}
                    data="<p>Hello from CKEditor 5!</p>"
                    onInit={editor => {
                        // You can store the "editor" and use when it is needed.
                        !!editor && console.log("Editor is ready to use!");
                        this.setHtml(this.state.contents)
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        // console.log({ event, editor, data });
                    }}
                />
            </div>
        ) : (
                <Spinner />
            );
    }
}


/** Working [window] fix.  DO NOT DELETE! */

// export class MyEditor extends React.Component {
//     state = { loading: true };

//     componentDidMount() {
//         this.CKEditor = require("@ckeditor/ckeditor5-react");
//         this.ClassicEditor = require("@ckeditor/ckeditor5-build-classic");
//         this.setState({ loading: false });
//         console.log('this.CKEditor :>> ', !!this.CKEditor, !!this.ClassicEditor);
//     }

//     render() {
//         return this.CKEditor ? (
//             <this.CKEditor
//                 editor={this.ClassicEditor}
//                 data="<p>Hello from CKEditor 5!</p>"
//                 onInit={editor => {
//                     // You can store the "editor" and use when it is needed.
//                     console.log("Editor is ready to use!", editor);
//                 }}
//                 onChange={(event, editor) => {
//                     const data = editor.getData();
//                     console.log({ event, editor, data });
//                 }}
//             />
//         ) : (
//                 <div>Editor loading</div>
//             );
//     }
// }


export default MyEditor;