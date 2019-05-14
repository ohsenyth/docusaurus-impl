---
id: setting
title: Setting Module
---

This module contains the api for getting and updating the settings of message card and welcome screen.

**File:** `controllers/setting.controller.js`

## Get card setting
This api is use to get the message card settings.
- **link:** `omotenashi.net/api/setting/getcardsetting`
- **Params:** `none`
- **Method:** `GET`
- **Services used:**
    * [SettingService.getCardSetting()](http://localhost:3000/docs/backend-guide/services#getcardsetting)
- **Return:** 
```
{
    data: {
        "font": {
            "_id": "5c46bd4fe5d12a09226ede40",
            "link": "https://omotenashi-file.s3.ap-northeast-1.amazonaws.com/font/1548139846942.otf"
        },
        "color": "#b71c1c",
        "background": {
            "_id": "5c5145ba7804741dd7115edf",
            "link": "https://omotenashi-file.s3.amazonaws.com/card/4141d2bb-6fcd-4204-8d2b-f956843128d5.png"
        }
    }, 
    status: 200, 
    message: 'card setting', 
    success: true
}
```

## Get card text
This api is use to get the default text of the message card.
- **link:** `omotenashi.net/api/setting/getcardtext`
- **Params:** `none`
- **Method:** `GET`
- **Services used:**
    * [SettingService.getCardText()](http://localhost:3000/docs/backend-guide/services#getcardtext)
- **Return:** 
```
{
    "data": {
        "meetingCardText": {
            "text1": "本日は当社へお越し下さいまして\n誠にありがとうございます。",
            "text2": "[Staff name]本日の収録は、\n石田、福士が担当致します。",
            "text3": "円滑に収録が進みますよう\n精一杯対応させて頂きますので\nどうぞ宜しくお願い申し上げます。",
            "text4": "代表取締役社長  髙橋 一誠"
        },
        "recordingCardText": {
            "text1": "本日は当社へお越し下さいまして\n誠にありがとうございます。",
            "text2": "[Staff name]本日の収録は、\n石田、福士が担当致します。",
            "text3": "円滑に収録が進みますよう\n精一杯対応させて頂きますので\nどうぞ宜しくお願い申し上げます。",
            "text4": "代表取締役社長  髙橋 一誠"
        }
    },
    "status": 200,
    "message": "card text",
    "success": true
}
```
- **Sample Result:**
```
Coming Soon
```

## Get settings
This api is use to get all settings for welcome screen, message card, and default text of message card.
- **link:** `omotenashi.net/api/setting/getsettings`
- **Params:** `none`
- **Method:** `GET`
- **Services used:**
    * [SettingService.getSettings()](http://localhost:3000/docs/backend-guide/services#getsettings)
- **Return:** 
```
{
    "data": {
        "_id": "5c05e9bfbc1f0d5b23ecdec5",
        "screen": [
            {
                "font": {
                    "_id": "5c36dd4249d1df18b84c162c",
                    "name": "waltograph-disney",
                    "link": "https://omotenashi-file.s3.amazonaws.com/font/1547099454401.ttf"
                },
                "logo": {
                    "_id": "5c401d4a61a8f41f8b8b84cd",
                    "name": "G-angle Logo white",
                    "link": "https://omotenashi-file.s3.ap-northeast-1.amazonaws.com/logo/1547705673348.png"
                },
                "background": {
                    "_id": "5c419d6552571e0cf84f12ae",
                    "use": "screen",
                    "name": "dust particles",
                    "link": "https://omotenashi-file.s3.amazonaws.com/screen/b466d9b3-d4b8-408a-8dae-c57777d060da.mp4"
                },
                "_id": "5c80c5a59a251d13bb081ab6",
                "color": "#ffffff",
                "name": "annex"
            }
        ],
        "card": {
            "font": {
                "_id": "5c46bd4fe5d12a09226ede40",
                "name": "mikachan",
                "link": "https://omotenashi-file.s3.ap-northeast-1.amazonaws.com/font/1548139846942.otf"
            },
            "color": "#b71c1c",
            "background": {
                "_id": "5c5145ba7804741dd7115edf",
                "use": "card",
                "name": "summer",
                "link": "https://omotenashi-file.s3.amazonaws.com/card/4141d2bb-6fcd-4204-8d2b-f956843128d5.png"
            }
        },
        "meetingCardText": {
            "text1": "本日は当社へお越し下さいまして\n誠にありがとうございます。",
            "text2": "[Staff name]本日の収録は、\n石田、福士が担当致します。",
            "text3": "円滑に収録が進みますよう\n精一杯対応させて頂きますので\nどうぞ宜しくお願い申し上げます。",
            "text4": "代表取締役社長  髙橋 一誠"
        },
        "recordingCardText": {
            "text1": "本日は当社へお越し下さいまして\n誠にありがとうございます。",
            "text2": "[Staff name]本日の収録は、\n石田、福士が担当致します。",
            "text3": "円滑に収録が進みますよう\n精一杯対応させて頂きますので\nどうぞ宜しくお願い申し上げます。",
            "text4": "代表取締役社長  髙橋 一誠"
        }
    },
    "status": 200,
    "message": "settings",
    "success": true
}
```

## Get screen settings
This api is use to get the setting of the specific screen.
- **link:** `omotenashi.net/api/setting/getscreensetting`
- **Params:**
    * office - name of the office
- **Method:** `GET`
- **Services used:**
    * [SettingService.getScreenSetting()](http://localhost:3000/docs/backend-guide/services#getscreensetting)
- **Return:** 
```
{
    "data": {
        "background": "https://omotenashi-file.s3.amazonaws.com/screen/b466d9b3-d4b8-408a-8dae-c57777d060da.mp4",
        "color": "#ffffff",
        "font": "https://omotenashi-file.s3.amazonaws.com/font/1547099454401.ttf",
        "logo": "https://omotenashi-file.s3.ap-northeast-1.amazonaws.com/logo/1547705673348.png"
    },
    "status": 200,
    "message": "annex setting",
    "success": true
}
```

## Update
This api is use to update the settings.
- **link:** `omotenashi.net/api/setting/update`
- **Body:**
    * settings - object
        * screen - object array
            * font - id of the font
            * logo - id of the logo
            * background - id of the background
            * color - hex value of the color
        * card - object
            * font - id of the font
            * background - id of the background
            * color - hex value of the color
        * meetingCardText - Object
            * text1 - texts
            * text2 - texts
            * text3 - texts
            * text4 - texts
        * recordingCardText - Object
            * text1 - texts
            * text2 - texts
            * text3 - texts
            * text4 - texts
- **Method:** `PATCH`
- **Services used:**
    * [SettingService.updateSettings()](http://localhost:3000/docs/backend-guide/services#updatesettings)
- **Return:** 
```
{
    "data": {
        "n": 1,
        "nModified": 1,
        "ok": 1
    },
    "status": 200,
    "message": "更新しました",
    "success": true
}
```