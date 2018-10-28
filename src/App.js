import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceReognition from './components/FaceReognition/FaceReognition'
import SignIn from './components/Auth/SignIn'
import Register from './components/Auth/Register'
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
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false
  }

  calculateFaceLocation = data => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputimage')
    const width = Number(image.width)
    const height = Number(image.height)
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height
    }
  }

  displayFaceBox = box => {
    this.setState({
      box
    })
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
    .then(res => this.displayFaceBox(this.calculateFaceLocation(res)))
    .catch(console.log)
  }

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState({isSignedIn: false})
    }else if(route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({
      route
    })
  }
  
  render() {
   const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
            <Particles className='particles'
              params={particlesOptions}
            />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
       { route === 'home' ? 
       <div>
          <Logo />
          <Rank />
          <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit} />
          <FaceReognition box={box} imageUrl={imageUrl}/>
        </div>
       
       :
          route === 'signin' ? 
          <SignIn onRouteChange={this.onRouteChange}/>
          :
          <Register onRouteChange={this.onRouteChange}/>
        }
      </div>
    );
  }
}

export default App;
