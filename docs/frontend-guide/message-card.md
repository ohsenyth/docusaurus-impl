---
id: message-card
title: Message Card Module
---

The Message Card Module displays all schedules from the database, as well as from Google Calendar and Agenda system. The user can customize the text, text position and text alignment of each message card. Each message card will be printed and presented to the client during their visit to the designated location.

## Module Structure

This is the structure and files of the message card module.

```bash
modules                                 # parent folder of all modules
└── message-card                        # folder of message card module
    ├── components                      # parent folder of all components
    │   ├── control-settings            # folder of control settings component
    │   ├── filter                      # folder of filter component
    │   ├── message-card-list           # folder of message card list component
    │   └── print-preview               # folder of print preview component
    ├── pages                           # parent folder of the entry point
    │   ├── message-card.component.html # entry point of the message card component
    │   ├── message-card.component.scss # the component's private style
    │   └── message-card.component.ts   # the components's logic
    ├── message-card-routing.module.ts  # the routes related to the module
    └── message-card.module.ts          # contains the imports and declarations
```

This module uses `message-card.service.ts` in the `core/services` folder to communicate with backend as well as `schedule.ts` located in `core/models`.

## Overview and Requirements
1. If the client has no visitor, the client name is appended with '様' character.
2. If the client has visitors, the visitor name is appended with '様' character.
3. The position of the default texts are fixed. 
4. The position of the clients and visitors is on top, but will adjust the spaces evenly. If a line is removed, the positioning of the texts will also adjust.
5. The print preview as seen on the app is the same as the message card that will be printed.
6. A message card can be individually removed should the user choose not to include it in the print queue.
7. The user can print these message cards by clicking the "Print" button.
8. By default the selected date in the filter is the current date and the default office is the Main Office.
9. The background, font style and font color of the message card is dependend on what is set on the Settings page.
10. If the schedule has multiple staff, this will be joined in one line with a **`、`** character (Japanese comma).
11. Any changes done by the user in this page will not be saved to the database.

## Components

The Schedule module is composed of 4 components:
1. Message Card List
2. Message Card Filter
3. Control Settings
4. Print Preview

### Message Card Filter

Message Card Filter is a sibling component of Message Card List. Similar to the Schedule Filter, every time the user clicks the "Filter" button, this component emits to the message card list, which listens to changes and updates the view if there is any change.

### Message Card List
This component displays the all the schedules and calls the Print Preview component.

```html
<div class="container mat-body-1" *ngFor="let schedule of schedulesList; let i = index;" [@flyInOut]="'in'">
    <h1 class="mat-headline schedule">{{schedule.start}} - {{schedule.end}} ~ {{schedule.title}}</h1>
    <app-print-preview [settings]="settings"
                        (removeCard)="remove($event)"
                        [schedule]="schedule"
                        [defaultText]="schedule.origin === 'agenda' ? 
                                    defaultText.recordingCardText :
                                    defaultText.meetingCardText"></app-print-preview>
</div>
```

### Print Preview
This is the main component of this module. This is where the user can see the preview of the message card before it is printed. Any changes done to the text will also be reflected here.

It has 3 main parts:
1. print preview section
2. control settings section
3. remove message card

#### Technical Overview

The Print Preview component calls and passes the data to the control settings component using input binding. 

<!--DOCUSAURUS_CODE_TABS-->
<!--print-preview.component.html-->
```html
<app-control-settings [defaultText]="defaultText"
                        [schedule]="schedule"
                        (updateDefaultText)="updateDefaultText($event)"
                        (updateClient)="updateClient($event)"
                        (updateDefaultTextStyle)="updateDefaultTextStyle($event)"
                        (updateClientStyle)="updateClientStyle($event)">
</app-control-settings>
```
<!--control-settings.component.ts-->
```ts
export class ControlSettingsComponent implements OnInit {

  date: Date;
  office: string;
  @Input() defaultText: any;
  @Input() schedule: any;
  @Output() updateDefaultText = new EventEmitter<any>();
  @Output() updateClient = new EventEmitter<any>();
  @Output() updateDefaultTextStyle = new EventEmitter<any>();
  @Output() updateClientStyle = new EventEmitter<any>();

  ...
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

The Print Preview component passes the following to the Control Settings component:
1. schedule - the data of the schedule
2. settings - the settings of the message card

These data are needed by the Control Settings component for it to display the text and font style correctly to the user. The Print Preview component and Control Settings component work hand in hand in sharing data in order to update their own views accordingly.

#### Technical Overview

Print Preview waits for changes from Control Settings component for any change in the text for the client name, visitors and default text. It also waits for changes for their respective font sizes and alignment.

#### **`applyFont()`**
Upon initialization of the component, the font style of the message card is applied. This creates a style element in the DOM to include the selected font style in the print preview panel of the message card.

#### **`applyCardStyle()`**
Similar to `applyFont()`, this function applies the background of the message card and the font color of the text. These values are passed from the parent component.

#### **`applyStyleHandler()`**
`ngStyle` is widely used in this component as this is an attribute directive that updates styles for the containing HTML element. Sets one or more style properties, specified as colon-separated key-value pairs, as seen in the snippet below:

<!--DOCUSAURUS_CODE_TABS-->
<!--print-preview.component.html-->
```html
<div *ngFor="let client of schedule.clients; let i = index">
  <p class="client" [ngStyle]="applyStyleHandler('client', i)">
    <span [innerHTML]="client.name"></span>
  </p>
  <p class="visitor" *ngFor="let person of client.persons; let j = index" [ngStyle]="applyStyleHandler('visitor', i, j)">
      <span [innerHTML]="person"></span> <span *ngIf="person"></span>
  </p>
</div>
```
<!--print-preview.component.ts-->
```ts
applyStyleHandler(type: string, index: number, visitorIndex?: number): object {
    let style = {};
    switch (type) {
      case 'client':
        style = this.styleClient[index];
        break;
      case 'visitor':
        style = this.styleClient[index]['persons'][visitorIndex];
        break;
      case 'defaultText':
        style = this.styleDefaultText[index];
        break;
    }

    return {
      'font-size': style['size'] + 'em',
      'text-align': style['alignment']
    };
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

#### **`updateClient()`**
This function receives the emitted value from child component and updates the client oject. This includes the client name and visitors.

#### **`updateClientStyle()`**
This function receives the emitted value from child component and updates the style object for client and visitors.

#### **`updateDefaultText()`**
This function receives the emitted value from child component and updates the default text oject. This is to update the alignment and font size of the clients and visitors.

#### **`updateDefaultTextStyle()`**
This function receives the emitted value from child component and updates the style object for default text. This is to update the alignment and font size of the default texts.

### Control Settings
This component contains the input fields for the texts, buttons for the sizes and alignments. This is where you can change the text, its size and alignment.

As a child component of Print Preview component, it shares data via Output() and EventEmitter in order to let the parent know that the data has been changed and for the parent to update its view accordingly. Any changes performed by the user will be emitted to the parent component so its view will be updated.

#### Technical Overview

#### **`transformStaff()`**
Upon initialization of the component, the `staff` array from `schedule` object will be joined together and the [Staff name] tag will be replaced with the actual staff names.

After which, the default font sizes of the clients, visitors and default texts and their alignments will be applied.

#### **`changeClient()`**
This function is triggered everytime there is a change in the client name or visitor name and stores the updated name to the array. After which, it emits to its parent component.

#### **`changeDefaultText()`**
This function is triggered everytime there is a change in the default text and updates the object. After which, it emits to its parent component.

#### **`changeStyle()`**
This function is triggered everytime any of the buttons for fotn sizes and alignment is clicked. This determines whether the text to be updated is for the default text, client or visitor. It then calls the `evaluateStyle()` function and emits the updated style object to the parent component.

#### **`evaluateStyle()`**
This function assigns the value of the alignment or size to `styleObject` and returns it to the caller.