import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceReognition from './components/FaceReognition/FaceReognition'
import Particles from 'react-particles-js'
import Clarifai from 'clarifai';

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const app = new Clarifai.App({
  apiKey: 'bc3931e43d884a67aa83b7a1a904bd63'
 });

class App extends Component {
  state = {
    input: '',
    imageUrl: ''
  }

  onInputChange = e => this.setState({
    input: e.target.value
  })

  onButtonSubmit = () => {
    this.setState({
      imageUrl: this.state.input
    })
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
    .then(res => console.log(res.outputs[0].data.regions[0].region_info.bounding_box))
    .catch(console.log)

  }
  
  render() {
    return (
      <div className="App">
            <Particles className='particles'
              params={particlesOptions}
            />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
        onInputChange={this.onInputChange} 
        onButtonSubmit={this.onButtonSubmit} />
        <FaceReognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
