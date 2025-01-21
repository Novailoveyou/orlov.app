# catapulto.ru 2.0

Please read [Confluence Page](https://catapulto.atlassian.net/wiki/pages/resumedraft.action?draftId=4271964167)

This is an official monorepo turborepo for catapulto.ru - includes front-end packages and apps. This is work in progress and **currently NOT stable**. There is work in progress for the [migration table](https://docs.google.com/spreadsheets/d/1k2U9RQkajOv4xOc7H9cbNf41Qcwk-t7363g6-rNEgYM/edit?gid=0#gid=0) of [CTP-12887 task](https://yt.ctplt.ru/issue/CTP-12887/Create-frontend-tech-plan-for-2025). Currently setting up the environment and breaking catapulto.ru app into small web-components

## CLI

### Initial setup

To init local development server, run following command:

```zsh
pnpm clone https://gitea.ctplt.ru/catapulto/frontend_react.git catapulto-next && cd ./catapulto-next && pnpm i
```

### Develop

To develop all apps and packages, run the following command:

```zsh
pnpm dev
```

### Build

To build all apps and packages, run the following command:

```zsh
pnpm build
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `catapulto-ru`: main app with prod url catapulto.ru
- `catapulto-widget`: catapulto widget to be integrated with `<script>` tags onto e-commerce websites of our partners
- `@repo/ui`: a stub Next/React component library shared by all applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Remote Caching

We should consider doing a self-hosted [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

## Budges

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
