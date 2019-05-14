---
id: calendar
title: Calendar Module
---

This module contains the api for receiving and saving token from google calendar.

## Save token
When the token is not found in the database, the app will request a permission from the user to allow Omotenashi system to access his calendar. The user must login his account then click allow. The google calendar api will send a code back.

This api is responsible for receiving the code from google calendar. It will get a token from the given code, then save it to database to be use for requesting data to google calendar.
- **link:** `omotenashi.net/api/calendar/savetoken`
- **Params:**
    * code - a code string return by google api.
- **Method:** `GET`
- **Return:** 
```
redirect('https://omotenashi.net) redirect the user back to omotenashi system. 
```

> __*Note:*__ After the token is obtain, you must manually copy the calendarId of the calendar that he wants the omotenashi system to access.