# Koothrappali - Backend

> Backend Service for Koothrappali

## Prerequisites

- [Node.js](https://yarnpkg.com/en/docs/install) - 8.9.0 or above
- [Yarn](https://yarnpkg.com/en/docs/install) - 1.7.0 or above
- [NPM](https://docs.npmjs.com/getting-started/installing-node) - 5.5.1 or above

## Setup

Clone the repository, install the dependencies and get started right away.

    $ git clone git@github.com:leapfrogtechnology/koothrappali.git <application-name>
    $ cd <application-name>
    $ yarn   # or npm install

Make a copy of `cred_example.json` as `cred.json` and update your AWS details.

Finally, start the application.

    $ yarn start:dev (For development)
    $ NODE_ENV=production yarn start (For production)

Navigate to http://localhost:8080/api-docs/ to verify installation.
