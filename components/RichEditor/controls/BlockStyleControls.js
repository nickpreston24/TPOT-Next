
const BLOCK_TYPES = [
    { label: "H1", style: "header-one" },
    { label: "H2", style: "header-two" },
    { label: "H3", style: "header-three" },
    { label: "H4", style: "header-four" },
    { label: "H5", style: "header-five" },
    { label: "H6", style: "header-six" },
    { label: '"', style: "blockquote" },
    { label: "*-", style: "unordered-list-item" },
    { label: "1..3", style: "ordered-list-item" },
    // { label: "-S-", style: "STRIKETHROUGH" },
    // { label: "-S-", style: "line-through" }
    // { label: "Code Block", style: "code-block" }
];

export const getBlockStyle = block => {
    switch (block.getType()) {
        case "blockquote":
            return "RichEditor-blockquote";
        default:
            return null;
    }
};

export const BlockStyleControls = props => {
    const { editorState } = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <div className="RichEditor-controls">
            {BLOCK_TYPES.map(type => {
                return (
                    <PrimaryButton
                        key={type.label}
                        active={type.style === blockType}
                        label={type.label}
                        onToggle={props.onToggle}
                        style={type.style}
                    />
                )
            })}
        </div>
    );
};