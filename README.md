# advanced-node
The project uses nodejs for back-end && react for front-end 

Testing with Jest && Puppeteer

<a href="https://circleci.com/gh/facebook/jest"><img src="https://circleci.com/gh/facebook/jest.svg?style=shield" alt="CircleCI Build Status"></a>
    <a href="https://travis-ci.org/facebook/jest"><img src="https://travis-ci.org/facebook/jest.svg?branch=master" alt="Travis Build Status"></a>
    <a href="https://ci.appveyor.com/project/Daniel15/jest/branch/master"><img src="https://ci.appveyor.com/api/projects/status/8n38o44k585hhvhd/branch/master?svg=true" alt="Windows Build Status"></a>
    <a href="https://codecov.io/gh/facebook/jest"><img src="https://codecov.io/gh/facebook/jest/branch/master/graph/badge.svg" alt="Codecov badge"></a>
        <a href="http://badge.fury.io/js/jest"><img src="https://badge.fury.io/js/jest.svg" alt="npm version"></a>
## Usage
**Clone the repo**
```
git clone https://github.com/hungtrn75/advanced-node.git
```

**Install dependencies**
```
npm i
```
or with [yarn](https://yarnpkg.com/), which I highly recommend
```
yarn install
```

**Important**

Before run server, we start a redis-server to cache store
```
redis-server
```

**Run project**

Start project
```
yarn start
```
Run client
```
yarn client
```
URL endpoint: `localhost:3000`.

Run server
```
yarn server
```
URL endpoint: `localhost:5000`.

Or run both in dev mode
```
yarn dev
```

**Build project**
```
yarn build
```
Heroku deploy
```
yarn heroku-postbuild
```

**Run test**
```
yarn test
```


