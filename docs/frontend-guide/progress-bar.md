---
id: progress-bar
title: Progress Bar Component
---

The Progress Bar component is the view being shown to the user when they upload a video. Since videos take longer to upload, this component informs the user how many percent of the file has been uploaded to the server. This is to let them know that the application is doing something and is not frozen. 

## Component Structure

This is the structure and files of the progress bar component.

```bash
core                                   # folder of all components in core module
└── progress-bar                       # parent folder of the component
    ├── progress-bar.component.html    # view of progress bar component
    ├── progress-bar.component.css     # the component's private style
    └── progress-bar.directive.ts      # the components's directive
```

The `<app-progress-bar>` selector is called from `app.component.html` file. This also has a service called `file.service.ts` located in `core/services`.

## Functionality

This has the same functionality, concept and usage with [loading component](frontend-guide/loading.md), only that this component is used for displaying the progress to the user whenever they upload a video. This is a snippet of the code from `background-and-font.component.ts` when a user uploads a video:

```ts
this.fileService.getPresignedURL(type).subscribe(res => {
    if (res.success) {
    const URL = res.data;
    // once the presigned url is received the next service call will upload the file.
    this.fileService.uploadFileAWSS3(URL, 'video/mp4', this.backgroundFile)
        .subscribe(res2 => {
        if (res2 && res2.status === 200 && res2.statusText === 'OK') {
            const video = res2.url.split('?');

            this.videoURL = video[0];
            newBG.link = this.videoURL;

            this.settingsService.addBackground(newBG).subscribe(
            res3 => {
                if (res3.status === 200) {
                alert(res3.message);
                this.router.navigate(['/settings']);

                if (this.uploadProgress === 100) {
                    this.progressService.hide();
                    this.uploadProgress = 0;
                    this.progressService.setProgress(this.uploadProgress);
                }
                }
            });

        } else if (res2 && res2.type === 1 && res2.loaded && res2.total) {
            this.uploadProgress = (res2.loaded / res2.total) * 100;
            this.uploadProgress = Math.floor(this.uploadProgress);
            this.progressService.show();
            if (this.uploadProgress % 5 === 0) {
            this.progressService.setProgress(this.uploadProgress);
            }
        }
        });
    }
});
```

The `uploadFileAWSS3()` in `file.service.ts` uses the `aws-s3` npm package to aid in uploading the video to AWS service. This function reports back to its caller, informing it of the progress. The progress is then passed to the `progress.service.ts` using the `setProgress()` function. This function stores the value to its own property, which the `progress-bar.component.html` uses in order to render the display for the progress bar.

When the progress already reached 100%, the progress bar will then be hidden.

Snippet from `progress-bar.component.html`:

```html
<div id="loading-wrapper" *ngIf="progressService.showProgress">
    <mat-progress-bar mode="determinate" [value]="progressService.uploadProgress" class="progress"></mat-progress-bar>
    <p class="mat-body-1">Uploading video file... Please wait...</p>
</div>
```