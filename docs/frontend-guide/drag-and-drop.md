---
id: drag-and-drop
title: Drag and Drop Component
---

The Drag and Drop component is responsible for handing all drag and drop functions throughout the appliation. It handles all types of files in the system, be it an image, a video or a font file. This component can also handle an upload event.

## Component Structure

This is the structure and files of the drag and drop component.

```bash
shared                                      # parent folder of shared module
└── components                              # folder of all components in shared module
    └── drag-and-drop                       # parent folder of the component
        ├── drag-and-drop.component.html    # view of drag and drop component
        ├── drag-and-drop.component.scss    # the component's private style
        ├── drag-and-drop.component.ts      # the component's logic
        └── drag-and-drop.directive.ts      # the components's directive
```

## Functionality
Upon initialization, the component determines the valid file extensions, depending on the upload type being passed to it. See table below for the valid type extensions.

| File Type | Valid File Extensions |
| ----------- | ----------- |
| Video | .mp4 |
| Image | .jpg, .jpeg, .png |
| Font | .ttf, .otf |

As part of the requirements, this component will only accept one file at a time. If this condition is true, then it will emit to the parent component to let it know that there's a file being dropped and that the parent should update its view.

The component also has listeners to change the background whenever there's an event. Please see snippet below from `drag-and-drop.directive.ts`.

```bash
@HostListener('dragover', ['$event']) public onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';
}

  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#fafafa';
}

  @HostListener('drop', ['$event']) public onDrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#fafafa';
    const files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.filesChangeEmitter.emit(files);
    }
}
```