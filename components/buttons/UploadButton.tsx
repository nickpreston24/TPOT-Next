import React, { FC } from 'react';
import { uploadLocalFile } from '../Editor/functions/uploader';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Button } from '@chakra-ui/core';
import { notify } from 'components/Toasts';
import { useAuth } from 'hooks/useAuth';
import { useRouter } from 'next/router';
import * as ROUTES from '../../constants/routes'

interface Props {
    afterUpload?: () => void
}

const UploadButton: FC<Props> = ({ afterUpload }) => {

    const { user } = useAuth();
    const router = useRouter();

    return (
        <Button onClick={() => {
            // console.log('user :>> ', Object.keys(user), user.email);
            if (!user && router.pathname !== ROUTES.LANDING) {
                notify("You need to login to perform this action!", 'info')
                router.push(ROUTES.LANDING)
            }
        }} >
            <input
                // multiple // multi-upload not recommended
                accept=".docx"
                type="file"
                id="upload-button-input"
                style={{ display: 'none' }}
                onChange={async (event) => {
                    const { email, displayName } = user;

                    const files = event.target.files;
                    let file = files[0];
                    if (!file)
                        return;

                    let { document } = (await uploadLocalFile(file, email))
                    console.info(`Uploaded by user ${email}`);
                    notify('Document uploaded successfully!', 'info');

                    if (!document?.id)
                        return

                    const PATH = ROUTES.EDIT
                    router.push(`${PATH}/[doc]`, `${PATH}/${document.id}`)
                }} />
            <label htmlFor="upload-button-input" style={{ margin: 12 }}>
                <CloudUploadIcon />
            </label>
        </Button>
    )
};

export default UploadButton