---
id: schedule
title: Schedule Module
---

This module contains the api getting schedules from google calendar and agenda. Its also use to register and update schedule clients and staffs.

**File:** `controllers/schedule.controller.js`

## Get schedules
This api is use to get the list of schedule based on specified date from google calendar and agenda. It will then merge the result and sort it by start time.

- **link:** `omotenashi.net/api/schedule/getschedules`
- **Params:**
    * limit - maximum number of results
    * page - page of the pagination
    * timezone - timezone of the client
    * date - specified date
    * office - name of the office
- **Method:** `GET`
- **Services used:**
    * [CalendarService.getCalendarToken()](http://localhost:3000/docs/backend-guide/services#getcardtext)
    * [ScheduleService.getSchedulesByEventId()](http://localhost:3000/docs/backend-guide/services#getschedulesbyeventid)
- **Return:** 
```
{
    data: [
        {
                "calendarId": "来客",
                "eventId": "0dr7gho7mkvhdeid8jhhc26h0m",
                "start": "2019-03-11T10:30:00+08:00",
                "end": "2019-03-11T11:30:00+08:00",
                "date": "2019-3-11",
                "title": "main office 5",
                "origin": "calendar",
                "remark": "Test remark",
                "registered": true,
                "room": "寿老人",
                "clients": [
                    {
                        "persons": [
                            "有限公司"
                        ],
                        "_id": "5c6f71c808e5ef0a080c867c",
                        "name": "Beijing Babeltime Technology Inc.（巴别时代）",
                        "logo": ""
                    }
                ],
                "staffs": [
                    {
                        "_id": 158,
                        "name": "Eve Anthony U. Rondina",
                        "email": "eve@g-angle.co.jp"
                    }
                ],
                "img": null,
                "_id": "5c6f71c808e5ef0a080c867b"
            }
    ], 
    status: 200, 
    message: `${date} schedule`, 
    success: true
}
```

## Get schedule
This api is use to get a specific event from google calendar.
- **link:** `omotenashi.net/api/schedule/getschedule`
- **Params:**
    * eventId - id of the event.
    * calendarId - id of the calendar where the event is found
- **Method:** `GET`
- **Services used:**
    * [ScheduleService.getSchedulesByEventId()](http://localhost:3000/docs/backend-guide/services#getschedulesbyeventid)
- **Return:** 
```
{
    "data": {
        "calendarId": "g-angle.co.jp_u37q47nu70lj9up78a1k6d01r8@group.calendar.google.com",
        "eventId": "0dr7gho7mkvhdeid8jhhc26h0m",
        "start": "2019-03-11T10:30:00+08:00",
        "end": "2019-03-11T11:30:00+08:00",
        "date": "2019-03-11T10:30:00+08:00",
        "room": "東京本社-3-寿老人 (3)",
        "clients": [
            {
                "persons": [
                    "有限公司"
                ],
                "_id": "5c6f71c808e5ef0a080c867c",
                "name": "Beijing Babeltime Technology Inc.（巴别时代）",
                "logo": ""
            }
        ],
        "staffs": {}
    },
    "message": "Event info",
    "success": true
}
```


## Register schedule
This api is use to register the schedule to the database. If the schedule contains an image, it will upload the image to the aws S3 first then include its link to the schedule data.
- **link:** `omotenashi.net/api/schedule/registerschedule`
- **Body:**
    * body - object:
        * staff - array of staff id
        * remark - remark of the schedule
        * img - link of the image if there is
        * calendarId - id of the calendar
        * eventId - id of the event
        * clients - object array
            * persons - array of names of the person
            * name - name of the client
- **Method:** `POST`
- **Services used:**
    * [ScheduleService.registerSchedule()](http://localhost:3000/docs/backend-guide/services#registerschedule)
- **Return:** 
```
{
    data: null, 
    message: 'Schedule was added successfully.', 
    success: true
}
```

## Update schedule
This api is use to update the schedule to the database. If the schedule contains an image, it will upload the image to the aws S3 first then include its link to the schedule data.
- **link:** `omotenashi.net/api/schedule/registerschedule/:id`
> __*Note:*__ The `:id` is an `eventId`
- **PaBodyrams:**
    * staff - array of staff id
    * remark - remark of the schedule
    * img - link of the image if there is
    * calendarId - id of the calendar
    * eventId - id of the event
    * clients - object array
        * persons - array of names of the person
        * name - name of the client
- **Method:** `PUT`
- **Services used:**
    * [ScheduleService.updateSchedule()](http://localhost:3000/docs/backend-guide/services#updateschedule)
- **Return:** 
```
{
    "data": null,
    "message": "来客情報を更新しました。",
    "success": true
}
```