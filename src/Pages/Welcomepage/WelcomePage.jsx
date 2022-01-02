import react, { useEffect, useRef, useState } from "react"
import "./WelcomePage.css"
import Cookies from "js-cookie"
// import Logo from "../../component/logo/logo";
import Navbar from "../../component/navbar/navbar";
import BackgroundAnimation from '../../component/BackgroundAnimation/BackgroundAnimation'
import welcomePageTop from '../../images/welcomepagetop.json'
import LottieAnimation from '../lottiAnimation'
import GlobalButton from "../../component/GlobalButton/GlobalButton";
import Logo from '../../component/logo/logo'
 
const WelcomePage=()=>{

    useEffect(()=>{
        const fetchData=()=>{
            const cookie=Cookies.get("x-auth-token");
            if(cookie)
            {
                window.location="/home";
            }
        }
        fetchData();

    },[])

    const welcomeSignUpButtonCLickHandler=()=>{
        window.location="/signup";
    }

    const welcomeLogInButtonCLickHandler=()=>{
        window.location="/login";
    }

    const welcomeContactButtonCLickHandler=()=>{
        window.location="/contact";
    }


    const ref = useRef();
  
    const observer = new IntersectionObserver(
      async([entry]) => {

        document.querySelector(".welcome-page-head-section-inner-div").style.width = "90%";

      }
    )
  
    useEffect(() => {
      observer.observe(ref.current)
      // Remove the observer as soon as the component is unmounted
      return () => {
        observer.disconnect()
      }
    },[]);

    return(
    <div className="welcome-page-full-div">
        <section className="welcome-page-head-section">
            <div ref={ref} className="welcome-page-head-section-inner-div">
            <div className="welcome-page-head-section-left-div">
                <div className="welcome-page-head-section-left-div-text">
                    <p>Welcome in the world</p>
                    <p>of</p>
                    <Logo
                        className = "welcome-page-logo"
                        scale = {1.5}
                    />
                </div>
                <div className="welcome-page-head-section-left-div-tagline">
                <div className="welcome-page-underline"></div>
                    <p>Connecting People</p>
                    <div className="welcome-page-button-div">
                    <GlobalButton
                        icon = {<i className = 'fas fa-user-plus'></i>}
                        text = {"  Sign up"}
                        style = {{marginRight : "10px"}}
                        onClick = {()=>{
                            window.location = "/signup"
                        }}
                        className = "navbar-global-buttons"
                    />
                    <GlobalButton
                        icon = {<i className="fas fa-sign-in-alt"></i>}
                        text = {"   Login"}
                        color = "#5CA3DF"
                        borderColor = "#5CA3DF"
                        backgroundColor = "#5CA3DF"
                        onClick = {()=>{
                            window.location = "/login"
                        }}
                        className = "navbar-global-buttons"
                    />
                    </div>
                </div>
            </div>
            
            <div className="welcome-page-head-section-right-div">
                <LottieAnimation
                    lotti = {welcomePageTop}
                    height = "100%"
                    width = "100%"
                />
            </div>
            </div>
        </section>
    </div>)
}

export default WelcomePage;