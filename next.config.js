const withCSS = require('@zeit/next-css')
require('dotenv').config()
const webpack = require('webpack')
const path = require('path')

console.log('cat')

module.exports = withCSS({    
    webpack(config) {
        config.plugins.push(new webpack.EnvironmentPlugin(process.env))

        // Local module path resolutions. These may end on NPM at some point / moved to another repo
        config.resolve.alias['tpot-scribe-editor'] = path.resolve(__dirname, 'packages/tpot-scribe-editor')
        config.resolve.alias['ckeditor5-build-fully-featured'] = path.resolve(__dirname, 'packages/ckeditor5-build-fully-featured')

        return config
    },
})