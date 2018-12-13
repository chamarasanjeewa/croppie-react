
[![NPM](https://img.shields.io/npm/v/croppie-react.svg)](https://www.npmjs.com/package/croppie-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
# croppie-react

> A react wrapper around the popular cropping library https://foliotek.github.io/Croppie/ .
This provides a react component wrapper around Croppie and exposes croppie API as props to the react-croppie component.

## Getting Started

### Prerequisites

1. [Nodejs](https://nodejs.org/en/) needs to be pre installed.Follow link and refer instructions on how to install [Nodejs](https://nodejs.org/en/).
2. Should be a [React](https://reactjs.org/) based project.

### Installing

Just run all these if you want to actually test out the library if you just want to use it see below 

```
npm install

npm predeploy

cd example

npm start

# if  you run into trouble installing make sure to delete package.lock on both root and example directory and follow the above steps again

```

### How to use

you can use it by

```
npm i https://github.com/verico/croppie-react.git
```
and then ...

```
import ReactCroppie from "croppie-react";
// and then use it on your react component 
 <ReactCroppie
          url="someimage.png"
          orientation = {0}
          Options={{
            viewport: { width: 250, height: 250 },
            boundary: { width: 300, height: 300 },
            showZoomer: false,
            enableResize: true,
            enableOrientation: true,
            mouseWheelZoom: 'ctrl'
          }}
          OnUpdate= {(evt)=>{
            console.log(evt)
          }}
/>
```
### Documentation 

##### Options
 ------------
Sample object ...

 ```
 {
    boundry: { //Defaults to size of container
         width: 300,
         height: 300
    },
    customClassstring: 'any string',
    enableExif: false, 
    enableOrientation: false 
    enableResize: false,
    .... // more to be added
 }
 ```

## Built With

- [Croppie](https://foliotek.github.io/Croppie/)
- [React](https://reactjs.org/)

## Contributing

## Versioning

## Authors

- [Dasith](https://github.com/dasithkuruppu) - _Initial work_ -


## Acknowledgments

- Hat tip to anyone whose code was used

## License

MIT © [verico](https://github.com/verico)
