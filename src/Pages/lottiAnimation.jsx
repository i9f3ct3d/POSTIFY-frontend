import React , {forwardRef, useEffect, useState} from "react";
import Lottie from "react-lottie";

const LottieAnimation = ({ lotti, width, height , isStopped , isloop , speed} , ref) => {

  const [modSpeed , setModSpeed] = useState(1);
    
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: lotti,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
      clearCanvas : true,
    },
    
  };

  useEffect(()=>{

    speed && setModSpeed(speed)

  },[speed])

  return (

    <div>
      <Lottie speed={modSpeed} isClickToPauseDisabled = {true} isStopped = {isStopped ? isStopped : false} ref={ref} options={defaultOptions} height={height} width={width} />
    </div>
    
  );
};

export default React.memo(forwardRef(LottieAnimation));