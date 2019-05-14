---
id: preview
title: Preview Functionality
---

This functionality lets the user see how the welcome screen will display during the display time of the schedule being previewed. This also lets the user see the changes they've made and how it will look in on the screen.

This functionality is connected to both the Schedule Form and Welcome Screen.

Similar to the actual welcome screen, each office has its own designated link for its preview. Refer to the table below.
| Office | Link |
| ----------- | ----------- |
| Annex | http://18.182.27.53:3000/#/welcome-screen/preview/office/annex |
| Hanare | http://18.182.27.53:3000/#/welcome-screen/preview/office/annex |
| Sapporo | http://18.182.27.53:3000/#/welcome-screen/preview/office/sapporo |
| Fukuoka | http://18.182.27.53:3000/#/welcome-screen/preview/office/fukuoka |
| Main Office Screen 1 | http://18.182.27.53:3000/#/welcome-screen/preview/office/main_office_1 |
| Main Office Screen 2 | http://18.182.27.53:3000/#/welcome-screen/preview/office/main_office_2 |

## Overview and Requirements
1. Only schedules from Google Calendar can be previewed.
2. Both registered and unregistered schedules can be previewed.
3. If user clicks the "Preview" button from the Schedule Form, a new tab in the browser will open and the welcome screen will be displayed to the user including the schedule being previewed.
4. Frontend will send a request to backend with the current schedule as the parameter to get the list of schedules to be displayed during the display time of the schedule being previewed.
5. When backend sends a response, frontend will then open a new tab that will display the list of schedules. How the schedules will be displayed in preview is exactly the same how they will be displayed in the actual welcome screen.
6. Unlike the actual welcome screen, this does not refresh every minute.

Here is a snippet of the code from `openPreview()` function in `schedule=-form.component.ts`.

```ts
openPreview(data: any): void {
    const index = data.schedules.findIndex(schedule => schedule.eventId === this.schedule.eventId);
    if (this.schedule.base64 && this.schedule.base64 !== '') {
      data.schedules[index].img = this.schedule.base64;
    }
    localStorage.setItem('dataSource', JSON.stringify(data));
    window.open(`${environment.app_url}/#/welcome-screen/preview/office/${data.office}`, '_blank');
}
```

The schedules to be displayed, including the schedule being previewed, are stored in the local storage, to be used later for the welcome screen.

As stated in the [Welcome Screen](frontend-guide/welcome-screen.md) guide, the welcome screen will determine the mode/environment upon initialization. This is the code in the `ngOnInit()` lifecycle.

```ts
ngOnInit() {
    const split = this.router.url.split('/');
    this.office = split[split.length - 1];
    this.getSettings();
    this.officeEvent.emit(this.office);
    this.environment = this.route.snapshot.data['environment'];

    if (this.environment === 'preview') {
      this.setPreviewScheduleData();
    } else {
      this.displayCurrentScreen();
    }
}
```

This means that if `'preview'` is in the URL, the welcome screen will get the schedules from the local storage, whereas if it's an actual welcome screen, it will send a request to backend to get the current schedules.

After displaying the schedules, the data in local storage will be deleted.