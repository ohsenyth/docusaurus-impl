---
id: date-picker
title: Date Picker Component
---

The Date Picker component handles all the date picker events used all throught the application.

## Component Structure

This is the structure and files of the date picker component.

```bash
shared                                      # parent folder of shared module
└── components                              # folder of all components in shared module
    └── drate-picker                        # parent folder of the component
        ├── custom-date-format.ts           # custom date format
        ├── date-picker.component.html      # view of date picker component
        ├── date-picker.component.css       # the component's private style
        ├── date-picker.component.ts        # the component's logic
```

## Functionality
The component emits to the parent component everytime the user selects a date. It has a custom date format as per requirements which is 'YYYY/MM/DD'.

<!--DOCUSAURUS_CODE_TABS-->
<!--date-picker.component.html-->
```html
<mat-form-field>
  <input matInput [matDatepicker]="picker" placeholder="" (click)="picker.open()"
    [(ngModel)]='date' (ngModelChange)='dateChanged($event)' readonly>
  <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
  <mat-datepicker #picker></mat-datepicker>
</mat-form-field>
```
<!--date-picker.component.ts-->
```ts
@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  providers: [
    {provide: DateAdapter, useClass: DateFormat},
    {provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS},
  ],
})
...
dateChanged(event): void {
    this.dateChange.emit(this.date);
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

## Usage
This is an example how to use the component:. This snippet is from `filter.component.html` from M[essage Card](frontend-guide/message-card.md).

```html
<div class="filter">
    <app-date-picker (dateChange)='dateChanged($event)' [date]='date'></app-date-picker>
    <mat-form-field class="drop-down">
    <mat-select [(value)]="selectedOffice" disableOptionCentering="center">
        <mat-option *ngFor="let office of offices" value="{{office}}">{{office}}</mat-option>
    </mat-select>
    </mat-form-field>
    <button mat-raised-button color="primary" (click)="filter()">表示する</button>
</div>
```

The date picker components emits to the filter component using the dateChange emitter. The filter component then stores the date to its own property.

Code from `filter.component.ts`:

```ts
dateChanged(event) {
    this.dateChange.next(moment(event).format('YYYY-MM-DD'));
    this.date = moment(event).format('YYYY-MM-DD');
}
```