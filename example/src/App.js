import React, { Component } from 'react'

import ReactCroppie from 'croppie-react'

export default class App extends Component {
  render() {
    return (
      <div style={{width:500,height:500}}>
        <ReactCroppie
          url="testimage.jpeg"
          orientation = {5}
          rotation={90}
          options={{
            viewport: { width: 400, height: 400 },
 
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
