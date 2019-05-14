---
id: welcome-screen
title: Welcome Screen Module
---

This module contains the api for getting the current schedule from google calendar and agenda.

**File:** `controllers/welcome_screen.controller.js`

## Get current schedule
This api is use to get the schedules from google calendar and agenda 30 minutes after and 15 minutes before the current time. It will merge the result, select template based on the number of schedules found, remove the excess clients and persons and sort the schedules by start time.

> __*Note:*__ **Main office** has 2 screens, so it will divide the schedule into two then return the schedules based on what screen is requested.

- **link:** `omotenashi.net/api/screen/getcurrentschedule`
- **Params:**
    * office - name of the office
- **Method:** `GET`
- **Services used:**
    * [CalendarService.getCalendarToken](http://localhost:3000/docs/backend-guide/services#getcalendartoken)
- **Return:** 
```
{
    data: {
        "schedules": [
            {
                "img": "",
                "logo": "",
                "room": [
                    "毘沙門天"
                ],
                "clients": [
                    {
                        "name": "株式会社ADI",
                        "persons": [
                            "Lily"
                        ]
                    }
                ],
                "position": "left"
            }
        ],
        "template": 1
    },, 
    status: 200, 
    message: `${date} schedule`,
    success: true
}
```