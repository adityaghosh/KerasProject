import React, { Component } from 'react';
import KerasJS from 'keras-js'

import Gallery from 'react-photo-gallery';
import Camera from 'react-camera';
import logo from './logo.svg';
import './App.css';
import Loadable from 'react-loading-overlay';

var ndarray = require("ndarray")
var ops = require("ndarray-ops")

class App extends Component {
  
  constructor(props) {
     super(props);
    // this.takePicture = this.takePicture.bind(this);
    // Loadable.isActive = false;
    this.state = {
      isActive: false,
      lastResult: ""
    }
  }

  componentDidMount() {

    navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Not adding `{ audio: true }` since we only want video now
      // console.log(navigator.mediaDevices.getUserMedia({ video: { facingMode: "user"}} ));
      navigator.mediaDevices.getUserMedia({ video: {facingMode:"environment"}} ).then(function(stream) {
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
    context.drawImage(video, 0, 0, 299, 299);
    canvas.style.visibility = "visible";
    video.style.visibility = "hidden";
    btnReset.style.visibility = "visible";
    btnSnap.style.visibility = "hidden";
    var {data, width, height} =  context.getImageData(0, 0, 299, 299);
    let dataTensor = ndarray(data,[width,height,4])
    let dataProcessedTensor = ndarray(new Float32Array(width*height*3),[width,height,3])
    ops.assign(dataProcessedTensor.pick(null,null,0), dataTensor.pick(null,null,0))
    ops.assign(dataProcessedTensor.pick(null,null,1), dataTensor.pick(null,null,1))
    ops.assign(dataProcessedTensor.pick(null,null,2), dataTensor.pick(null,null,2))
    console.log(dataProcessedTensor.data);
    this.setState({isActive:true});
    model
      .ready()
      .then(() => {
        // input data object keyed by names of the input layers
        // or `input` for Sequential models
        // values are the flattened Float32Array data
        // (input tensor shapes are specified in the model config)

        const inputData = {
          input_1: dataProcessedTensor.data
        }

        // make predictions
        console.log("Input is")
        console.log(inputData)
        return model.predict(inputData)
      })
      .then(outputData => {
        // outputData is an object keyed by names of the output layers
        // or `output` for Sequential models
        // e.g.,
        // outputData['fc1000']
        console.log("Final Output")
        console.log(outputData)
        const predictions = outputData.predictions;
        let max = -1;
        let maxpred = null;
        for (let i in predictions) {
          let probability = predictions[i];
          if (probability > max) {
            max = probability;
            maxpred = i;
          }
        }
        console.log(`Predicted thing is ${maxpred} with probability ${max.toFixed(3)}.`);
        console.log(preds[maxpred.toString()]);
        this.setState({isActive:false,lastResult:"Closest tag: "+preds[maxpred.toString()]});
      })
      .catch(err => {
        // handle error
        console.log("Some error");
        console.log(err);
        this.setState({isActive:false,lastResult:"Some Error Occured. Please try again."});
      })

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

  findSimilar = () => {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    context.getImageData(0, 0, 299, 299)
  }

  render() {
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Loadable
          active={this.state.isActive}
          spinner
          text='Calculating in your browser.'>
          <div className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
            <div>
              <video id="video" width="299" height="299" autoPlay style={STYLE.video}></video>
              <canvas id="canvas" width="299" height="299"></canvas>
            </div>
            <button id="snap" onClick={this.takePicture} style={STYLE.video}>Snap Photo</button>
            <button id="reset" onClick={this.resetPicture} style={STYLE.btnReset}>Reset</button>
            <div>{this.state.lastResult}</div>
          </div>
        {/* <button id="findSimilar" onClick={this.findSimilar}></button>
        <Gallery photos={PHOTO_SET} /> */}

        </Loadable>
      </div>
      
    );
  }
}


const model = new KerasJS.Model({
  filepath: '/inception_v3.bin',
  gpu: false,
  filesystem: false
});
var preds = require("./predictions.json");

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
