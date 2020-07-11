import React, { createRef } from "react";
import { WordPressToolbar } from '../../components'
import { Spinner } from "@chakra-ui/core";


const config = {
    toolbar: {
        items: [
            'restrictedEditingException',
            'exportPdf',
            'code',
            'heading',
            '|',
            'fontSize',
            'fontFamily',
            'fontColor',
            'fontBackgroundColor',
            'removeFormat',
            '|',
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'subscript',
            'superscript',
            'highlight',
            '|',
            'alignment',
            '|',
            'numberedList',
            'bulletedList',
            '|',
            'indent',
            'outdent',
            '|',
            'todoList',
            'link',
            'specialCharacters',
            'blockQuote',
            'imageUpload',
            '|',
            'codeBlock',
            'horizontalLine',
            'pageBreak',
            '|',
            'insertTable',
            'mediaEmbed',
            '|',
            'undo',
            'redo'
        ],
    },
    language: 'en',
    // plugins: [Font],
    image: {
        toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side'],
    },
    table: {
        contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells'
        ],
    },
    licenseKey: '',
}

export class MyEditor extends React.Component<any, any> {
    state = { loading: true, contents: '' };
    CKEditor: any;
    ClassicEditor: any;
    CKEditorInspector: any;
    ckeditorRef: React.RefObject<any>;
    DecoupledEditor: any;

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

    attachInspector = editor => {
        this.CKEditorInspector.attach(editor, { isCollapsed: true })
    }

    componentDidMount() {
        this.CKEditor = require("@ckeditor/ckeditor5-react");
        // this.ClassicEditor = require("@ckeditor/ckeditor5-build-classic");
        this.CKEditorInspector = require('@ckeditor/ckeditor5-inspector');
        this.DecoupledEditor = require('@ckeditor/ckeditor5-build-decoupled-document')
        this.setState({ loading: false });

        if (!!this.props.doc) {
            let data = this.props.doc.data;

            this.setState({ contents: data.code })
        }
    }

    render() {
        // console.log('this.ckeditorRef :>> ', this.ckeditorRef);
        return this.CKEditor ? (
            <div className="App" >
                <WordPressToolbar {...{ getHtml: this.getHtml }} />
                <this.CKEditor
                    ref={this.ckeditorRef}
                    editor={this.DecoupledEditor}
                    data="<p>Hello from CKEditor 5!</p>"
                    onInit={editor => {
                        // You can store the "editor" and use when it is needed.
                        // !!editor && console.log("Editor is ready to use!");
                        if (editor) {
                            this.attachInspector(editor)
                            editor.ui.getEditableElement().parentElement.insertBefore(
                                editor.ui.view.toolbar.element,
                                editor.ui.getEditableElement()
                            )
                        }

                        this.setHtml(this.state.contents)
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        // console.log({ event, editor, data });
                    }}
                    // config={{
                    //     fullPage: false,
                    //     resize_enabled: false,
                    //     // removePlugins: 'resize,autogrow'
                    // }}
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