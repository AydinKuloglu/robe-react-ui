# Robe-React-Commons

#### Commons library for react projects.

[![Build Status](https://travis-ci.org/robeio/robe-react-commons.svg?branch=master)](https://travis-ci.org/robeio/robe-react-commons)
[![Docs Coverage](https://doc.esdoc.org/github.com/robeio/robe-react-commons/badge.svg)](https://doc.esdoc.org/github.com/robeio/robe-react-commons)
[![codecov](https://codecov.io/gh/robeio/robe-react-commons/branch/master/graph/badge.svg)](https://codecov.io/gh/robeio/robe-react-commons)


RRC = Robe-React-UI

##### Motivation

UI components built on top of [React-Bootstrap](https://react-bootstrap.github.io/) for robe react projects 

##### What's inside
* [Webpack](https://webpack.github.io/) for all development (server,hotload etc.) and build (package, optimize, etc.) needs.
* [Babel](https://babeljs.io/flow) for writing codes with ES6 syntax and transpiling them browser compatible codes. 
* [ESLint](http://eslint.org/) for protecting our nice formatted codes.
* [Karma](https://karma-runner.github.io/0.13/index.html) for testing.
* [React](https://facebook.github.io/react/) for ui.
* [React-Bootstrap](https://react-bootstrap.github.io/) for ui components

### Quick Start


#### 1. Get the latest version
You can start by cloning the latest version of RES.

#### 2. Run `npm install`
This will install both run-time project dependencies and developer tools listed
in [package.json](./package.json) file.

#### 3. How to start project in Development Mode

```shell
$ npm start
```
  
Open Browser and enter `http:/localhost:8080` (default) 

### How to Build for Production

If you need just to build the app (without running a dev server), simply run:

```shell
$ npm run-script build
```
 
#####  How to run Unit Tests.

```shell
$ npm test              # Run unit tests with Mocha
```