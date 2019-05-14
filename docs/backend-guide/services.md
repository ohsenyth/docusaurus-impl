---
id: services
title: Services
---

These are the services that are being use by the modules.

## Background service
It contains all the functions in adding, getting and updating the background from the database.

**File:** `services/background.service.js`

**Model** [Background model](http://localhost:3000/docs/backend-guide/models#background-model)

### addBackground
This function is use to save background data to the database.
- **Params:**
    * name - name of the background
    * link - link of the background
    * use - 'screen' or 'card'
- **Return:** 
```
{
    _id: ObjectId('id')
    name: 'background name', 
    link: 'some url' 
    use: 'card or screen' 
}
```

### exist
This function is use to check if the background name already exist in the database.
- **Params:**
    * name - name of the background
- **Return:** 
```
true or false
```

### getBackgroundList
This function is use to get the backgrounds from the database filtered by `use` field.
- **Params:**
    * query - object
        * use - 'screen or card'
- **Return:** 
```
[
    {
        _id: ObjectId('id'),
        name: 'background name',
        link: 'some URL',
        use: 'screen or card'
        reg_date: Date('some date')
        update_date: Date('some date'),
        dis: true
    }
]
```

## Calendar service
It contains all the functions in adding and getting the calendar credentials from the database.

**File:** `services/calendar.service.js`

**Model** [Calendar model](http://localhost:3000/docs/backend-guide/models#calendar-model)

### getCalendarToken
This function is use to get the calendar token from the database.
- **Params:** `none`
   
- **Return:** 
```
[
    {
        _id: ObjectId('id'),
        calendarId: 'calendar id',
        token: {
            access_token: 'access token',
            refresh_token: 'refresh token',
            token_type: 'Bearer',
            expiry_date: timestamp
        },
        reg_date: Date('some date')
        update_date: Date('some date'),
        dis: true
    }
]
```

### saveCalendarToken
This function is use to save the calendar token to the database.
- **Params:**
    * token - object
        * access_token - 'token'
        * refresh_token - 'token'
        * token_type - 'Bearer'
        * expiry_date - timestamp
    * reg_date: Date('some date')
    * update_date: Date('some date'),
    * dis: true
- **Return:** 
```
[
    {
        _id: ObjectId('id'),
        calendarId: 'calendar id',
        token: {
            access_token: 'access token',
            refresh_token: 'refresh token',
            token_type: 'Bearer',
            expiry_date: timestamp
        },
        reg_date: Date('some date')
        update_date: Date('some date'),
        dis: true
    }
]
```

## Font service
It contains all the functions for adding and getting fonts from/to the database.

**File:** `services/font.service.js`

**Model** [Font model](http://localhost:3000/docs/backend-guide/models#font-model)

### addFont
This function is use to add font to the database.
- **Params:** 
    * newFont - object
        * name - name of the font
        * link - URL of the font
- **Return:** 
```
{
    _id: ObjectId('id'),
    name: 'font name',
    link: 'some URL',
    reg_date: Date('some date')
    update_date: Date('some date'),
    dis: true
}
```

### exist
This function is use to check whether the font name already exist in the database.
- **Params:** 
    * name - name of the font
- **Return:** 
```
true or false
```

### getFontList
This function is use to get all the font from the database.
- **Params:** `none`
- **Return:** 
```
[
    {
        _id: ObjectId('id'),
        name: 'font name',
        link: 'some URL',
        reg_date: Date('some date')
        update_date: Date('some date'),
        dis: true
    }
]
```

## Logo service
It contains all the functions for adding and getting logos from/to the database.

**File:** `services/logo.service.js`

**Model** [Logo model](http://localhost:3000/docs/backend-guide/models#logo-model)

### addLogo
This function is use to add logo from the database.
- **Params:** 
    * newFont - object
        * name - name of the logo
        * link - URL of the logo
- **Return:** 
```
{
    _id: ObjectId('id'),
    name: 'logo name',
    link: 'some URL',
    reg_date: Date('some date')
    update_date: Date('some date'),
    dis: true
}
```

### getLogoList
This function is use to get all the logo from the database.
- **Params:** `none`
- **Return:** 
```
[
    {
        _id: ObjectId('id'),
        name: 'logo name',
        link: 'some URL',
        reg_date: Date('some date')
        update_date: Date('some date'),
        dis: true
    }
]
```

## Schedule service
It contains all the functions for adding and getting schedules from/to the database.

**File:** `services/schedule.service.js`

**Model** [Schedule model](http://localhost:3000/docs/backend-guide/models#schedule-model)

### getSchedulesByEventId
This function is use to get a specific schedule from database base in `eventId`.
- **Params:** 
    * query - object
        * eventId - event id of the schedule
- **Return:** 
```
{
    _id: ObjectId('id'),
    staffs: [staff_id, staff_id],
    remark: 'some texts',
    img: 'some URL',
    calendarId: 'calenda id',
    eventId: 'event id',
    clients: [
        {
            persons: ['name of persons'],
            name: 'name of client'
        }
    ]
    reg_date: Date('some date')
    update_date: Date('some date'),
    dis: true
}
```

### registerSchedule
This function is use to add a schedule to the database.
- **Params:** 
    * schedule - object
        * staffs -  list of staff IDs
        * remark - remark of the schedule
        * img - link of the image if there is
        * calendarId - calendar id of the event
        * eventId - event id of the event
        * clients: list of clients
            * persons: list of persons of the client
            * name - name of client
- **Return:** 
```
{
    _id: ObjectId('id'),
    staffs: [staff_id, staff_id],
    remark: 'some texts',
    img: 'some URL',
    calendarId: 'calenda id',
    eventId: 'event id',
    clients: [
        {
            persons: ['name of persons'],
            name: 'name of client'
        }
    ]
    reg_date: Date('some date')
    update_date: Date('some date'),
    dis: true
}
```

### updateSchedule
This function is use to update a schedule in the database.
- **Params:** 
    * query - filter query
        * dis - true
        * eventId - id of the event
    * schedule - data of the schedule
        * staffs -  list of staff IDs
        * remark - remark of the schedule
        * img - link of the image if there is
        * calendarId - calendar id of the event
        * eventId - event id of the event
        * clients: list of clients
            * persons: list of persons of the client
            * name - name of client
- **Return:** 
```
{
    _id: ObjectId('id'),
    staffs: [staff_id, staff_id],
    remark: 'some texts',
    img: 'some URL',
    calendarId: 'calenda id',
    eventId: 'event id',
    clients: [
        {
            persons: ['name of persons'],
            name: 'name of client'
        }
    ]
    reg_date: Date('some date')
    update_date: Date('some date'),
    dis: true
}
```

## Setting service
It contains all the functions for updating and getting settings in the database.

**File:** `services/setting.service.js`

**Model** [Setting model](http://localhost:3000/docs/backend-guide/models#setting-model)

### getCardSetting
This function is use to get the card setting.
- **Params:** `none`
- **Return:** 
```
{
    font: ObjectId('id'),
    color: 'hex value of the color',
    background: ObjectId('id')
}
```

### getCardText
This function is use to get the default text of the message cards.
- **Params:** `none`
- **Return:** 
```
{
    meetingCardText: {
        text1: 'some texts',
        text2: 'some texts',
        text3: 'some texts',
        text4: 'some texts'
    },
    recordingCardText: {
        text1: 'some texts',
        text2: 'some texts',
        text3: 'some texts',
        text4: 'some texts'
    }
}
```

### getScreenSetting
This function is use to get the setting of specific screen.
- **Params:**
    * screen - name of the screen
- **Return:** 
```
{
    _id: ObjectId('id')
    font: ObjectId('id'),
    logo: ObjectId('id'),
    background: ObjectId('id'),
    color: 'hex value of the color'
}
```

### getSettings
This function is use to get all settings, and populated all the id in the fields
- **Params:** `none`
- **Return:** 
```
{
    _id: ObjectId('id')
    screen: [
        {
            font: {
                _id: ObjectId('id'),
                name: 'font name',
                link: 'URL'
            },
            logo: {
                _id: ObjectId('id'),
                name: 'logo name',
                link: 'URL'
            },
            background: {
                _id: ObjectId('id'),
                name: 'logo name',
                link: 'URL',
                use: 'screen or card'
            },
            color: 'hex value of the color',
            name: 'office name'
        },
    ],
    card: {
        font: {
            _id: ObjectId('id'),
            name: 'font name',
            link: 'URL'
        },
        background: {
            _id: ObjectId('id'),
            name: 'logo name',
            link: 'URL',
            use: 'screen or card'
        },
        color: 'hex value of the color'
    },
    meetingCardText: {
        text1: 'some texts',
        text2: 'some texts',
        text3: 'some texts',
        text4: 'some texts'
    },
        recodingCardText: {
        text1: 'some texts',
        text2: 'some texts',
        text3: 'some texts',
        text4: 'some texts'
    }
}
```

### updateSettings
This function is use to update the settings.
- **Params:**
    * settingUpdate - updated settings
        * screen - list of screen settings
            * font - id of the font
            * logo - id of the logo
            * background - id of the background
            * color - hex value of the color
            * name - naem of the screen
        * card - setting of the card
            * font - id of the font
            * background - id of the background
            * color - hex value of the color
        * meetingCardText - default text of the meeting card
            * text1 - some texts
            * text2 - some texts
            * text3 - some texts
            * text4 - some texts
        * recordingCardText - default text of the recording card
            * text1 - some texts
            * text2 - some texts
            * text3 - some texts
            * text4 - some texts
- **Return:** 
```
{
    _id: ObjectId('id')
    screen: [
        {
            font: {
                _id: ObjectId('id'),
                name: 'font name',
                link: 'URL'
            },
            logo: {
                _id: ObjectId('id'),
                name: 'logo name',
                link: 'URL'
            },
            background: {
                _id: ObjectId('id'),
                name: 'logo name',
                link: 'URL',
                use: 'screen or card'
            },
            color: 'hex value of the color',
            name: 'office name'
        },
    ],
    card: {
        font: {
            _id: ObjectId('id'),
            name: 'font name',
            link: 'URL'
        },
        background: {
            _id: ObjectId('id'),
            name: 'logo name',
            link: 'URL',
            use: 'screen or card'
        },
        color: 'hex value of the color'
    },
    meetingCardText: {
        text1: 'some texts',
        text2: 'some texts',
        text3: 'some texts',
        text4: 'some texts'
    },
        recodingCardText: {
        text1: 'some texts',
        text2: 'some texts',
        text3: 'some texts',
        text4: 'some texts'
    }
}
```