import React, { createRef } from "react";
import { ScribeToolbar } from '../../components'
import { Spinner, Box, Flex, Button } from "@chakra-ui/core";
import { isDev } from "../../helpers";
import { ProvideSessions } from "../../hooks";
import './ScribeEditor.module.css'

export class ScribeEditor extends React.Component<any, any> {
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

    getHtml = () => this.ckeditorRef.current.editor.getData()

    setHtml = (text) => this.ckeditorRef.current.editor.setData(text)

    attachInspector = editor => {
        // if (isDev())
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
            <ProvideSessions>
                <Flex id="page" h="100%" justify="center">
                    <Flex id="frame" w="100%" direction="column" pos="relative" maxW={960}>
                        <Box id="actions" my={2}>
                            <ScribeToolbar {...{ getHtml: this.getHtml, setHtml: this.setHtml }} />
                        </Box>
                        <this.CKEditor
                            ref={this.ckeditorRef}
                            editor={this.DecoupledEditor}
                            data={"<p></p>"}
                            onInit={editor => {

                                if (editor) {
                                    // Get the toolbar DOM element from CK
                                    const toolbarElement = editor.ui.view.toolbar.element

                                    // Prepend the sticky toolbar within the parent frame
                                    const actionsElement = document.querySelector("#actions")
                                    const frameElement = actionsElement.parentElement
                                    const editorElement = frameElement.lastElementChild

                                    frameElement.insertBefore(toolbarElement, editorElement)

                                    // Resolve whether the Inspector should be attached
                                    this.attachInspector(editor)
                                }

                                // Always set the HTML content on init
                                this.setHtml(this.state.contents)
                            }}
                        />
                    </Flex>
                </Flex>
            </ProvideSessions>
        ) : (
                <Spinner />
            );
    }
}


export default ScribeEditor;