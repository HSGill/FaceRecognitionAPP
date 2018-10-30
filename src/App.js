import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import './App.css'
import Clarifai from 'clarifai';
import FaceRecognition1 from './components/FaceRecognition1/FaceRecognition1';
 
const app = new Clarifai.App({
  apiKey: 'd1a6264cdf804d4aa2256b2ccf615aef'
 });
const particlesOptions = {
  particles: {
 number:{
   value:30,
   density:{
     enable:true,
     value_area:800
   }
 }
  }
}
class App extends Component {
  constructor (){
    super();
    this.state ={
      input:'',
      imageUrl:''
    }
  }
  onInputChange =(event) =>{
    this.setState({input:event.target.value});
    
  }

  onSubmit =() =>{

    this.setState({imageUrl:this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, 
    "https://samples.clarifai.com/face-det.jpg").then(
    function(response) {
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    },
    function(err) {
      // there was an error
    }
  );
  }
  render() {
    return (
      <div className="App">
      <Particles className="particles"
              params={particlesOptions}
              
            />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit ={this.onSubmit}/>
        <FaceRecognition1 imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}
export default App;
