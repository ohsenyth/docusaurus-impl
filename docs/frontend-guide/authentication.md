---
id: authentication
title: Authentication Module
---

The Authentication Module 

## Module Structure

This is the structure and files of the message card module.

```bash
auth                        # folder of authentication module
├── auth.guard.ts           # authentication guard for the routes
├── auth.interceptor.ts     # interceptor for the requests
└── auth.service.ts         # authentication service for login
```

This module has no view since it acts as a helper function to aid with logging in and detecting any unauthorized access from users.

## Route Guard
Angular’s route guards are interfaces which can tell the router whether or not it should allow navigation to a requested route. They make this decision by looking for a true or false return value from a class which implements the given guard interface.

#### **`canActivate()`**
When a user visits a protected route, thisfunction will be triggered and this will determine whether the user can access the said route or not. If he cannot access, he will be directed to the login page.

Here is a snippet of the codes from the routing module and from the `canActivate()` function in `auth.guard.ts` file.

<!--DOCUSAURUS_CODE_TABS-->
<!--app-routing.module.ts-->
```ts
import { AuthGuard } from './core/services/auth/auth.guard';

const routes: Routes = [
  {
    path: 'schedule',
    loadChildren: './modules/schedule/schedule.module#ScheduleModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'message-card',
    loadChildren: './modules/message-card/message-card.module#MessageCardModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: './modules/login/login.module#LoginModule'
  },
  {
    path: '**',
    redirectTo: '/schedule',
    canActivate: [AuthGuard]
  }
];
```
<!--auth.guard.ts-->
```ts
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

When you open the actual `app-routing.module.ts` file, you will notice that only the login and welcome screen pages are not unprotected. This is because the users don't need to login to the system in order to access these pages.

The Route Guard is added in the providers section of the `app.module.ts` file.

## JWT Interceptor

The JWT Interceptor intercepts http requests from the application to add a JWT auth token to the Authorization header if the user is logged in.

It's implemented using the HttpInterceptor class that was introduced in Angular 4.3 as part of the new HttpClientModule. By extending the HttpInterceptor class we can create a custom interceptor to modify http requests before they get sent to the server.

Http interceptors are added to the request pipeline in the providers section of the app.module.ts file.

Here's a snippet from `app.module.ts`.

```ts
providers: [
    AuthService,
    AuthGuard,
    CookieService,
    ScheduleService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    TitleCasePipe,
    WindowScrolling
]
```

#### **`intercept()`**
This function clones the request then add the necessary token and headers before it will send the request to the backend. The token is needed by backend in order for it to verify that the request is valid. In the instance that the request body type is a video (when the user uploads a video), the content type of application/json is added to the header.

In the event that the request is from an unauthorized user or if the token is already expired, the user will be redirected to the login page.

```ts 
intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig = {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
    };

    if (request.body && request.body.type === 'video/mp4') {
    headersConfig['Content-Type'] = 'video/mp4';
    } else if (request.url.includes('/font/add')) {
    // do nothing
    } else {
    headersConfig['Content-Type'] = 'application/json';
    }

const token = this.auth.getToken();

if (token && headersConfig['Content-Type'] !== 'video/mp4') {
    headersConfig['Authorization'] =  `${token}`;
}

request = request.clone({ setHeaders: headersConfig });

return next.handle(request)
    .pipe(
        tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
            // successful request
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                switch (err.status) {
                    case 401: {
                        if (this.router.url !== '/login') {
                            // unauthorized
                            this.router.navigate(['/login']);
                        }
                        break;
                    }
                    case 403: {
                        // expired token
                        this.router.navigate(['/login']);
                        break;
                    }
                }
            }
        })
    );
}
```

## Authentication Service

The JWT authentication service is used to login and logout of the application, to login it posts the users credentials to the api and checks the response for a JWT token, if there is one it means authentication was successful so the user details are added to local storage with the token. The token is used by the JWT interceptor above to set the authorization header of http requests made to secure api endpoints.

The logged in user details are stored in local storage so the user will stay logged in if they refresh the browser and also between browser sessions until they logout. If you don't want the user to stay logged in between refreshes or sessions the behaviour could easily be changed by storing user details somewhere less persistent such as session storage or in a property of the authentication service.

The `angular2-jwt` npm package is used in this service. You can install this by typing in the terminal `npm install angular2-jwt --save` if it is not already installed yet.

#### **`getToken()`**
Gets the token from local storage. This is needed later on to verify if user's token has not expired which determines if user can access the system.

#### **`login()`**
This function needs 2 parameters: the staff ID and the password, which will be sent to backend. Backend will return the token if authentication is successful and an error message if authentication failed.

#### **`logout()`**
This action logs the user out of the system and removes the token in the local storage..

#### **`isLogggedIn()`**
This function returns a boolean if the user is currently logged in or not.