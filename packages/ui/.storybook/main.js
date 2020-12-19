const path = require('path')
const toPath = _path => path.join(process.cwd(), _path)

module.exports = {
  stories: [
    '../markdown/**/*.stories.mdx',
    '../components/**/*.stories.@(js|jsx)'
  ],
  refs: {},
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: async config => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@emotion/core': toPath('node_modules/@emotion/react'),
          'emotion-theming': toPath('node_modules/@emotion/react')
        }
      }
    }
  },
  babel: async options => ({
    ...options,
    plugins: [
      ...options.plugins,
      [
        'module-resolver',
        {
          root: '../',
          alias: {
            '@utils': './components/utils',
            '@theme': './components/theme',
            '@atoms': './components/atoms',
            '@molecules': './components/molecules',
            '@organisms': './components/organisms',
            '@templates': './components/templates',
            '@layouts': './components/layouts',
            '@components': './components',
            '@models': './models',
            '@hooks': './hooks'
          }
        }
      ]
    ]
  })
}
