const withCSS = require('@zeit/next-css')
require('dotenv').config()
const webpack = require('webpack')

// module.exports = {
//     webpack: (config)=> {
//         config.plugins.push(
//             new webpack.EnvironmentPlugin(process.env)
//         )

//         return config
//     }
// }



// module.exports = withCSS({
//     /* config options here */
// },
// //     webpack: (config)=> {
// //         config.plugins.push(
// //             new webpack.EnvironmentPlugin(process.env)
// //         )

// //         return config
// //     }
// // }
// )


module.exports = withCSS({
    poweredByHeader: false,
    cssModules: true,
    cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: '[local]___[hash:base64:5]',
    },
    webpack(config) {
        config.plugins.push(new webpack.EnvironmentPlugin(process.env))
        return config;
    },
});