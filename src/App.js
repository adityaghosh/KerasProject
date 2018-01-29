import React, { Component } from 'react';
import Gallery from 'react-photo-gallery';
import Camera from 'react-camera';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
     super(props);
    // this.takePicture = this.takePicture.bind(this);
  }

  componentDidMount() {
    navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Not adding `{ audio: true }` since we only want video now
      // console.log(navigator.mediaDevices.getUserMedia({ video: { facingMode: "user"}} ));
        navigator.mediaDevices.getUserMedia({ video: {facingMode:"environment"}} ).then(function(stream) {
          console.log(stream);
          var video = document.querySelector('video');
          video.srcObject = stream;
          video.onloadedmetadata = function(e) {
            video.play();
          };
        });
    }
  }
  // takePicture() {
  //   this.camera.capture()
  //   .then(blob => {
  //     this.img.src = URL.createObjectURL(blob);
  //     this.img.onload = () => { URL.revokeObjectURL(this.src); }
  //   })
  // }

  takePicture = () => {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var video = document.getElementById('video');
    context.drawImage(video, 0, 0, 380, 260);
  }

  render() {
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          <Gallery photos={PHOTO_SET} />
          <video id="video" width="380" height="260" autoPlay></video>
          <button id="snap" onClick={this.takePicture}>Snap Photo</button>
          <canvas id="canvas" width="380" height="260"></canvas>
        </p>
        
       
      </div>
        /* 
        <input type="file" accept="video/*;capture=camcorder">
        <input type="file" accept="image/*" capture />
          <div style={style.container}>
          <Camera
            style={style.preview}
            ref={(cam) => {
              this.camera = cam;
            }}
          >
            <div style={style.captureContainer} onClick={this.takePicture}>
              <div style={style.captureButton} />
            </div>
          </Camera>
          <img
            style={style.captureImage}
            ref={(img) => {
              this.img = img;
            }}
          />
        </div> */
      
      
    );
  }
}

const PHOTO_SET = [
  // {
  //   src: 'http://example.com/example/img1.jpg',
  //   width: 4,
  //   height: 3
  // },
  // {
  //   src: 'http://example.com/example/img2.jpg',
  //   width: 1,
  //   height: 1
  // }
];

// const style = {
//   preview: {
//     position: 'relative',
//   },
//   captureContainer: {
//     display: 'flex',
//     position: 'absolute',
//     justifyContent: 'center',
//     zIndex: 1,
//     bottom: 0,
//     width: '100%'
//   },
//   captureButton: {
//     backgroundColor: '#fff',
//     borderRadius: '50%',
//     height: 56,
//     width: 56,
//     color: '#000',
//     margin: 20
//   },
//   captureImage: {
//     width: '100%',
//   }
// };

export default App;
