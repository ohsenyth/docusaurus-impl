---
id: gms
title: GMS Module
---

This module contains the api for getting staff and client data from GMS.

## Get staff suggestion
This api is use to get the list of staff from GMS base on the input text.
- **link:** `omotenashi.net/api/gms/getstaffsuggestion`
- **Params:**
    * search - text input by the user
- **Method:** `GET`
- **Services used:** `none`
- **Return:** 
```
{
     "data": [
        {
            "_id": 158,
            "email_pc": "eve@g-angle.co.jp",
            "name": "Eve Anthony U. Rondina"
        }
    ],
    "message": "Suggested staffs.",
    "success": true
}
```

## Get client suggestion
This api is use to get the list of client from GMS base on the input text.
- **link:** `omotenashi.net/api/gms/getclientsuggestion`
- **Params:**
    * search - text input by the user
- **Method:** `GET`
- **Services used:** `none`
- **Return:** 
```
{
    data: [
        {
            "name": "Anhui Dolojoy Network Technology Co.,Ltd.（安徽多乐网络科技有限公司）",
            "gms_clientId": 3664,
            "logo": ""
        },
        {
            "name": "Baitian Technology Limited(广州百田信息科技有限公司-香港分公司)",
            "gms_clientId": 3504,
            "logo": ""
        }
    ], 
    "message": "Suggested clients.",
    "success": true
}
```

## Login
This api is use to get the access token from GMS.
- **link:** `omotenashi.net/api/gms/login`
- **Body:**
    * id - id of the staff
    * password - password of the staff
- **Method:** `POST`
- **Services used:** `none`
- **Return:** 
```
{
    "data": {
        "user": {
            "_id": 158,
            "name": "Eve Anthony U. Rondina",
            "password": "9641",
            "profile_picture": "https://gms-upload-pro.s3.amazonaws.com/staff/ee0b9b19-1ad7-4c75-94a7-4a4be97ffbea.jpeg",
            "permit_level": 1,
            "email_pc": "eve@g-angle.co.jp",
            "departments": [
                {
                    "_id": 4,
                    "name": "事業開発本部"
                }
            ]
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaW....",
        "success": true
    },
    "message": "Login successful",
    "success": true
}
```
