import React from 'react';
import { uploadLocalFile } from '../Editor/functions/uploader';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { observer } from 'mobx-react';
import { Box } from '@material-ui/core';

const UploadButton = () => {
    return (
        <Box width={24} height={20} p={0} m={0} mt="4px" display="flex" alignItems="center" justifyContent="center">
            <input
                // multiple // multi-upload not recommended
                accept=".docx"
                type="file"
                id="upload-button-input"
                style={{ display: 'none' }}
                onChange={(e) => {
                    const files = e.target.files;
                    let file = files[0];
                    if (!file)
                        return;
                    uploadLocalFile(file);
                }} />
            <label htmlFor="upload-button-input" style={{ margin: 12 }}>
                <CloudUploadIcon />
            </label>
        </Box>
    );
};

export default UploadButton