# @core

`@tpot-toolbox/core` is the "master" package. It is the home of the main NextJS powered client app. Other packages like `ui` and `models` can be imported into this package using [repo aliases]().


## Getting Started

> Make sure you have [yarn]() or [pnpm]() installed

Development (Chrome)

```bash
yarn dev
```

Development (Node)

```bash
yarn api
```

Build for Production

```bash
yarn build
```

Deploy to Netlify

```bash
yarn netlify
```

## Installing Packages

Normally with yarn it would be `yarn add package-name`, but since we are in a monorepo, you have to tell the manager which package/module is recieving a new dependency. It will take care of the rest, such as hoisting global dependencies and only including needed dependencies at the package-level node-modules folder. Your node-modules will be A LOT smaller!

! TODO: Ditch Lerna, use `NX` and `pnpm` instead....
```
lerna add package-name @tpot-toolbox/core
```