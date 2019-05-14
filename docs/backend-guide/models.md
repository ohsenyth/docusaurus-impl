---
id: models
title: Models
---

This is the list of models of each collection.


## Background model
- **File:** `models/background.model.js`
- **Collection name:** `backgrounds`
- **Fields:**
    * name\<string\> - name of the background 
    * link\<string\> - link of the uploaded background
    * use\<string\> - (defualt: 'screen') specify if the background is for the 'screen' or 'card'
    * reg_date\<date\> - (default: current date) date of registration
    * udpate_date\<date\> - (default: current date) update date
    * dis\<boolean\> - (default: true) determine if its deleted or not.

## Calendar model
- **File:** `models/calendar.model.js`
- **Collection name:** `calendars`
- **Fields:**
    * token\<object\>
        * access_token\<string\> - token use to access the google calendar
        * token_type\<string\> - type of token
        * refresh_token\<string\> use refresh the token when its expired.
        * expiry_date\<number\> - timestamp when the token will expire.
    * calendarId\<string\> - id of the calendar
    * reg_date\<date> - registration date


## Font model
- **File:** `models/font.model.js`
- **Collection name:** `fonts`
- **Fields:**
    * name\<string\> - name of the font
    * link\<string\> - link of the uploaded font
    * reg_date\<date\> - (default: current date) date of registration
    * udpate_date\<date\> - (default: current date) update date
    * dis\<boolean\> - (default: true) determine if its deleted or not.

## Logo model
- **File:** `models/logo.model.js`
- **Collection name:** `logos`
- **Fields:**
    * name\<string\> - name of the logo
    * link\<string\> - link of the uploaded logo
    * reg_date\<date\> - (default: current date) date of registration
    * udpate_date\<date\> - (default: current date) update date
    * dis\<boolean\> - (default: true) determine if its deleted or not.

## Schedule model
- **File:** `models/schedule.model.js`
- **Collection name:** `schedules`
- **Fields:**
    * calendarId\<string\> - id of the calendar
    * eventId\<string\> - id of the event
    * clients[\<object\>] - list of clients
        * name\<string\> - name of client
        * persons[\<string\>] - list of persons
        * logo\<string\> - link of the client logo
    * staffs[\<number\>] - list of id number of staffs from GMS
    * reg_date\<date\> - (default: current date) date of registration
    * udpate_date\<date\> - (default: current date) update date
    * remark\<string\> - remark of the schedule
    * img\<string\> - link of the image uploaded for the schedule
    * dis\<boolean\> - (default: true) determine if its deleted or not.

## Setting model
- **File:** `models/setting.model.js`
- **Collection name:** `settings`
- **Fields:**
    * screen[\<string\>] - list of settings of each screen
        * name\<string\> - name of the screen
        * font\<ObjectId\> - id of the font
        * color\<string\> - hex value of the color
        * logo\<ObjectId\> - id of the logo
        * background\<ObjectId\> - id of the background
    * card\<object\> - setting of the message card
        * font\<ObjectId\> - id of the font
        * color\<string\> - hex value of the color
        * background\<ObjectId\> - id of the background
    * meetingCardText\<object\> - default text of message card for meeting.
        * text1\<string\> - some texts
        * text2\<string\> - some texts
        * text3\<string\> - some texts
        * text4\<string\> - some texts
    * recordingCardText\<object\> - default text of message card for meeting.
        * text1\<string\> - some texts
        * text2\<string\> - some texts
        * text3\<string\> - some texts
        * text4\<string\> - some texts
    * reg_date\<date\> - (default: current date) date of registration
    * udpate_date\<date\> - (default: current date) update date
    * dis\<boolean\> - (default: true) determine if its deleted or not.