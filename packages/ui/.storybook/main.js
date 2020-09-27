module.exports = {
  stories: [
    "../markdown/**/*.stories.mdx",
    "../components/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  babel: async (options) => ({
    ...options,
    plugins: [
      ...options.plugins,
      [
        "module-resolver",
        {
          root: "../",
          alias: {
            "@utils": "./components/utils",
            "@theme": "./components/theme",
            "@atoms": "./components/atoms",
            "@molecules": "./components/molecules",
            "@organisms": "./components/organisms",
            "@templates": "./components/templates",
            "@components": "./components",
          },
        },
      ],
    ],
  }),
};
