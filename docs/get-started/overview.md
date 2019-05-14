---
id: overview
title: Overview
sidebar_label: Overview
---

__Omotenashi app__ is a web application use to show the list of schedules from google calendar and Agenda System in all offices of G-angle in Japan. It will display the name of clients and visitors on the time of their visit to the company. It is also use to generate and edit a message card that will be given to the client.

## Features

- __Schedule__ contains the list of filtered schedules from google calendar and Agenda system. You can filter the date and office to display the schedules. In the right of each schedule you can click the edit button to edit its staff and clients. 
    > __*Note:*__ You can only update the Date, room, and time in the google calendar or agenda system.

- __Message card__ generates the message card of each filtered schedule. It has a preview display in the left side and a control settings in the right where you can update the text, font size and alignment of each card. Then you can print it by pressing the print button in the upper right corner of the page.

- __Settings__ is where you can set the background and font of the message card and welcome screen of each office. You can also set the default text for the message card. Finally, you can also upload fonts and images here.

- __Screen Preview__ will show the preview of the schedule before registration or updating it.

- __Welcome screen__ doesn't have any link from the system. This page will be displayed in the receiving area in each location to inform the visitors of their schedule and which room they are held. You can see this page by going to this [link](http://18.182.27.53:3000/#/welcome-screen/office/main_office_1).
    > __*List of offices:*__
    > * Main Office - has 2 screens
    > * Annex
    > * Fukuoka
    > * Hanare
    > * Sapporo

## System Overview

The Omotenashi app was developed using the following technologies:
- **Frontend**
    * [Angular 7.3](https://angular.io/) - Javascript framework used to build the web application
    * [Angular Material 7.3](https://material.angular.io/) - Material Design components for Angular
    * [AWS S3](https://aws.amazon.com/s3/) - Cloud Storage used in uploading media files
- **Backend**
    * [NodeJs 10.10](https://nodejs.org/) - the main framework use run javascript outside chrome.
    * [ExpressJs 4.16](https://expressjs.com/) - the popular framework use for routing and starting a server. 
    * [Mongodb](https://www.mongodb.com/) - the NoSQL database
    * [AWS EC2](https://aws.amazon.com/ec2/) - the server that host the backend app.

## Database Structure

The following list are the collections of omotenashi database.
- **backgrounds** holds the links of the uploaded background images.
- **calendars** holds the calendarId and its token use to access the calendar.
- **fonts** holds the links of the uploaded fonts.
- **logos** holds the links of the logos of G-angle.
- **schedules** holds the registered schedule from google calendar.
- **settings** holds the setting of the screen, message card and default texts.  

Belows are the list of fields in each collection.

<!-- ![db relationship](/website/static/db_relationship.png) -->

### Background

| Field | Type | Required | Default | Description | 
| ------- | ------- | ------- | ------- | ------- |
| name | string | true | | Name of the background |
| link | string | true | | URL of the image |
| use | string | | screen | Specify whether its for the screen or message card |
| reg_date | Date | | Date.now() | Date when it is added |
| update_date | Date | | Date.now() | Date when it is updated |
| dis | boolean | | true | `true` when its not deleted else `false` |

### Calendar

| Field | Type | Required | Default | Description | 
| ------- | ------- | ------- | ------- | ------- |
| calendarId | string |  | | Id of the target calendar |
| token | object | | | Use to access the google calendar |
| reg_date | Date | | | Date when it is added |
| update_date | Date | | | Date when it is updated |
| dis | boolean | | true | `true` when its not deleted else `false` |

> __*Note:*__ The `calendarId` should be manually added to the database after the user allow the app to access his calendar. Just go to the google calendar then copy the calendarId of the calendar you want to access.

### Font

| Field | Type | Required | Default | Description | 
| ------- | ------- | ------- | ------- | ------- |
| name | string | true |  |  Name of the font |
| link | string | true |  | URL of the font |
| reg_date | Date |  | Date.now() | Date when it is added |
| update_date | Date |  | Date.now() | Date when it is updated |
| dis | boolean |  | true | `true` when its not deleted else `false` |

### Logo

| Field | Type | Required | Default | Description | 
| ------- | ------- | ------- | ------- | ------- |
| name | string | true |  |  Name of the logo |
| link | string | true |  | URL of the logo |
| reg_date | Date |  | Date.now() | Date when it is added |
| update_date | Date |  | Date.now() | Date when it is updated |
| dis | boolean |  | true | `true` when its not deleted else `false` |

### Schedule

| Field | Type | Required | Default | Description | 
| ------- | ------- | ------- | ------- | ------- |
| calendarId | string | true |  |  calendarId of the target calendar |
| eventId | string | true |  | Event id of the calendar schedule |
| staffs | [number] |  |  | List of staffId from GMS |
| reg_date | Date |  | Date.now() | Date when it is added |
| update_date | Date |  | Date.now() | Date when it is updated |
| remark | string |  |  | Remark of the schedule |
| img | string |  | null | URL of the image if it has |
| dis | boolean |  | true | `true` when its not deleted else `false` |

### Setting

| Field | Type | Required | Default | Description | 
| ------- | ------- | ------- | ------- | ------- |
| screen | [object] |  |  |  Contains the font, color, logo and background for each office screen |
| card | object |  |  | Contains the font, color and background setting for message card |
| meetingCardText | object |  | Date.now() | Defualt texts of meeting message card |
| recordingCardText | object |  | Date.now() | Default texts of recording message card |
| reg_date | Date |  | Date.now() | Date when it is added |
| update_date | Date |  | Date.now() | Date when it is updated |
| dis | boolean |  | true | `true` when its not deleted else `false` |

## System Specifications

[This is the link](https://drive.google.com/open?id=1G2Z87pb3ukKnZZS7skkPUjWlpMXKsjfxfRNiyYu-O64) to the detailed specifications of the system.
