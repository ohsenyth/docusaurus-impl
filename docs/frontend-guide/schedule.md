---
id: schedule
title: Schedule Module
---

The Schedule Module displays all schedules from the database, as well as from Google Calendar and Agenda system. The user can select the date and office in order to filter the results. This has pagination which defaults to 30 items page. The user can also register or update a schedule. Each schedule will be displayed in the [Welcome Screen](frontend-guide/welcome-screen.md), depending on the display time.

## Module Structure

This is the structure and files of the schedule module.

```bash
modules                                     # parent folder of all modules
└── schedule                                # folder of schedule module
    ├── components                          # parent folder of all components
    │   ├── schedule-filter                 # folder of schedule filter component
    │   ├── schedule-form                   # folder of schedule form component
    │   ├── schedules-list                  # folder of schedules list component
    │   └── upload-photo                    # folder of upload photo component
    ├── pages                               # parent folder of the entry point
    │   └── schedule                        # folder of schedule component
    │       ├── schedule.component.html     # entry point of the schedule component
    │       ├── schedule.component.scss     # the component's private style
    │       └── schedule.component.ts       # the components's logic
    ├── schedule-routing.module.ts          # the routes related to the module
    └── schedule.module.ts                  # contains the imports and declarations
```

This module uses `schedule.service.ts` in the `core/services` folder to communicate with backend as well as `schedule.ts` located in `core/models` for its model.

## Overview and Requirements

These are the following details that will be displayed in the [Welcome Screen](frontend-guide/welcome-screen.md):
1. Client Name
2. Visitor Name
3. Room Name

One schedule can have multiple clients and visitors.

There 2 origins of schedules: 
1. Agenda
2. Google Calendar

All schedules from Agenda can only be viewed. When user clicks the "Edit" button, they will be redirected to the Agenda system, where they can make the changes.

There are 2 types of schedules from Google Calendar:
1. **Registered** - all registered schedules will have a white background
2. **Unregistered** - all unregistered schedules will have a gray background

## Components

The Schedule module is composed of 4 components:
1. Schedule Filter
2. Schedules List
3. Schedule Form
4. Upload Photo

### Schedule Filter

Schedule Filter is a sibling component of Schedules List. Every time the user clicks the "Filter" button, this component emits to the schedules list, which listens to changes and updates the view if there is any change.

### Schedules List

This is the main component of the module. This component displays all schedules received from backend, sorted by time. The default selected date is the current date. When user hovers over each item in the list, the remarks of the schedule will be displayed as a MatToolTip.

#### Technical Overview
During the initialization of the component, the `queryParamsHandler()` function will be called. A request will be sent to backend with the corresponding parameters. While waiting for the response, a loading service will be shown and will be hidden after the response is received. 

All schedules from Google Calendar can be updated. Everytime a schedule is registered or updated, the schedules list will be refreshed. 

```ts
this.subscription = this.scheduleService.reloadSchedule().subscribe(change => {
  if (change) {
    this.getSchedules({
      date: this.date.format('YYYY-MM-DD'),
      timezone: this.timezone,
      page: this.pageIndex,
      limit: this.pageSize,
      office: this.office
    });
  }
});
```

Here is a snippet of code from `schedule.service.ts` which sends the request to backend and returns the response to the caller.
```ts 
getSchedules(params: any): Observable<APIResponse> {
  let httpParams = new HttpParams;

  if (params) {
    httpParams = httpParams.append('date', params['date'] ? params['date'].toString() : '');
    httpParams = httpParams.append('timezone',  params['timezone'] ? params['timezone'].toString() : '');
    httpParams = httpParams.append('page', params['page'] ? params['page'].toString() : '');
    httpParams = httpParams.append('limit',  params['page'] ? params['limit'].toString() : '');
    httpParams = httpParams.append('office',  params['office'] ? params['office'] : 'all');
  }

  return this.api.get(`/schedule/getSchedules`, httpParams);
}
```

The Schedule List component has a pagination to make browsing easier for the user according to their needs. When the user makes any changes to the pagination, the `onPaginateChange()` function will be called, which will navigate back to the schedule list with the additional parameters in the URL.

```ts
onPaginateChange(event: PageEvent) {
  const navigationExtras: NavigationExtras = {
    queryParams: {
        page: event.pageIndex + 1,
        limit: event.pageSize
    },
    queryParamsHandling: 'merge'
  };

  this.router.navigate(['/schedule'], navigationExtras);
}
```

When the "Edit" button is clicked, the schedule form will be opened.

### Schedule Form
The Schedule Form is a modal that lets the user provide information about the schedule and saves this to the database. Open opening the form, there are several read-only fields, which are fetched from backend.

There are only 2 required fields in the form:
1. Charge Staff
2. Client

The following fields are disabled because users are not allowed to modify them:
1. Schedule Name - name of the schedule
2. Schedule Date - date of the schedule
3. Room Name - room where the schedule will be held
4. Schedule Time - time of the schedule
5. Display Time - time when the schedule will be displayed in the Welcome Screen

#### Component Flow 
1. When the schedule form opens with the data sent by the schedule list containing the schedule name, date, schedule time, display time and room.
2. `createForm()` function is called, which creates the form with the following fields: charge staff, array of client and remarks. There is a button to add and remove client and another button that lets the user to add an image to be displayed instead of the client names and persons. 
3. When the user types on the client name, the `getClientSuggestions()` function is called. This function sends request to backend and returns the response to the caller, displaying the results in a list.
4. When user selects a client name from the suggestion list, the `onSelectClientSuggestions()` function is called. The parameters are the client name and logo. The schedule object will then be updated.
5. When the user types on the charge staff, the `getStaffSuggestions()` function is called. This function sends request to backend and returns the response to the caller, displaying the results in a list.
6. When user selects a staff name from the suggestion list, the `onSelectSuggestions()` is called with the staff name as the parameter called and the selected staff object will then be updated.
7. When the user clicks outside the suggestion list, it will be hidden via `hideSuggestions()` function.
8. When user clicks on the "Add Client" button, the `addClient()` function will be called with the client name as the parameter. The schedule object will then be updated. The `calculateTotalVisitors()` function will be called.
9. When user clicks on the "x" button in the Client Area of the form, the `removeClient()` function will be called with the index number as the parameter. The schedule object will then be updated. The `calculateTotalVisitors()` function will be called.
10. When user adds a person, the `addPerson()` function will be called with the event and index number as the parameters. The schedule object will then be updated. The `calculateTotalVisitors()` function will be called.
11. When user removes a person, the `removePerson()` function will be called with the person name and index number as the parameters. The schedule object will then be updated. The `calculateTotalVisitors()` function will be called.
12. When user clicks either the "Register" or "Update" button, the `save()` function will be called which then calls the `registerSchedule()` function in `schedule.service.ts` to register the schedule if the action is register, and will call the `updateSchedule()` function if it is an update.

### Upload Photo
The purpose of this component is to let the user upload an image that will be displayed in the welcome screen instead of the list of client names and persons. As a general rule, if the total number of clients and persons exceed 4, then a display image is recommended.

When user clicks the "Remove Another" button, the image if there is any to be uploaded will be removed and the section will be hidden.

#### Technical Overview
The Upload Photo component is a child component of the Schedule Form. Here is the snippet from `schedule-form.component.html`. 

```html
<app-upload-photo [image]="schedule.img"></app-upload-photo>
```

The Upload Photo component utilizes the helper Drag and Drop component.

```html
<div class="custom-visitors">
  <app-drag-and-drop (droppedFile)="onDropBackground($event)"
                      (uploadedFile)="onImageChanged($event)"
                      [file]="file" [validFile]="validFile" [fileType]="fileType" [component]="component">
  </app-drag-and-drop>
  <div class="preview-photo">
    <h4>Preview</h4>
    <div class="photo-wrapper">
      <img [src]="photoURL" *ngIf="photoURL" class="photo"/>
    </div>
  </div>
</div>
```

#### Component Flow
1. When user clicks the "Add Another" button, the section for uploading an image will be displayed. 
2. The Upload Photo component receives the image as in input from schedule form if the schedule being updated is already registered and has an image.
3. If there is a file being emitted from the helper component, the `processFile()` function will be called. This function will perform the necessary checking before converting the file to base64.