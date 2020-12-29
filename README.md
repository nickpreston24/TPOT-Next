# TPOT Toolbox

#### A Progressive Web App for ThePathOfTruth

- [🏇 Quick Start](#🏇-quick-start)
- [🧱 Monorepo Management](#🧱-monorepo-management)
- [🚧 Development Environment](#🚧-development-environment)
- [🐫 Releasing Versions](#🐫-releasing-versions)
- [📦 Package & Deploy](#📦-package-&-deploy)
- [🚀 Strapi API Backend](#🚀-strapi-api-backend)
- [🌳 Global Variables](#🌳-global-variables)
- [🏷️ Alpha Development](#🏷️-alpha-development)

---

## 🏇 Quick Start

> These commands are intended for Beta onward. See what's different in [Alpha](#🏷️-alpha-development)

### `yarn dev`

Starts up both the client web app and the [strapi](https://strapi.io/) backend. You can also run them individually with `yarn dev:app` and `yarn dev:api`

### `yarn build`

Runs the webpack configuration for each package and exports to `dist`, `out`, and `build` directories. Creates production-ready front and backend apps that can be served with `yarn serve`

### `yarn lint`

Runs code syntax and formatting validation globally and as overridden by each package.

### `yarn test`

Runs the testing suites (Jest, Cypress, Puppeteer) for each package in parallel. Should be run before a patch is [versioned](#🐫-releasing-versions)

### `yarn deploy`

Builds the client application and all sub-packages and deploys it to Netlify. The backend API is [hosted manually](#🚀-strapi-api-backend).

---

## 🧱 Monorepo Management

- [Why a Monorepo?](#why-a-monorepo)
- [Commonly Used Commands](#commonly-used-commands)

### Why a Monorepo?

Just what is a monorepo? See [this video](https://www.youtube.com/watch?v=E188J7E_MDU) for a 10 minute overview.

There are many great libraries that use monorepos like [babel](https://github.com/babel/babel), [jest](https://github.com/facebook/jest), and [chakra-ui](https://github.com/chakra-ui/chakra-ui). But you are not limited to using monorepos for libraries. You can also use them to [organize a webapp](https://github.com/ferreiro/website).

```
└── @toolbox (Repository Root)
    ├── .netlify
    ├── .vscode
    ├── docs
    ├── tests
    ├── packages
    │   ├── app
    │   ├── api
    │   ├── editor
    │   ├── functions
    │   ├── hooks
    │   ├── models
    │   └── ui
    └──TPOT Toolbox.vs-workspace
```

#### Better Tooling & Packaging

This lets you be very specific in your build process for each package. For example, the `app` package can have separate tooling, dependencies, and bundling that works best for that type of package. It would make no sense to include `storybook` as a dependency in the `app` package if it is only used for testing things in the `ui` package.

Maybe in some packages like `functions`, it makes sense to use TypeScript, but you may import functions from it in the `app` package which runs off of vanilla Javascript. Sometimes it makes sense for `app` to use a different `.babelrc` configuration than `functions`. This is all possible in a monorepo.

#### Better Depenency Managment

Each package has its own `package.json` containing only the unique dependencies needed for that package.

It is easy to add packages of a monorepo as dependencies of one another. For example, `app` can have `ui`, `hooks`, and `editor` as a dependency which would be [installable](#install-package-b-as-a-dependency-of-package-a) as `@toolbox/[package]`

#### Easier Managment Tools

There are several libraries for managing a monorepo. We are not using, even though it is wildly popular, `lerna` because it isn't clean. Instead, we are doing the lightest and low-level form of monorepos using [`oao`](https://www.npmjs.com/package/oao) and [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) with the following features:

- Maintain separate packages, such as: `@toolbox/ui`, `@toolbox/app`, `@toolbox/hooks`, etc.
- Synchronized package versioning. Individual packages will always match the version in the repo's root `package.json`
- Only dependencies that are unique to a package will be stored in that package's `node_modules`. Common modules are hoisted to the root `node_modules` automatically.

We aren't using features like automatic NPM publishing of packages for instance, which `oao` supports.

### Commonly Used Commands

#### Install [`oao`](https://www.npmjs.com/package/oao#installationv) globally so you can use it directly:

```
yarn add oao -D -W
```

#### Clean all node_modules:

```
oao clean
```

#### Create a new package:

```
mkdir packages/[package]
cd packages/[package]
yarn init
```

During `yarn init`, the name of the package should be scoped:

```
>>> question name: @toolbox/[package]
```

You should see it now with [`oao status`](#check-status-of-all-packages)

#### Add a dependency for a single package:

```
oao add @toolbox/app chalk
```

#### Install a local package as a dependency to `@toolbox/app`:

```
oao add @toolbox/app @toolbox/hooks@1.1.15
```

Where `version` is equal to the version of package at install time. Ex: `1.1.15`. See Yarn's [docs](https://classic.yarnpkg.com/en/docs/cli/add/#toc-adding-dependencies) for more info on the `add` command.

#### Remove a local package from `@toolbox/app`'s dependencies:

```
oao remove @toolbox/app @toolbox/hooks
```

#### Check status of all packages:

```
oao status
```

```
* Subpackage status: [8 package/s, incl. root]

    Name                                     Version        Private Changes Dependencies
    @toolbox/api                             1.0.2          yes     1       3
    @toolbox/app                             1.0.2          yes     1       5
    @toolbox/editor                          1.0.2          yes     1       0
    @toolbox/functions                       1.0.2          yes     1       0
    @toolbox/hooks                           1.0.2          yes     1       2
    @toolbox/models                          1.0.2          yes     1       1
    @toolbox/ui                              1.0.2          yes     1       5
    Root                                     1.0.2          yes     N/A     0 (+ 1 dev)
```

There are more [features](https://www.npmjs.com/package/oao#main-commands), yet to be explored that `oao` can offer us in the future.

---

## 🚧 Development Environment

> The following is different for Beta vs [Alpha](#🏷️-alpha-development)

- [Commands](#commands)
- [Debugging](#debugging)
- [Linting](#linting)

Use [VSCode](https://code.visualstudio.com/) for development. You can open up the `Toolbox.code-workspace` file for better organization in the explorer. A `.vscode` directory is also checked into the repo to keep extensions, linting settings, and formatting consistent.

You can right-click on any of the workspace folder names - `@toolbox/[package]` - and select `Open in Integrated Terminal` to quickly switch your terminal to the right package for running the following commands:

### Commands

### `@toolbox/app`

| Command       | Description                                        |
| ------------- | -------------------------------------------------- |
| `yarn dev`    | Starts a live-reload development server for Nextjs |
| `yarn build`  | Build a production-ready app with webpack          |
| `yarn deploy` | Bundle and deploy the Nextjs app to Netlify        |

### `@toolbox/ui`

| Command      | Description                                  |
| ------------ | -------------------------------------------- |
| `yarn story` | Startup Storybook for component development |
| `yarn build` | Builds your Storybook as a static webapp     |

### `@toolbox/api`

| Command      | Description                                      |
| ------------ | ------------------------------------------------ |
| `yarn start` | Launch the Strapi backend API in dev mode        |
| `yarn build` | Builds Strapi so that it is ready to be deployed |

### Debugging

There are two VSCode launch configurations for debugging in the `.vscode` folder. They allow you to add breakpoints to pause the execution of code, making it easier to find problems faster.

The `Debug Client` run option will debug `@toolbox/app`'s Nextjs app in the browser. Google Chrome is most suitable for this type of debugging.

The `Debug Server` run option will debug `@toolbox/api`'s Strapi API backend in Node. The debugging is handled within VSCode's terminal.

### Linting

It is highly recommended you install the ESLint extension for VSCode. This will keep a live server running in the background checking for errors on the files you have open.

You can run `yarn lint` to check for errors globally and fix them automatically. The root configuration is ESLint + Airbnb + Prettier. Though each package has the option of adding a local `.eslintrc.yaml` to override the global config locally.

---

## 🐫 Releasing Versions

We tag releases on the `master` branch and patch versions on `develop`.

Examples:

- A feature branch was merged into `develop`. We run `yarn bump` to patch the version from `1.2.55` to `1.2.56` on the `develop` branch.
- The `develop` branch was merged into `master`. We run `yarn release:minor` to version from `1.2.34` to `1.3.0` on the `master` branch.

---

## 📦 Package & Deploy

Unlike [development](#🚧-development-environment), these commands are run at the root of the repo

| Command       | Description                                                    |
| ------------- | -------------------------------------------------------------- |
| `yarn dev`    | Runs Nextjs, Storybook, and Strapi all at once for development |
| `yarn lint`   | Runs ESLint with `--fix` on all files in the repo              |
| `yarn build`  | Runs the build command for each package                        |
| `yarn deploy` | Deploys the packages according to the repo's netlify.toml      |

---

## 🚀 Strapi API Backend

> To be added at a later date...

---

## 🌳 Global Variables

Make sure you keep a copy of your `.env` files for each package in a safe place

#### `@toolbox/app`

```
packages/app/.env

REACT_APP_API_KEY=········································
REACT_APP_AUTH_DOMAIN=······.firebaseapp.com
REACT_APP_DATABASE_URL=https://······.firebaseio.com
REACT_APP_PROJECT_ID=······
REACT_APP_STORAGE_BUCKET=······.appspot.com
REACT_APP_MESSAGING_SENDER_ID=············
```

---

## 🏷️ Alpha Development

The codebase for the Alpha release was never set up to be a monorepo. With the upcoming Beta using a monorepo, we needed a place to store the alpha codebase within the repo so it could continue to be maintained and deployed.

The location of the alpha codebase now lives in an untracked package called `legacy`. This is in the `packages/legacy` folder of the repo. This directory is not tracked by the monorepo [managment tools](#easier-managment-tools).

The VSCode workspace has been updated so you can right-click the `Alpha Release (@legacy)` folder and `Open in Integrated Terminal`. This will allow you to use commands like `yarn dev` just as before. Also, in the top-level `package.json`, some commands for the Alpha codebase are elevated there and prefixed, such as `yarn legacy:dev` so that you don't always have to `cd packages/legacy`.

If you are deploying the Alpha, you can run `yarn deploy` at the root of the repo. The `netlify.toml` is now there, and the monorepo and respects deploying Alpha from it.

At some point, Beta will release, and the `legacy` package will be deleted - as the code from Alpha will have already been refactored into Beta at that point.