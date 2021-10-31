import React from 'react'
import LottieAnimation from '../../Pages/lottiAnimation'
import backgroundAnimation from '../../images/modernBackgroundAnimation.json';
import backgroundGoldAnimation from '../../images/backgroundGoldAnimation.json';
import './BackgroundAnimation.css'

function BackgroundAnimation() {
    return (
        <div className="background-image-container-full-page">
        <div style={{right : "0" , transform : "scaleX(-1)"}} className="background-image-container">
        <LottieAnimation
          lotti = {backgroundAnimation}
          height = "110vh"
          width = "100vw"
          speed = {3}
        />
      </div>
      <div style={{left : "0"}} className="background-image-container">
        <LottieAnimation
          lotti = {backgroundGoldAnimation}
          height = "150vh"
          width = "100vw"
          speed = {3}
        />
      </div>
        </div>
    )
}

export default React.memo(BackgroundAnimation)
