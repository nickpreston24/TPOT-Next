/** Basic File Browser for uploads and conversions */
const FileBrowser = ({ onSelected }) => {
    const setFile = (event) => {
        const file = event.target.files[0];
        onSelected(file);
    }
    return <input type="file" onChange={setFile} />;
}
export default FileBrowser;