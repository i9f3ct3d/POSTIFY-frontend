import React , {forwardRef} from "react";
import Lottie from "react-lottie";

const LottieStarAnimation = ({ lotti, width, height , isStopped , isloop} , ref) => {

    

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: lotti,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
      clearCanvas : true,
    },
    
  };

  return (

    <div>
      <Lottie isClickToPauseDisabled = {true} isStopped = {isStopped ? isStopped : false} ref={ref} options={defaultOptions} height={height} width={width} />
    </div>
    
  );
};

export default forwardRef(LottieStarAnimation);