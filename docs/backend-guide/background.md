---
id: background
title: Background Module
---

This module contains the api for adding or getting background images from the database.

**File:** `controllers/background.controller.js`

## Add background
This api is use for uploadin image and saving its url to the database.
- **link:** `omotenashi.net/api/background/add`
- **Body:**
    * base64 - the base64 format of the image file.
    * ext - the file extension of the file.
    * name - the name of the file.
    * link - link of the file was already uploaded.
    * use - use to specify whether it is for welcome screen or message card. `screen or card`
- **Method:** `POST`
- **Services used:**
    * [BackgroundService.addBackground()](http://localhost:3000/docs/backend-guide/services#addbackground)
- **Return:** 
```
{
    data: {}, 
    status: 200, 
    message: 'Background was added successfully.', 
    success: true
}
```

## Get background list
This api is use to get all the background from the database.
- **link:** `omotenashi.net/api/background/getList`
- **Params:**
    * use - use to specify whether the requested backgrounds are for welcome screen or message card.
- **Method:** `GET`
- **Services used:**
    * [BackgroundService.getBackgroundList()](http://localhost:3000/docs/backend-guide/services#getbackgroundlist)
- **Return:**
```
{
   "data": [
        {
            "_id": "5c05e76bbc1f0d5b23ecdec4",
            "name": "grass",
            "link": "https://farm3.staticflickr.com/2944/33038743794_8cc9153b74_o.jpg",
            "use": "screen",
            "reg_date": "2018-12-04T02:33:15.902Z",
            "update_date": "2018-12-04T02:33:15.902Z",
            "dis": true
        }
   ],
   ,
    "status": 200,
    "message": "List of backgrounds.",
    "success": true
}
```

## Get presigned URL
This api is use to generate a presigned url, so that the frontend can upload a video file directory to S3 server.
- **link:** `omotenashi.net/api/background/getpresignedurl`
- **Params:** `None`
- **Method:** `GET`
- **Services used:** `none`
- **Result:** 
```
{
    "data": "https://omotenashi-file.s3.amazonaws.com/screen/e74096dd-bd23-4732-bb99-a33b0c0f7c7e.mp4?AWSAccessKeyId=AKIAJY7IXCA5AUPTJD3Q&Content-Type=video%2Fmp4&Expires=1552621145&Signature=ZYTcWUGe%2BoyPr1xRI%2FZHopIwSWM%3D&x-amz-acl=public-read",
    "status": 200,
    "message": "AWS SDK S3 Pre-signed url generated successfully.",
    "success": true
}
```