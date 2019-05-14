---
id: helper
title: Helpers
---

This folder contains all the reusable functions.

## datetime.js
**File:** `helpers/datetime.js`

This module contains all the date functions.

### **getTimezone()**

This function is use to get the timezone of the server.
- Params: `none`
- Return: `timezone<number>`

### **setDateFrom()**

This function is use to set the date to 00:00 time and return it in this format : `2018-11-20T00:00:00+00:00`. It is use as timeMin in google calendar when getting the schedule by date.
- Params:
    - date - specified date
    - timezone - client timezone
- Return: `datetime<string>`

### **setDateTo()**

This function is use to set the date to 23:59 time and return it in this format : `2018-11-20T00:23:59+00:00`. It is use as timeMax in google calendar when getting the schedule by date.
- Params:
    - date - specified date
    - timezone - client timezone
- Return: `datetime<string>`

### **setDateAdvance15Mins()**

This function is use to add 15 mins to the given time. It is use as timeMax in google calendar when getting the list of schedule when previewing a schedule. Momentjs is use here for easier processing of time.
- Params:
    - startTime - specified datetime
- Return: `datetime<string>`

### **setDateLate30Mins()**

This function is use to subtract 30 mins from the given time. It is use as timeMin in google calendar when getting the list of schedule when previewing a schedule. Momentjs is use here for easier processing of time.
- Params:
    - startTime - specified datetime
- Return: `datetime<string>`

## google-calendar.js
**File:** `helpers/google-calendar.js`

This module contains the function for creating calendar object use for accessing the google calendar or generating the Auth URL incase the token is not found in the database.

### **authorize()**

This function is use for setting credentials to calendar object if token is present. If not, it will generate auth URL for the user to allow omotenashi system to access his google calendar.
- Params:
    * token - token use to access the google calendar
- Return: `Auth2Clientone<object>`

### **extractToken()**

This function is use to get the token from the code given by the google calendar api after the user allow the omotenashi system to access his calendar.
- Params:
    * code - code returned by google calendar api
- Return: `token<string>`


### **readCredential()**

This function is use to read the data from client-secret.json, then create an Auth2Client object use to access the google calendar. Token is still need to be set here for it to access the google calendar.
- Params: `none`
- Return: `Auth2Client<object>`

### **getCalendarAccess()**

This is the main function of the google-calendar.js. This will get the token from the database, then call the other functions to create an authorize object that can access the google calendar.
- Params: `none`
- Return: `calendar<object>`

## upload.js
**File:** `helpers/upload.js`

This module contains the functions for uploading files to AWS S3.

### **deleteFile()**

This function is use to delete uploaded file when uploading new file. This is use when updating the image in the schedule.
- Params:
    * link - the link of the file to be deleted.
- Return: `result<object>`

### **generateAwsUrl()**

This function is use to generate a presigned URL to allow the frontend to upload file to AWS S3 directly.
- Params: `none`
- Return: `url<string>`

### **uploadFile()**

This function is use to upload font to AWS S3. It will be use as a middleware in the add font route.
- Params:
    * newFile - 'logo' if the file is a logo and 'font' if its a font.
- Return: `upload<object>`

### **uploadImage()**

This function is use to upload imge to AWS S3 using base64. 
- Params:
    * file - the base64 file send by the frontend.
    * ext - file extension of the file.
    * dir - name of the directory in the AWS S3.
- Return: `URL<string>`

## validation.js
**File:** `helpers/validation.js`

This module contains the validation functions when adding/updating background, font and schedules.

### **backgroundValidator()**

This function is use validate the required fields and uniqueness of the background.
- Params:
    * file - the base64 format of the file.
    * filename - name of the background.
    * ext - file extension.
    * link - URL of the file. This must be present if not uploading new background when updating a background.
    * _use - `screen` or `card`
- Return: `true` if no error, else throw an error.

### **scheduleValidator()**

This function is use validate the required fields schedule, client name and staffId when adding/updating.
- Params:
    * schedule - schedule data
- Return: `true` if no error, else throw an error.