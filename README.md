# Finpak x Limoverse

## What is Finpak?

Finpak as an idea was a **FIN**ancial **PACK**age Manager, but it quickly became something bigger.

Finpak in it's current state is a lightly customizable dashboard and it is so much more, than anything that I created before on a technical and on a design level.

## Documentation

### Dashboard Control

The dashboard is controlled with `useState` variables, that are stored in `localStorage` and `sessionStorage`.

The variables `topLeft`, `topRight`, `bottomLeft`, `bottomRight` and `middle` *(string)* are responsible for the placing of content on the dashboard.

Also `stateChange` *(number)* is used as a counter for triggering re-renders of the dashboard elements.

While `popup` *(boolean)* is what's controlling the top popup element of the dashboard and `popupText` *(object {icon, message})* is what is displayed in the said element.

### Utility Functions

Utility functions are stored in the **Utilities.js** file.

`addZero` is a small utility function which is used, for date formatting. Such as in `getCurrentDateTime` which formats the native js Date, to a string of the desired date format.