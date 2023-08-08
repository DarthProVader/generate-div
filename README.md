# DIV Generator

## Overview

The DivGenerator app allows users to dynamically generate a div element by specifying dimensions (height and width), background color and an optional text label.
The result is presented below the form.

## Features

### Form Inputs:

- Height and Width: Numeric values to determine the size of the div. Can be specified in pixels or percentages.
- Background Color: A color picker input to select a color for the generated div.
- Text Label: An optional text field to add a label to the div. Limited to a maximum of 10 words and color is set to white.

### Generated Div:

The div with the specified dimensions and styles is shown below the form after submission.

### Backend API Integration:

When the form is submitted, a mock POST request is made to https://jsonplaceholder.typicode.com/posts simulating a server-side action, the response from this endpoint is used for div styling.

## Dependencies

- vue: version 3
- axios: For making API requests.

## Getting Started

### Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run unit tests

```
npm run test:unit
```

### Lints and fixes files

```
npm run lint
```
