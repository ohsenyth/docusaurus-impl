---
id: font
title: Font Module
---

This module contains the api for adding font and getting the list of fonts.

## Add font
This api is use to upload font to aws S3 and save its URL to the database.
- **link:** `omotenashi.net/api/font/add`
- **Body:**    
    * originalname - name of the font
    * file - the file itself
    > __*Note:*__ The upload function was called in the font route file. Its like a middleware.
- **Method:** `POST`
- **Services used:**
    * [FontService.addFont()](http://localhost:3000/docs/backend-guide/services#addfont)
- **Return:** 
```
{
    data: {
        "_id": "5c05e76bbc1f0d5b23ecdec4",
        "name": "font_name",
        "link": "https://farm3.staticflickr.com/2944/33038743794_8cc9153b74_o.otf",
        "reg_date": "2018-12-04T02:33:15.902Z",
        "update_date": "2018-12-04T02:33:15.902Z",
        "dis": true
    }, 
    status: 200, 
    message: 'Font was added successfully.', 
    success: true
}
```

## Get font list
This api is use to get the list of font from the database.
- **link:** `omotenashi.net/api/font/getList`
- **Params:** `none`
- **Method:** `GET`
- **Services used:**
    * [FontService.getFontList()](http://localhost:3000/docs/backend-guide/services#getfontlist)
- **Return:** 
```
{
    data: [
        {
            "_id": "5c36dd4249d1df18b84c162c",
            "dis": true,
            "name": "waltograph-disney",
            "link": "https://omotenashi-file.s3.amazonaws.com/font/1547099454401.ttf",
            "reg_date": "2019-01-10T05:50:58.019Z",
            "update_date": "2019-01-10T05:50:58.019Z",
            "__v": 0
        }
    ], 
    status: 200, 
    message: 'List of fonts.', 
    success: true
}
```
