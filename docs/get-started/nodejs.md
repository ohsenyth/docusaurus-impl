---
id: nodejs
title: NodeJS and ExpressJS
sidebar_label: ExpressJS Guide
---

## What is nodeJS?

Node.js is a platform built on Chrome's JavaScript runtime for easily building fast and scalable network applications. It uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices. 

In layman's term it is the one responsible for running the javascript outside the browser. 

### NodeJS installation
Go to [nodeJS website](https://nodejs.org/en/) then download the latest version. Double click the installer after downloading then just follow the installation wizard to complete it. Done! 


## What is expressJS?

Express.js is a framework used for Node and it is most commonly used as a web application for nodejs. It is just a module framework for Node that you can use for applications that are based on server/s that will "listen" for any input/connection requests from clients.


## Basic usage
The following code:
- import express module and create an express instance.
- create a route that will response 'Hello World!' text.
- listen to port 3000

```
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
```

## Running the app

Save the code in a file named app.js, then run it by typing:```node app``` in the terminal. Open the browser then go to ```localhost:3000```. If everything is okay, you should see 'Hello World!' in the browser.

> __*Note:*__ Make sure that you already installed express for it to work. Please see the [Install Node Dependencies](../installation/install-dependencies)

For more details about expressJs, please visit their [website](https://expressjs.com/).