export class MyEditor extends React.Component {
    state = { loading: true };

    componentDidMount() {
        this.CKEditor = require("@ckeditor/ckeditor5-react");
        this.ClassicEditor = require("@ckeditor/ckeditor5-build-classic");
        this.setState({ loading: false });
        console.log('this.CKEditor :>> ', !!this.CKEditor, !!this.ClassicEditor);
    }

    render() {
        return this.CKEditor ? (
            <this.CKEditor
                editor={this.ClassicEditor}
                data="<p>Hello from CKEditor 5!</p>"
                onInit={editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log({ event, editor, data });
                }}
            />
        ) : (
                <div>Editor loading</div>
            );
    }
}

export default MyEditor;