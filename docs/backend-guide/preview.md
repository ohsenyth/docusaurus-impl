---
id: preview
title: Preview Module
---

This module contains the api for getting schedules for previewing.

## Preview
This api is use to get the schedules from google calendar and agenda with the same date, time and office of the schedule being previewed. Then it will select a template base on the number of schedules found. Then it will remove the excess clients, persons and schedules.
- **link:** `omotenashi.net/api/preview`
- **Params:**
    * schedule - object that contains the ff:
        * start - start datetime of the event e.g. 2019-03-11T10:30:00 08:00
        * end - end datetime of the event e.g. 2019-03-11T10:30:00 08:00
        * room - room of the event
        * eventId - event id of the previewed schedule
        * registered - `true` if the schedule is already registered, else `false`
        remark - remark of the event
        * staffs - list of staffIds
        * title - title of the event
- **Method:** `GET`
- **Services used:**
    * [CalendarService.getCalendarToken()](http://localhost:3000/docs/backend-guide/services#getcardtext)
- **Return:** 
```
{
    data: {
        "office": "main_office_1",
        "schedules": [
            {
                "room": [
                    "寿老人"
                ],
                "eventId": "0dr7gho7mkvhdeid8jhhc26h0m",
                "title": "main office 5",
                "img": null,
                "clients": [
                    {
                        "persons": ["person 1", "person 2"],
                        "_id": "5c6f71c808e5ef0a080c867c",
                        "name": "Beijing Babeltime Technology Inc.（巴别时代）",
                        "logo": ""
                    }
                ],
                "position": "center"
            }
        ],
        "template": 1
    }, 
    status: 200, 
    message: 'Preview data', 
    success: true 
}
```
