# launchpad-ts

## Requirements

To build and run this app locally you will need:

- [Node.js](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)
- [YARN](https://yarnpkg.com/)
- [Docker](https://www.docker.com/)

## Features

- Yarn workspaces
- Lint and Prettier
- Dockerized

### API

- Nodemon - server auto-restarts when code changes
- Koa v2
- TypeORM (SQL DB) with basic CRUD included
- Swagger decorator (auto generated swagger docs)
- Class-validator - Decorator based entities validation
- Jest unit tests
- Jest integration tests
- Sentry Integration

### Web

- Storybook
- Redux Toolkit

## Getting Started

- Clone the repository

```
git clone --depth=1 https://github.com/appliedblockchain/launchpad <project_name>
```

- Install dependencies

```
cd <project_name>
yarn
```

- Create `.env` file from `.env.dev`.

- Run the project in docker

```
yarn start
```

## Project Structure

| Package    | Description                                      |
| ---------- | ------------------------------------------------ |
| ui-library | Visual components to be used on web application. |
| api        | API server.                                      |
| web        | Web interface.                                   |

## Development Tips

Check docs inside this repository.
