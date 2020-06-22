import React, { FC } from 'react';
import { uploadLocalFile } from '../Editor/functions/uploader';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// import { observer } from 'mobx-react';
import { Box } from '@material-ui/core';
import { convertFile } from 'components/Editor/functions/converter';
import { notify } from 'components/experimental/Toasts';

interface Props {
    // uploadFn: (event)
}

const UploadButton:FC<Props> = () => {
    return (
        <Box width={24} height={20} p={0} m={0} mt="4px" display="flex" alignItems="center" justifyContent="center">
            <input
                // multiple // multi-upload not recommended
                accept=".docx"
                type="file"
                id="upload-button-input"
                style={{ display: 'none' }}
                onChange={async (event) => {
                    const files = event.target.files;
                    let file = files[0];
                    if (!file)
                        return;
                    await uploadLocalFile(file)
                    let html = await convertFile(file)
                    console.log('html uploaded :>> ', html);
                    notify('Document uploaded successfully!', 'info')

                }} />
            <label htmlFor="upload-button-input" style={{ margin: 12 }}>
                <CloudUploadIcon />
            </label>
        </Box>
    );
};

export default UploadButton