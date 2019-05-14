---
id: message-card
title: Message Card Module
---

This module contains the api for getting schedules for creating message card.

**File:** `controllers/card.controller.js`

## Get filtered schedule 
This api is use to get all the schedules on specific date and office. It sort the schedule by start time. It also remove the excess clients, persons and schedules base on the template formats.
- **link:** `omotenashi.net/api/messagecard`
- **Params:**
    * date - specified date. Example: `2019-03-18`
    * office - name of the office. Example: `main office`
    * timezone - timezone of the client. Example: `-480`
- **Method:** `GET`
- **Services used:**
    * [SettingService.getcardText()](http://localhost:3000/docs/backend-guide/services#getcardtext)
    * [ScheduleService.getSchedulesByEventId()](http://localhost:3000/docs/backend-guide/services#getschedulesbyeventid)
- **Return:** 
```
{
    data: [
        {
            "img": "",
            "logo": "",
            "origin": "agenda",
            "title": "企業説明動画NA ナレーター：渥美さん",
            "start": "10:00",
            "end": "11:00",
            "room": [
                "Bスタジオ"
            ],
            "staffs": [
                "梁",
                "鈴木"
            ],
            "defaultValue": {
                "text1": "本日は当社へお越し下さいまして\n誠にありがとうございます。",
                "text2": "[Staff name]本日の収録は、\n石田、福士が担当致します。",
                "text3": "円滑に収録が進みますよう\n精一杯対応させて頂きますので\nどうぞ宜しくお願い申し上げます。",
                "text4": "代表取締役社長  髙橋 一誠"
            },
            "clients": [
                {
                    "name": "東洋製罐グループホールディングス株式会社",
                    "persons": []
                }
            ]
        }
    ], 
    "status": 200,
    "message": "2019-03-18 schedule",
    "success": true
}
```