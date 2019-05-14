---
id: install-angular
title: Install Angular and Dependencies
sidebar_label: Install Angular
---

## Prerequisites

### Node.js
Angular requires Node.js version 8.x or 10.x.

To check your version, run node -v in a terminal/console window.

To get Node.js, go to [nodejs.org](nodejs.org).

### npm package manager

Angular, the Angular CLI, and Angular apps depend on features and functionality provided by libraries that are available as [npm packages](https://docs.npmjs.com/getting-started/what-is-npm). To download and install npm packages, you must have an npm package manager.

To check that you have the npm client installed, run `npm -v` in a terminal/console window.

## Procedure

### Step 1: Install the Angular CLI

You use the Angular CLI to create projects, generate application and library code, and perform a variety of ongoing development tasks such as testing, bundling, and deployment.

Install the Angular CLI globally.

To install the CLI using `npm`, open a terminal/console window and enter the following command:

```bash
npm install -g @angular/cli
```

### Step 2: Create a workspace and initial application (Optional)

> **Note:** Only perform this step if you are creating a new project. Otherwise, skip to Step 3.

To create a new workspace and initial app project:

Run the CLI command ng new and provide the name my-app, as shown here:

```bash
ng new my-app
```

The ng new command prompts you for information about features to include in the initial app project. Accept the defaults by pressing the Enter or Return key.

The Angular CLI installs the necessary Angular npm packages and other dependencies. This can take a few minutes.

If you executed this step, skip to Step 6.

### Step 3: Pull the files from git

If you are setting up an existing project, like the Omotenashi system, create a folder where you want to store all the project files. Navigate to that folder and clone the files for FrontEnd.

```git
git clone <link of the repository>
```

### Step 4: Install the depenendencies

Since the project is already existing, there are already dependencies needed in order for the application to run. Type `npm install` in the terminal to install all the dependencies. It may take a while to finish installing everything.

### Step 5: Install Angular Material

For this system, we are using Angular Material as our frontend web development framework. You can iuse npm command-line tool to install packages.

```bash
npm install --save @angular/material @angular/cdk @angular/animations
```

#### Alternative: Angular Devkit 6+

Using the Angular CLI ng add command will update your Angular project with the correct dependencies, perform configuration changes and execute initialization code.

```bash
ng add @angular/material
```

Go to [material.angular.io](https://material.angular.io/guide/getting-started) for a detailed installation details on Angular Material where you can also find its documentation and guides.

### Step 6: Serve the application

Go to the FrontEnd folder and launch the server by using the CLI command `ng serve --aot`. The default port would be 4200. Open your browser to http://localhost:4200/#/.

