import React, { createRef } from "react";
import { WordPressToolbar } from '../../components'
import { Spinner, Box, Flex, Button } from "@chakra-ui/core";


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
        return html;
    }

    setHtml = (text) => {
        this.ckeditorRef.current.editor.setData(text)
    }

    attachInspector = editor => {
        // TODO : Check if we are in DEV mode
        // this.CKEditorInspector.attach(editor, { isCollapsed: true })
    }

    componentDidMount() {
        this.CKEditor = require("@ckeditor/ckeditor5-react");
        this.CKEditorInspector = require('@ckeditor/ckeditor5-inspector');
        this.DecoupledEditor = require('@ckeditor/ckeditor5-build-decoupled-document')
        this.setState({ loading: false });

        if (!!this.props.doc) {
            let { props: { doc: { data = {} } } } = this
            let { code = '' } = data

            this.setState({ contents: code })
        }
    }

    render() {
        return this.CKEditor ? (
            <Flex
                height="100%"
                overflow="hidden"
                flexDirection="column"
                alignItems="center"
            >
                <Box id="sticky-toolbar" h={80} w="100%" maxW={960} mt={1} mr={4} >
                    <WordPressToolbar {...{ getHtml: this.getHtml }} />
                    {/* CK's Toolbar is appended here by this.CkEditor.onInit() */}
                </Box>
                <Flex id="scroll-area" h={70} w="100%" flexGrow={1} overflowY="scroll" overflowX="hidden" justifyContent="center">
                    <Box id="editor frame" w="100%" maxW={960} >

                        <this.CKEditor
                            ref={this.ckeditorRef}
                            editor={this.DecoupledEditor}
                            data={"<p>Hello from CKEditor 5!</p>"}
                            onInit={editor => {

                                if (editor) {
                                    // Get the toolbar DOM element from CK
                                    const toolbarElement = editor.ui.view.toolbar.element

                                    // Get MyEditor's top Toolbar sticky toolbar DOM element
                                    const toolbarContainer = document.querySelector("#sticky-toolbar")

                                    // Add CK's toolbar as the last child of the sticky toolbar
                                    toolbarContainer.appendChild(toolbarElement)

                                    // Resolve whether the Inspector should be attached
                                    this.attachInspector(editor)
                                }

                                // Always set the HTML content on init
                                this.setHtml(this.state.contents)

                            }}
                        />

                    </Box>
                </Flex>
            </Flex>
        ) : (
                <Spinner />
            );
    }
}


export default MyEditor;