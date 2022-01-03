import { lazy, Suspense, memo } from "react";
import backgroundAnimation from "../../images/backgroundLotti.json";
import "./BackgroundAnimation.css";
const LottieAnimation = lazy(() => import("../../Pages/lottiAnimation"));

function BackgroundAnimation() {
  return (
    <div className="background-image-container-full-page">
      <Suspense fallback={<></>}>
        <LottieAnimation
          lotti={backgroundAnimation}
          height="calc(100vh - 70px)"
          width="100vw"
        />
      </Suspense>
    </div>
  );
}

export default memo(BackgroundAnimation);
