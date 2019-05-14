---
id: welcome-screen
title: Welcome Screen Module
---

The Welcome Screen is the display screen that will be displayed to the visitors in the reception area during their visit.

## Module Structure

This is the structure and files of the welcome screen module.

```bash
modules                                         # parent folder of all modules
└── welcome-screen                              # folder of welcome module
    ├── components                              # parent folder of all components
    │   ├── screen-detail                       # folder of control settings component
    │   ├── templates                           # folder of filter component
    ├── pages                                   # parent folder of the entry point
    │   └── welcome-screen                      # folder of welcome screen component
    │       ├── video-auto-play.directive.ts    # directive for video
    │       ├── welcome-screen.component.html   # entry point of the welcome screen component
    │       ├── welcome-screen.component.scss   # the component's private style
    │       └── welcome-screen.component.ts     # the components's logic
    ├── welcome-screen-routing.module.ts        # the routes related to the module
    └── welcome-screen.module.ts                # contains the imports and declarations
```

This module uses `schedule.service.ts` in the `core/services` folder to communicate with backend.

## Overview and Requirements
There are 5 offices in the company. Each office has 1 screen, except for the Main Office, which has 2 screens. Each office has its own designated link. Refer to the table below.
| Office | Link |
| ----------- | ----------- |
| Annex | http://18.182.27.53:3000/#/welcome-screen/office/annex |
| Hanare | http://18.182.27.53:3000/#/welcome-screen/office/annex |
| Sapporo | http://18.182.27.53:3000/#/welcome-screen/office/sapporo |
| Fukuoka | http://18.182.27.53:3000/#/welcome-screen/office/fukuoka |
| Main Office Screen 1 | http://18.182.27.53:3000/#/welcome-screen/office/main_office_1 |
| Main Office Screen 2 | http://18.182.27.53:3000/#/welcome-screen/office/main_office_2 |

When user visits the link, frontend sends a request to backend along with the office name as the parameter. Backend then determines which schedule to return based on the current date and time. 

Each schedule will only be displayed 15 minutes before the schedule time and 30 minutes after the schedule time. In total, the schedule will be displayed on the screen for 45 minutes.

The display screen will auto-refresh every minute so that the changes done in the [Schedule](frontend-guide/schedule.md) page will be reflected automatically without manually refreshing the page.

The following fields from Schedule module are displayed in the Welcome Screen:
1. Room Name
2. Client Name
3. Client Logo (optional)
4. Persons (optional)

The font size of the client name will adjust depending on its length so that it will only be displayed in one line. A client can have many visitors. However, only 4 lines will be accomodated in the welcome screen.

In one screen, it's possible to have multiple schedules to display. If in each schedule, there is no visitor, then the text will be centered. Otherwise, all the client names will be displayed on the left and the visitor names on the right.

Most clients don't have a logo, but there are cases that there is a logo avialable. Thus, it will be displayed in the screen.

Each screen can only accomodate 4 schedules at a time.

For Main Office, since there are 2 screens available, the schedules will be divided into 2. For example:
| # of Schedules | Main Office Screen 1 | Main Office Screen 2
| ----------- | ----------- | ----------- |
| 1 | 1 schedule displayed | none |
| 2 | 1 schedule displayed | 1 schedule displayed |
| 3 | 2 schedules displayed | 1 schedule displayed |
| 4 | 2 schedules displayed | 2 schedules displayed |
| 5 | 3 schedules displayed | 2 schedules displayed |
| 6 | 3 schedules displayed | 3 schedules displayed |
| 7 | 4 schedules displayed | 3 schedules displayed |
| 8 | 4 schedules displayed | 4 schedules displayed |

If schedules have the same clients and visitors, but different rooms, they will be merged in one schedule.

Refer to [this document](https://drive.google.com/open?id=1zNinpRZ0dlY_9s5X-EAoL9DzryuAsO08JB9mNU421wo) to have a general idea how the welcome screen is displayed depending on the number of schedules in a given time.

The welcome screen is best displayed in 1920 px by 1080 px resolution and in full screen mode.

There are 2 modes for the welcome screen: preview and current schedules. See [this page](frontend-guide/preview.md) for a detailed explanation of the Preview functionality.

## Components

### Screen Detail
This component is responsible for getting the settings in a given office. 
Upon intialization, this component determines if the mode is for preview only or if it is the actual schedules being requested. After determining the mode, it then gets the settings based on the office as well as the schedules. This component also applies the settings to screen. Here is a snippet of the code.

<!--DOCUSAURUS_CODE_TABS-->
<!--screen-detail.component.ts-->
```ts
getSettings() {
    this.screenService.getScreenBackground(this.office).subscribe(
      (res: APIResponse) => {
        this.settings = res.data;
        this.backgroundEvent.emit(this.settings.background);
        this.applyFont();
      },
      err => {
        alert(err);
        console.log(err);
      }
    );
}
```
<!--welcome-screen.component.html-->
```html
<div class="fullscreen-bg" *ngIf="background && background !== null && background !== '' && bgType === 'mp4'; else elseBlock">  
  <video loop autoplay appVideoAutoPlay class="fullscreen-bg__video">
    <source src="{{background}}" type="video/mp4" />
  </video> 
</div>

<app-screen-detail (officeEvent)="getOffice($event)" (backgroundEvent)="getBackground($event)"></app-screen-detail>

<ng-template #elseBlock>
  <div class="fullscreen-bg" *ngIf="bgType !== 'mp4'" [ngStyle]="{'background': 'url(' + background + ') center center / cover no-repeat'}"> 
  </div>
</ng-template>
```
<!--END_DOCUSAURUS_CODE_TABS-->

Screen Detail emits to its parent component, Welcome Screen, so that the background will be displayed.

### Template Header and Footer
These components display the header and footer of the welcome screen, which is mostly static. However, for one schedule, the header will display the room name.

<!--DOCUSAURUS_CODE_TABS-->
<!--template-header.component.html-->
```html
<header class="mat-body-1">
  <h1>いらっしゃいませ</h1>
  <h2 *ngIf="class === 'one-meeting'" id="room">
    {{room}}
  </h2>
</header>
```
<!--template-footer.component.html-->
```html
<footer class="footer">
    <div class="logo-box">
      <img src="{{footerLogo}}" alt="Logo" class="logo" />
    </div>
    <h2 class="footer-text" *ngIf="displayText">
      <p>本日はご来社誠にありがとうございます。<br>
        係の者が参りますので、中央のベルでお呼びください。
      </p>
    </h2>
</footer>
```
<!--END_DOCUSAURUS_CODE_TABS-->

### Template One Detail
This component is a child component of Screen Detail. It is responsible for displaying the details of one schedule.

#### Requirements
1. The room name will be displayed in line with the header.
1. If the schedule has more than one room, it will be separated by a comma and still be displayed in one line.

### Multiple Templates Detail
This component is a child component of Screen Detail. This is used to display multiple schedules in one screen.

This component handles 2, 3 and 4 schedules. It receives the `meetingClass` value from parent component, which will be used in the stylesheet. In .scss, the schedules are displayed using flexbox. See table below:

| # of Schedules | Width of each item in flexbox |
| ----------- | ----------- |
| 2 | 50% |
| 3 | 32.7% |
| 4 | 48% |

```css
.two-meetings {
    width: 50%;
    margin-bottom: 1rem;
    align-items: baseline;
}
```

The parent `div` of class `two-meetings` already has `display: flex` and `flex-direction: row` in its property in order to display the schedules correctly.

## Auto Play Video Directive
This directive is used to play the video automatically in the event that the chosen background of the office is a video.