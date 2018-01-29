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

  takePicture = () => {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var video = document.getElementById('video');
    var btnReset = document.getElementById('reset');
    var btnSnap = document.getElementById('snap');
    context.drawImage(video, 0, 0, 380, 260);
    canvas.style.visibility = "visible";
    video.style.visibility = "hidden";
    btnReset.style.visibility = "visible";
    btnSnap.style.visibility = "hidden";
    console.log(context.getImageData(0, 0, 380, 260));
  }

  resetPicture = () => {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var btnReset = document.getElementById('reset');
    var btnSnap = document.getElementById('snap');
    var video = document.getElementById('video');
    canvas.style.visibility = "hidden";
    btnReset.style.visibility = "hidden";
    btnSnap.style.visibility = "visible";
    video.style.visibility = "visible";
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
          <div>
            <video id="video" width="380" height="260" autoPlay style={STYLE.video}></video>
            <canvas id="canvas" width="380" height="260"></canvas>
          </div>
          <button id="snap" onClick={this.takePicture}>Snap Photo</button>
          <button id="reset" onClick={this.resetPicture} style={STYLE.btnReset}>Reset</button>
        </p>
        
       
      </div>
        
      
      
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
const STYLE = {
  btnReset: {visibility:'hidden'},
  video:{position:'absolute'}
};

export default App;
