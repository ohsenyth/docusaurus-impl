---
id: angular
title: How Angular Works
sidebar_label: Angular Guide
---

## What is Angular

Angular is a platform that makes it easy to build applications with the web. Angular combines declarative templates, dependency injection, end to end tooling, and integrated best practices to solve development challenges. Angular empowers developers to build applications that live on the web, mobile, or the desktop.

#### Basically, it is:

- Written in HTML and TypeScript
- Organized front-end structure (Components, Modules, Services)
- All-in-one solution (HTTP, RxJS/Observables)
- MVC - Model, View, Controller design pattern (backend pattern but adapted)
- Has a command line interface
- Javascript Fundamentals (Objects, Arrays, Conditionals)

## What is TypeScript

TypeScript is an open-source programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript, and adds optional static typing to the language.

TypeScript is designed for development of large applications and transcompiles to JavaScript. As TypeScript is a superset of JavaScript, existing JavaScript programs are also valid TypeScript programs. TypeScript may be used to develop JavaScript applications for both client-side and server-side (Node.js) execution.

## Basic Building Blocks

The basic building blocks of an Angular application are NgModules. An Angular app is defined by a set of NgModules. An app always has at least a root module that enables bootstrapping, and typically has many more feature modules. 

### Modules

An NgModule declares a compilation context for a set of components that is dedicated to an application domain, a workflow, or a closely related set of capabilities. An NgModule can associate its components with related code, such as services, to form functional units.

Every Angular app has a root module, conventionally named AppModule, which provides the bootstrap mechanism that launches the application. An app typically contains many functional modules.

You can generate a module by running `ng g module <path>/<name-of-module>`. For example: `ng g modules/schedule`. This will create a `schedule` folder under `modules` folder, along with `schedule.module.ts`.

### Components

Every Angular application has at least one component, the root component that connects a component hierarchy with the page document object model (DOM). Each component defines a class that contains application data and logic, and is associated with an HTML template that defines a view to be displayed in a target environment.

you can generate a component by running `ng g component <path>/<name-of-module>`. For example: `ng g component schedule/components/schedule-form`. This will create a schedule-form folder under `schedule/components` folder.

Each component will have a:
- `.ts` file - this contains the logic of the component
- `.html` file - template of the component
- `.css` file - stylesheet of the template

If you want to use SASS, you can rename the file from .css to .scss and point the styleUrls to the correct stylesheet filename in .ts file, such as:

```ts
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
```

Go to [angular.io](https://angular.io/guide/quickstart) for a detailed documentation and guide.