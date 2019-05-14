---
id: settings
title: Settings Module
---

The Settings Module is where the user can change the settings of the welcome screen and message card. They can also upload images and/or videos as background, as well as font styles to be used by the forementioned features.

## Module Structure

This is the structure and files of the settings module.

```bash
modules                                     # parent folder of all modules
└── settings                                # folder of message card module
    ├── components                          # parent folder of all components
    │   ├── background-and-font             # folder of control settings component
    │   ├── default-values                  # folder of filter component
    │   ├── screen-and-card                 # folder of message card list component
    ├── pages                               # parent folder of the entry point
    │   └── settings                        # folder of schedule component
    │       ├── settings.component.html     # entry point of the schedule component
    │       ├── settings.component.scss     # the component's private style
    │       └── settings.component.ts       # the components's logic
    ├── settings-routing.module.ts          # the routes related to the module
    └── settings.module.ts                  # contains the imports and declarations
```

This module uses the following services in the `core/services` folder to communicate with backend:
- `file.service.ts`
- `progress.service.ts`
- `settings.service.ts`

## Components

The Schedule module is composed of 3 components:
1. Screen and Card
2. Default Values
3. Background and Font

### Screen and Card
When the user first visits the page, this component will be displayed by default. In this page, the user can change the settngs for the Welcome Screen and Message Card.

For the Welcome Screen, they can change the following:
- Background
- Font
- Color
- Logo

For the Message Card, they can change the following:
- Background
- Font
- Color

#### Technical Overview

#### **`getSettings()`**
Upon initialization of the component, this function will be called, which uses the `settings service` which will return the data. After which, the form fields will be populated with the data from the database. The data that will be returned from this function are those selected configuration for each meeting room.

#### **`getFonts()`**
This function will return the list of fonts available to the user. This list is shared by both welcome screen and message card.

#### **`getBackgrounds()`**
This function will return the list of backgrounds uploaded to the server. There are 2 lists of backgrounds, one each for the welcome screen and message card.

#### **`getLogos()`**
This function will return the list of logos available to the user. This list is only used by the welcome screen.

#### **`updateSettings()`**
This function is responsible for sending the request to backend to update the settings based on the current selection of the user.

### Default Values
The Default Values component is where the user can change the text for Type Recording and Type Meeting. If the schedule is from Agenda, the default text that will be displayed is from Type Recording, whereas if the schedule is from Google Calendar, the default text that will be displayed is from Type Meeting.

Default Text 2 field has a [Staff name] tag which will be replaced with the actual staff in charge of the schedule.

#### Technical Overview
Upon intialization of the component, the `getSettings()` function from `settings.service.ts` is called in order to get the default text for meeting and recording. After which, the `createForm()` function is called.

#### **`createForm()`**
This creates and populates the form, using Reactive Form and Form Builder. This is also responsible for setting the validations since all fields in the form are required. If there is a field that is empty, an error message will be displayed.

#### **`updateDefaultValues()`**
This function is invoked when the user clicks the "Update" button. It uses the `updateSettings()` function in `settings.service.ts` to send the updated data to backend. If the form is not valid, the user will not be able to click the button. 

### Background and Font
This component handles all the upload functionalities for adding the welcome screen background, message card background and fonts. This component utilizes the Drag and Drop component that will handle the system's upload functionality.

There are 3 types of uploads:
- images (shared by both the welcome screen and message card)
- videos (only for the welcome screen) - if a video is uploaded 
- fonts (shared by both the welcome screen and message card) - the fonts uploaded 

#### Image Upload ####
If user uploads an image, this image will be available for both the welcome screen and message card. The system accepts only .jpg and .png. For Welcome Screen, the file size limit is 50MB. For Message Card, the limit is 10MB.

#### Video Upload ####
If the user uploads a video, the `getPresignedURL()` function from `file.service.ts`. When backend returns the valid pre-signed URL, frontend will then upload the file directly to AWS S3 and the [progress bar](frontend-guide/progress-bar.md) will be displayed while upload is still in progress. The file size limit of the video is 50MB. 

This is a snippet of the code from `addBackground()` function.

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
        } });
    }
});
```