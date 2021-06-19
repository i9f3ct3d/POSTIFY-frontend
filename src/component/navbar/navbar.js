import react, { useEffect, useState } from "react";
import axios from "axios";
import "./navbar.css";

import Cookies from "js-cookie"

import Logo from "../logo/logo";

const Navbar=props=>
{
    const cookie=Cookies.get('x-auth-token');
    const [isNavbarButtonClicked,changeisNavbarButtonClicked]=useState(false);
    const [isLoggedin,changeIsLoggedin]=useState(true);

    const [userName,changeUserName]=useState("");
    const [userEmail,chnageUserEmail]=useState("");
    const [userProfilePic , setUserProfilePic] = useState();

    const [isUserdivVisible,changeIsUserdivVisible]=useState(false);
    const [matchedUsers , setMatchedUsers] = useState();
    const [mobileNavbarOpen , setMobileNavbarOpen] = useState(false);


    const removeBottomBorder=()=>{
        const  pathUrl = window.location.pathname;
        const navbarIcon=document.getElementsByClassName(getIconClass[pathUrl]);
        navbarIcon[0].classList.remove("color-bottom-border");
    }

    const getIconClass={
        "/home":"navbar-feed-icon",
        "/friendsuggestion":"navbar-friend-suggestion-icon",
        "/friendrequest":"navbar-friend-req-icon",
        "/newpost":"navbar-newpost-icon",
    }

    useEffect(()=>{
        const fetch=async()=>{


            const  pathUrl = window.location.pathname;
            const navbarIcon=document.getElementsByClassName(getIconClass[pathUrl]);
            navbarIcon[0] !== undefined && navbarIcon[0].classList.add("color-bottom-border");

            try {
                
                if(cookie !== undefined)
                {
                    const res=await axios.get(process.env.REACT_APP_BACKEND_API_URL+'home/?token='+cookie);
                    changeUserName(res.data.username);
                    chnageUserEmail(res.data.useremail);
                    setUserProfilePic(res.data.profilePic);
                }
            } catch (error) {
                removeBottomBorder();
                window.location="/error"
            }
        
        }
        fetch();
        
        if(cookie)
        {
            changeIsLoggedin(true);
        }
        else
        {
            changeIsLoggedin(false);
        }
    },[])

    const handleButtonClick=e=>
    {
        if(e.target.name==="signup")
        {
            removeBottomBorder();

            window.location="/signup";
        }
        else if(e.target.name==="login")
        {
            removeBottomBorder();
            window.location="/login";
        }
        else if(e.target.name==="makepost")
        {
            removeBottomBorder();
            window.location="/newpost";
        }
        else if(e.target.name==="home")
        {
            removeBottomBorder();
            window.location="/home";
        }
        else if(e.target.name==="mypost")
        {
            removeBottomBorder();
            window.location="/mypost";
        }
        else if(e.target.name==="contact")
        {
            removeBottomBorder();
            window.location="/contact";
        }
        else
        {
            removeBottomBorder();
            Cookies.remove('x-auth-token');
            window.location="/login"
        }
    }
    const handleNavbarSliderButtonClick=(event)=>
    {
        const pointer=document.getElementsByClassName("fa-chevron-right")[0];

        const homeButton=document.getElementsByName("home")[0];
        const makePostButton=document.getElementsByName("makepost")[0];
        const myPostButton=document.getElementsByName("mypost")[0];
        const signinButton=document.getElementsByName("signup")[0];
        const loginButton=document.getElementsByName("login")[0];
        const logoutButton=document.getElementsByName("logout")[0];
        changeisNavbarButtonClicked(!isNavbarButtonClicked);
        if(pointer)
        {
            if(!isNavbarButtonClicked)
            {
                pointer.style.left="75%";
                setTimeout(() => {
                    pointer.style.transform="rotatez(-180deg)";
                    
                    homeButton.style.left="50%";
                    setTimeout(() => {
                        makePostButton.style.left="50%";
                        setTimeout(() => {
                            myPostButton.style.left="50%";
                            setTimeout(() => {
                                signinButton.style.left="20%";
                                loginButton.style.left="80%";
                                setTimeout(() => {
                                    logoutButton.style.top="85%";
                                }, 200);
                            }, 200);
                        }, 200);
                    }, 200);
                }, 200);
            }
            else
            {
                pointer.style.left="0%";
                homeButton.style.left="-50%";
                makePostButton.style.left="-50%";
                myPostButton.style.left="-50%";
                signinButton.style.left="-50%";
                loginButton.style.left="-50%";
                logoutButton.style.top="185%";
                setTimeout(() => {
                    pointer.style.transform="rotatez(0deg)";


                }, 200);
            }
        }
    }

    const searchBarOnChangeHandler=async(event)=>{
        event.preventDefault();
        const searchedName = event.target.value;

        try {
            
            const res = await axios.post(process.env.REACT_APP_BACKEND_API_URL+"findusers?token="+cookie,{"searchedName":searchedName});


            setMatchedUsers(res.data.users);

        } catch (error) {
            window.location="/error";
        }
    }

    const mobileNavButtonClickHandler=()=>{
        const menuButton = document.querySelector(".mobile-navigation-switch");
        if(mobileNavbarOpen){
            menuButton.classList.remove("open-mobile-navbar");
            setMobileNavbarOpen(false);
        }else{
            menuButton.classList.add("open-mobile-navbar");
            setMobileNavbarOpen(true);
        }
    }

    return(
        <div>
            <div className="navbar-left-slider"
            
                style={{left:isNavbarButtonClicked?"0":"-50%"}}
                >
                <div className="navbar-left-slider-content">
                <div className="navabar-left-logo-div">
                    <Logo scale=".4"/>
                </div>
                <button className="navabr-left-slider-button__home" onClick={handleButtonClick} name="home">HOME</button>
                <button className="navabr-left-slider-button__home" onClick={handleButtonClick} name="contact">CONTACT US</button>
                <button className="navabr-left-slider-button__makepost" style={{display:!isLoggedin?"none":"table-cell"}} onClick={handleButtonClick} name="makepost">MAKE POST</button>
                <button className="navabr-left-slider-button__mypost" style={{display:!isLoggedin?"none":"table-cell"}} onClick={handleButtonClick} name="mypost">MY POSTS</button>
                <button className="navabr-left-slider-button__signin" style={{display:isLoggedin?"none":"table-cell"}} onClick={handleButtonClick} name="signup">SIGN UP</button>
                <button className="navabr-left-slider-button__login" style={{display:isLoggedin?"none":"table-cell"}} onClick={handleButtonClick} name="login">LOG IN</button>
                <button className="navabr-left-slider-button__logout" style={{display:!isLoggedin?"none":"table-cell"}} onClick={handleButtonClick} name="logout">LOG OUT</button>
                </div>
            </div>
            <div className="navbar-right-slider"
                
            >
            </div>
            <div className="navbar-top">
                <div className="navbar-slider-button" onClick={handleNavbarSliderButtonClick}>
                    <i className="fas fa-chevron-right"></i>
                    <p style={{left:!isNavbarButtonClicked?"30%":"10%"}}>MENU</p>
                </div>
                {cookie!==undefined && <div className="navbar-search-div">
                    <input autoComplete="off" required className="navbar-search-input" type="text" name="searchedUserName" onChange={searchBarOnChangeHandler}/>
                    <span className="placeholder" ><i className="fas fa-search"></i>Search Users</span>
                    <div className="navbar-searched-users-div" style={{left : matchedUsers!== undefined && matchedUsers.length>0 && "0" , boxShadow : matchedUsers!== undefined && matchedUsers.length>0 && "5px 5px 3px rgba(128, 128, 128, 0.719)"}}>
                    {
                        (matchedUsers!== undefined && matchedUsers.length > 0) &&
                        matchedUsers.map((eachUser)=>{
                            return(
                                <div>
                                <div className="searched-users" key={eachUser._id}>
                                    <img src ={eachUser.profilePic?process.env.REACT_APP_BACKEND_API_URL+eachUser.profilePic:"https://qph.fs.quoracdn.net/main-qimg-2b21b9dd05c757fe30231fac65b504dd"} />
                                    <h5>{eachUser.username}</h5>
                                </div>
                                <div className="post-card-underline" style={{height:"1px",marginLeft:"0",marginTop:"2.5px",marginBottom:"2.5px"}}></div>
                                </div> 
                            );
                        })
                    }


                    </div>
                </div>}
                {cookie !== undefined && 
                <div onClick={mobileNavButtonClickHandler} className="mobile-navigation-switch">
                    
                    <div className="hamburger-button">

                    </div>
                    
                </div>}
                
                <div className="navbar-icons-div">
                    <div className="navbar-icon navbar-feed-icon" onClick={()=>{window.location="/home";removeBottomBorder();}}>
                        <i  className="fas fa-rss fa-2x"></i>
                    </div>
                    <div className="navbar-icon navbar-friend-suggestion-icon" onClick={()=>{window.location="/friendsuggestion";removeBottomBorder();}}>
                        <i  className="fas fa-users fa-2x"></i>
                    </div>
                    <div className="navbar-icon navbar-friend-req-icon" onClick={()=>{window.location="/friendrequest";removeBottomBorder();}}>
                        <i  className="fas fa-user-plus fa-2x"></i>
                    </div>
                    <div className="navbar-icon navbar-newpost-icon" onClick={()=>{window.location="/newpost";removeBottomBorder();}}>
                        <i  className="far fa-edit fa-2x"></i>
                    </div>
                </div>
                
                <div className="navbar-login-signup-logout-div">
                    <div className="navbar-userdetatil" style={{display:isLoggedin?"inline-flex":"none"}}>
                        <div className="navbar-userpic" onMouseOver={
                                async()=>{
                                    changeIsUserdivVisible(true);
                                }
                            }
                            onMouseLeave={()=>{
                                changeIsUserdivVisible(false);
                            }}
                            >
                            <img id="user-profile-pic" src = {userProfilePic?process.env.REACT_APP_BACKEND_API_URL+userProfilePic:"https://qph.fs.quoracdn.net/main-qimg-2b21b9dd05c757fe30231fac65b504dd"} />
                            
                            <div className="navbar-userinfo-div" style={{display:isUserdivVisible?"block":"none"}}>
                                <p>Logged in as :</p>
                                <h1>{userName}</h1>
                                <h2>{userEmail}</h2>
                            </div>
                        </div>
                        <button type="button" id="navbar-top-button__logout" className="navbar-top-button" name="logout" onClick={handleButtonClick}>LogOut</button>
                    </div>
                    <button type="button" id="navbar-top-button__signup" className="navbar-top-button" name="signup" style={{display:isLoggedin?"none":"inline-flex"}} onClick={handleButtonClick}>Sign up</button>
                    <button type="button" id="navbar-top-button__login" className="navbar-top-button" name="login" style={{display:isLoggedin?"none":"inline-flex"}} onClick={handleButtonClick}><i className="fas fa-sign-in-alt "></i>  Login</button>
                </div>
            </div>
            <div className="navbar-block-touch" style={{display:isNavbarButtonClicked?"block":"none"}} onClick={handleNavbarSliderButtonClick}>

            </div>
        </div>
        
    )
}
export default Navbar;