---
id: structure
title: Front-End Structure & Overview
sidebar_label: Structure & Overview
---

This is the file structure of the frontend tier and what each folder contains.

```bash
src
├── app                     # the application starts here
│   ├── core                # core module of the application
│   │   ├── footer          # component for the footer
│   │   ├── header          # component for the navigation
│   │   ├── loading         # loading component
│   │   ├── models          # all models used in the application
│   │   ├── progress-bar    # helper component
│   │   └── services        # used to send requests to backend
│   ├── modules             # parent folder of all the feature modules
│   ├── shared              # common components shared throughout the application 
│   ├── app.component.html  # the component template, written in HTML
│   ├── app.component.css   # the component's private CSS styles
│   ├── app.component.ts    # the component class code, written in TypeScript
│   └── app.module.ts       # root module of the application
├── assets                  # images used by the application
├── environments            # URLs of the development and production environments
├── sass                    # contains all the .scss files
├── index.html              # root page of the application
├── angular.json            # provides project-specific configuration defaults
└── package.json            # npm package dependencies used by the application
```

Each feature in the system has a module to organize code specific only for that feature.

The system has 3 main folders:
- `core` - all the services and models are stored here
- `modules` - parent folder of the modules
- `shared` - all Angular Material modules used in the system are imported here, as well as all common components

## Naming Standards

All modules are inside the modules folder. There are components contained in each module. This is the structure of each module:

```bash
modules                         # parent folder of all modules
└── schedule                    # folder of schedule module
    └── components              # parent folder of all components of schedule module
        ├── schedule-filter     # folder of schedule filter component
        ├── schedule-form       # folder of schedule form component
        ├── schedules-list      # folder of schedules list component
        └── upload-photo        # folder of upload photo component
```

The modules are suffixed by `.modules.ts`, while the components are suffixed by `.component.ts`. The same applies to services and models, suffixed by `.service.ts` and `.model.ts` respectively.

The app uses lazy loading, therefore all modules have separate routing modules that defines the path and its component.

## Application Entry Point

The application starts at `index.html` which calls the application's root component, named AppComponent. The view associated with this root component becomes the root of the view hierarchy as you add components and services to your app. Here is a snippet of `app.component.html`.

```html
<app-header *ngIf="showHeader"></app-header>
<div class="app-content" [class.full-height]="!showHeader"  [class.full-width]="!showHeader">
    <router-outlet></router-outlet>
</div>

<app-loading></app-loading>
<app-progress-bar></app-progress-bar>
```

## Lazy Loading

Each feature module acts as a doorway via the router. In the AppRoutingModule, the routes are configured to the feature modules so the router knows which feature module to go to. After which, the feature module then connects the AppRoutingModule to its own routing module, which then tell the router where to go to load the relevant components.

Here is a snippet of app-routing.module.ts (AppRoutingModule).
```ts 
const routes: Routes = [
  {
    path: 'schedule',
    loadChildren: './modules/schedule/schedule.module#ScheduleModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    loadChildren: './modules/settings/settings.module#SettingsModule',
    canActivate: [AuthGuard]
  },
```



## Modules

The application has 6 modules:

1. Login Module
2. Schedule Module
3. Message Card Module
4. Welcome Screen Module
5. Settings Module
6. Authentication Module

It has the following helper components that are shared throughout the application:
- Drag and Drop Component
- Loading Component
- Progress Bar Component
- Date Picker Component

See next sections for a detailed explanation for each module.