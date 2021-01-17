const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    webpack: (config) => {
        config.resolve.alias['tpot-scribe-editor'] = path.resolve(
            __dirname,
            'packages/tpot-scribe-editor'
        );
        config.resolve.alias['ckeditor5-build-fully-featured'] = path.resolve(
            __dirname,
            'packages/ckeditor5-build-fully-featured'
        );

        return config;
    },
};
