---
id: loading
title: Loading Component
---

The Loading component is the spinner being displayed while frontend is waiting for the request in backend to be finished. This lets the user know that the application is responding to their action and is still waiting completion.

## Component Structure

This is the structure and files of the loading component.

```bash
core                              # folder of all components in core module
└── loading                       # parent folder of the component
    ├── loading.component.html    # view of loading component
    ├── loading.component.css     # the component's private style
    └── loading.directive.ts      # the components's directive
```

The `<app-loading>` selector is called from `app.component.html` file. This also has a service called `loading.service.ts` located in `core/services`.

## Functionality

Unrelated components in Angular can share data via a service. Whenever a request is made to backend, frontend calls `show()` function in `loading.service.ts` file, as shown in the snipped below. This function shows the loading view to the user.

```ts
this.loadingService.show({mode: LoadingMode.indeterminate });
this.settingsService.updateSettings({meetingCardText: this.meetingText, recordingCardText: this.recordingText})
.subscribe(
    (res: APIResponse) => {
    if (res.success) {
        alert(res.message);
        this.router.navigate(['/settings']);
    }
    this.loadingService.hide();
    }
);
```

Below is the process of the loading mechanism from default-values.component.ts and how it is connected to the loading service and eventually to the loading view itself.

<!--DOCUSAURUS_CODE_TABS-->
<!--default-values.component.ts-->
```ts
this.loadingService.show({mode: LoadingMode.indeterminate });
    this.settingsService.updateSettings({meetingCardText: this.meetingText, recordingCardText: this.recordingText})
    .subscribe(
      (res: APIResponse) => {
        if (res.success) {
          alert(res.message);
          this.router.navigate(['/settings']);
        }
        this.loadingService.hide();
    }
);
```
<!--loading.service.ts-->
```ts
show(options?: { mode: LoadingMode }) {
    // configure the loading
    this.mode = options.mode || LoadingMode.indeterminate;

    this.showLoading = true;
}
```
<!--loading.component.html-->
```html
<div id="loading-wrapper" *ngIf="loadingService.showLoading">
    <mat-spinner
      [mode]="mode"
      value="50">
    </mat-spinner>
    <p class="mat-body-1">読み込み中</p>
</div>
```
<!--END_DOCUSAURUS_CODE_TABS-->

As seen in the `loading.component.html`, it uses the `showLoading` property in `loading.service.ts` to determine if the loading view should be displayed or not.

After the request is completed, the loading view is hidden.