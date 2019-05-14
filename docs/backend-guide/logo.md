---
id: logo
title: Logo Module
---

This module contains the api for getting the list of logo.

## Get list of logo
This api is use to get the list of logo from the database.
- **link:** `omotenashi.net/api/logo/getList`
- **Params:** `none`
- **Method:** `GET`
- **Services used:**
    * [LogoService.getLogoList()](http://localhost:3000/docs/backend-guide/services#getlogolist)
- **Return:** 
```
{
    "data": [
        {
            "_id": "5c401d4a61a8f41f8b8b84cd",
            "dis": true,
            "name": "G-angle Logo white",
            "link": "https://omotenashi-file.s3.ap-northeast-1.amazonaws.com/logo/1547705673348.png",
            "reg_date": "2019-01-17T06:14:34.081Z",
            "update_date": "2019-01-17T06:14:34.081Z",
            "__v": 0
        }
    ],
    "status": 200,
    "message": "List of logo.",
    "success": true
}
```