import React from 'react'

 const FaceReognition = (props) => {
  return (
    <div className='center ma'>
      <div className="absolute mt2">
        <img src={props.imageUrl} alt="sample" width='500px' height='auto'/>
      </div>
    </div>
  )
}

export default FaceReognition