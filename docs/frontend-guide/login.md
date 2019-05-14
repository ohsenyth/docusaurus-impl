---
id: login
title: Login Module
---

The Login Module is responsible for letting the user log into the system.

## Module Structure

This is the structure and files of the login module.

```bash
modules                             # parent folder of all modules
└── login                           # folder of login module
    ├── login-routing.module.ts     # routing module for login
    ├── login.component.html        # component's view
    ├── login.component.scss        # component's private stylesheet
    ├── login.component.ts          # the component's logic
    └── login.module.ts             # contains the imports and declarations
```

This module uses `auth.service.ts` in the `core/services/auth` folder to communicate with backend.

## Technical Overview
If the user is not logged in and will access any page in the system that is not the welcome screen, they will be redirected to the login page where they will select their name from the list of employees fetched from GMS and input their password.

The login button will only be enabled if the user has already inputted their username and password since these 2 fields are required.

The navigation of the system is not displayed if the user is in the login page.

#### **`getStaffSuggestions()`**
This uses the `search.service.ts` in order to send the request to backend and assigns the list of suggestions to be displayed to the user.

#### **`onInputSearchHandler()`**
This function will be invoked when user types on the username field. It will then trim the keyword inputted and calls the `getStaffSuggestions()` function.

#### **`onSelectSuggestion()`**
When user selects a suggestion, this function stores that staff's ID to its property, which will be used during login request.

#### **`login()`**
This function will be invoked when user clicks the Login button. It calls the `login()` function from `auth.service.ts` and if the credentials are valid, the user will be redirected to the Schedule page. The needed parameters are the staff ID and password.