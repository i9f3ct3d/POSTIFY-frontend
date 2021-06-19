import react, { useEffect } from "react"
import "./WelcomePage.css"
import Cookies from "js-cookie"
import Logo from "../../component/logo/logo";
import Navbar from "../../component/navbar/navbar";
import Feature1Png from "../../images/feature1.png"
import Feature3Png from "../../images/deletepost.png"
import Feature2Png from "../../images/newpost.png"
import Footer from "../../component/footer/footer"
 
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
    
    
    return(
    <div className="welcome-page-div">
    <Navbar/>
    <div className="welcome-page-content-div">
    <header className="welcome-page-header">
    <div className="header-tag-line">
    <div className="header-top-line-div">
    <h1>Welcome in the</h1>
    <h1>World</h1>
    <h2>of</h2>
    </div>
    <Logo/>
        <h1>
            Connecting People
        </h1>
        <div className="welcome-page-button-div">
        <button onClick={welcomeSignUpButtonCLickHandler} className="welcome-page-buttons welcome-page-signup-button">Sign up</button>
        <button onClick={welcomeLogInButtonCLickHandler} className="welcome-page-buttons welcome-page-login-button">Login</button>
        </div>
    </div>
    </header>
    <section className="feature-section">
    <div className="feature-section-div">
        <h1 className="feature-section-top-line" >Our Features</h1>
        <div className="welcome-page-top-underline">

        </div>
        <div className="feature feature-viewposts">
        <div className="feature-img-container">
        <img src={Feature2Png} style={{visibility:"hidden"}}/>
        </div>
            
            <div className="feature-info">
            <h4 >Connect with the world through the posts</h4>
            <h5>See any of these posts and stay tuned !! Always get updated</h5>
            </div>
            
        </div>
        <div className="welcome-page-underline">
            
        </div>
        <div className="feature feature-writeposts">
            <div className="feature-img-container">
        <img src={Feature2Png}  style={{visibility:"hidden"}}/>
        </div>
        <div className="feature-info">
            <h4>Share your whole day with your near ones</h4>
            <h5 >Why not to make others jealous of you!! C'mon share a part of your extatic day</h5>
            </div>
        </div>
        <div className="welcome-page-underline">
            
        </div>
        <div className="feature feature-deleteposts">
        <div className="feature-img-container">
        <img src={Feature2Png} style={{visibility:"hidden"}}/>
        </div>
            <div className="feature-info">
            <h4>Get Control over your posts</h4>
            <h5 >Feelign a bit shaky about your post...Delete it in notime</h5>
            </div>
        </div>
        <div className="welcome-page-underline">
            
        </div>
        <div className="feature feature-commentposts">
            <div className="feature-img-container">
        <img src={Feature2Png} style={{visibility:"hidden"}}/>
        </div>
        <div className="feature-info">
            <h4 >Show your expressions through comments</h4>
            <h5>You may also share your thoughts throw the comments in other's posts</h5>
            </div>
            
        </div>
        <div style={{backgroundColor:"rgba(220, 20, 60, 0.534)"}} className="welcome-page-top-underline">
            
        </div>
        </div>
    </section>
    <section className="welcome-page-contact-section"> 
        <h1>We would love to hear from you</h1>
        <button onClick={welcomeContactButtonCLickHandler} >Contact Us</button>
    </section>
    <footer className="welcome-page-footer">
         <Footer/>
    </footer>
    </div>
    </div>)
}

export default WelcomePage;