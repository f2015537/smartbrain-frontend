import React from 'react'
import './FaceRecognition.css'

 const FaceReognition = (props) => {
  return (
    <div className='center ma'>
      <div className="absolute mt2">
        <img id='inputimage' src={props.imageUrl} alt="sample" width='500px' height='auto'/>
        <div className='bounding-box' style={{top: props.box.topRow, right: props.box.rightCol, bottom: props.box.bottomRow, left: props.box.leftCol}}></div>
      </div>
    </div>
  )
}

export default FaceReognition