---
id: install-dependencies
title: Install Node Dependencies
sidebar_label: Install Node Dependencies
---

**NPM** stands for node package manager is use to download node dependencies of the application. It is automatically installed when you install nodejs. All the dependencies of the app is listed in package.json. 

## Package.json
**Package.json** is a file that holds the details about the app. The most important part here is the dependencies since it holds the list of all the dependencies and their respective versions that the app requries. With package json, there is no need to include the node-modules in your git repository. 

Below is the sample format of package.json.
```
{
  "name": "omotenashi_backend",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "start": "nodemon app.js"
  },
  "repository": {
    "type": "git",
    "url": "https://gangle.backlog.jp/git/OMOTENASHI/BackEnd.git"
  },
  "author": "Eve Anthony Rondina",
  "license": "ISC",
  "dependencies": {
    "bluebird": "^3.5.3",
    "body-parser": "^1.18.3",
    "express": "^4.16.4"
  },
  "devDependencies": {
    "eslint": "^5.8.0"
  }
}

```

## Installing dependencies and packages

To install node dependencies, use the following commands: 

- ```npm install``` to install the dependencies that are already listed in package.json.
- ```npm install <package_name> --save``` to install the dependency and add it to package.json.
- ```npm install <package_name> -g``` to install it globally.



