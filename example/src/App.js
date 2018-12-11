import React, { Component } from 'react'

import ReactCroppie from 'croppie-react'

export default class App extends Component {
  render() {
    return (
      <div>
        <ReactCroppie
          url="testimage.jpeg"
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
      </div>
    );
  }
}
