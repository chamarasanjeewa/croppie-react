import React, { Component } from 'react'

import ReactCroppie from 'croppie-react'

export default class App extends Component {
  render() {
    return (
      <div style={{width:500,height:500}}>
        <ReactCroppie
          url="testimage.jpeg"
          orientation = {5}
          options={{
            viewport: { width: 400, height: 400 },
            boundary: { width: 500, height: 500 },
            showZoomer: false,
            enableResize: true,
            enableOrientation: true,
            mouseWheelZoom: 'ctrl'
          }}
          onUpdate= {(evt)=>{
            console.log(evt)
          }}
        />
      </div>
    );
  }
}
