# TPOT-Next

<div style="text-align: center">
    <img src="https://api.netlify.com/api/v1/badges/8b0d19ae-6ae5-449b-bd6b-0510478ca3dc/deploy-status">
    <br />
    <br />
    <img src="docs/tpot_main.png">
</div>

## Contents

- [Repo Structure](#🧱-repo-structure)
- [App Structure](#📚-app-structure)

---

## 🧱 Repo Structure

> Note: This has to happen progressively as we root out cruft in the exising application. Here is a plan that I think could work and save us a lot of maintainence stress down the road

**Long Term Goal:**

"Do the same thing Chakra does for its repo" - **_[Source](https://github.com/chakra-ui/chakra-ui/tree/develop/packages)_**

### Phase 1

Restructure this repo into a [monorepo]() over time. Start with creating mobile-ready UI components in the the `@tpot-toolbox/ui` package and then move everything left over that is legacy to `@tpot-toolbox/core` to start.

```
└── tpot-toolbox (repo-root)
    ├── .netlify
    ├── .vscode
    ├── tests
    ├── docs
    ├── packages
    │   ├── core                  <-- Get this done second (M + P)
    │   │   ├── .next
    │   │   ├── constants
    │   │   ├── models
    │   │   ├── hooks
    │   │   ├── pages
    │   │   │   ├── account
    │   │   │   ├── edit
    │   │   │   └── index
    │   │   ├── .eslintrc
    │   │   ├── next.config.js
    │   │   ├── package.json
    │   │   └── etc...
    │   └── ui                    <-- Get this done first (Braden)
    │       ├── .storybook
    │       ├── components
    │       │   ├── atoms
    │       │   ├── organisms
    │       │   ├── templates
    │       │   └── etc...
    │       └── package.json
    └── monorepo.config.js
```

**Reasoning**

It will separate components that are unused or are still using `@material-ui` and `draft-js` or are intrinsically bound to app logic, like `ScribeToolbar` is. Will make it easier to remove those packages and trim down dependencies in the `core` package.

Import aliases will be the norm. For example, in `@tpot-toolbox/core` (the main NextJS app), under `pages/edit/index.js`, you would be able to import the template for that page from `@tpot-toolbox/ui/templates`. We can also remap the current alias `@templates` to point this location in the `UI` package.

Helps jobs roles and commit conflicts. Easier to separate concerns but still have it all in the same repo for simplicity. Packages can be versioned and tested separately.

### Phase 2

Later, when it makes sense in the course of development, certain parts of `@tpot-toolbox/core` get broken apart into separate modules like, `model`, `services`, `hooks`, etc.

```
└── tpot-toolbox (repo-root)
    ├── .netlify
    ├── .vscode
    ├── tests
    ├── docs
    ├── packages
    │   ├── services
    │   ├── storage
    │   ├── editor
    │   ├── models
    │   ├── hooks
    │   ├── utils
    │   ├── core
    │   └── ui
    ├── repo.vs-workspace
    └── monorepo.config.js
```

**Reasoning**

It isn't a requirement that the modules have to be big or anything. Its just to give them space to breath and make testing easier.

Will be helpful to separate out TypeScript usage too, because a package like `models` can use TS and other modules like `core` don't necessarily have to have TS as a dependency when importing something from `@tpot-toolbox/models`

---

## 📚 App Structure

The main NextJS app in the future will be housed under `/packages/core` as `@tpot-toolbox/core`.

### NextJS Use Case

We are using NextJS primarily for its file-based routing and its ability to modify the webpack and babel configs easier than CRA did.

It is important to note that we are NOT using Server Sider Rendering (SSR). We are only using the Static Site generation features of NextJS. See Vercel's docs on [our specific use case](https://nextjs.org/docs/basic-features/data-fetching#fetching-data-on-the-client-side)

### Core Methodology

1. The website is made of "statically optimized pages", meaning that when the page loads, we aren't asking the NextJS backend server for any initial props to generate a new page to be served to us on the fly. Our page isn't build dynamically.
2. We would never want to do anything dynamically anyways, because our data changes too frequently. We wouldn't want to rebuild a new page everytime a letter changed in Firestore, for example.
3. What we **DO** want is a optimized page that has all of its dependencies nicely bundled by NextJS, code splitting, etc.
4. If dynamic data is needed, the static page makes an API call for external data after it mounts to the DOM.
5. We can fetch data like that using "State While Revalidate" (SWR) libraries like `react-query` and `useSWR` to make this easy and predicable.
6. When data is recieved, it is stuffed into the data [model]() for that page. That model is then applied to the template the page is using, as prop data.

### Terminology

> _Roughly_ in the order that NextJS "calls" them

#### Page

Directly linked to the routing system. Filesystem based structure. It is the glue between the Models and the Views (MVC pattern). A page is essentially Model + Template, tied to a route.

Example: (very rough)

```javascript
import accountModel from '@tpot-toolbox/models/account'
import AccountTemplate from '@tpot-toolbox/ui/template/account'

// ...other imports

// User Account Page (@core/pages/account/index.js)
const AccountPage = () => {

    // Make an instance of the page model
    const account = accountModel()
    // Get some specific route-based props
    const { id } = useQueryParams()

    // Fetch data on mount
    useEffect(() => {
        const userData = await fetch(`/api/users${id}/settings`)
        account.setUserData(userData)
    }[])

    return (
        <AccountTemplate
            fullName={account.fullName}
            avatar={account.lastName}
        />
    )
}
```

#### Model

Model stores the static and reactive data for a page (and sometimes the data/methods for other components on that page, like CKEditor). It contains all the methods needed for managing data, snapshots, dependency injection, etc. This example is of a typed model done in MobX State Tree (MST)

The contents of the model are applied as props to a React component, primarily a Template. App specific logic can definately be stored here.

Example: (very rough)

```javascript
const accountModel = types
  .model("account", {
    firstName: types.string,
    lastName: types.string,
    avatar: types.string,
  })
  .views((self) => {
    // @ computed properties
    return {
      get fullName() {
        return `${self.firstName} ${self.lastName}`;
      },
    };
  })
  .actions((self) => {
    return {
      setUserData(data) {
        self = { ...data, ...self };
      },
    };
  });
```

#### Template

Templates are React components only ever used by Pages. They are usually unique the app and typically only used once per route. They don't contain ANY app-specific logic.

All of their data comes in as props, usally provided by the model when both are rendered together in the Page.

```javascript
import AvatarSection from '@organisms/AvatarSection'
import UserTable from '@modlecules/UserTable'

// ... other imports

export interface AccountTemplateProps {
    /**
     * The name of the user. Rendered as an H1
     */
    fullName: string
    /**
     * The url address for the avatar image. Must be HTTPS
     */
    avatar: string
}


const AccountTemplate: React.FC<AccountTemplateProps> = ({
    fullName = 'John Doe'
    avatar = 'https://tinyurl/48NIEST5.png'
}) => {

    if (loading) {
        return <Skeleton>
    } else {
        return (
            <Box display="flex" pt={4} bg="gray.100">
                <AvatarSection title={fullName} src={avatar}>
                <UserTable>
            </Box>
        )
    }
}
```

#### Component

The lowest level items that make up templates. They are very generic, and are likely reused often. Follow the Atomic Design principles outlined by Brad Frost.

Stored in the `@tpot-toolbox/ui` package. Usually aliased as `@atoms`, `@modlecules`, `@organisms`, etc. for use inside Templates.

Example:

```javascript
import { Box, Heading, Avatar } from '@chakra-ui/core'

const AvatarSection = (
    title = 'Avatar Name'
    src = null
) => {
    <Box display="inline-block" p={2}>
        <Heading as="h1">{title}</Heading>
        <Avatar src={src}>
    </Box>
}
```

### Summary

#### Component-Flow

Page --> Template --> Organisms --> Molecules --> Atoms

#### Data Flow

Page (props) --> Model (as state) <--> Template (as props) --> Components (as props)
