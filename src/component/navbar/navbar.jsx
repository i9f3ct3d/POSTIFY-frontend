import React, { useEffect, useState } from "react";
import axios from "axios";
import "./navbar.css";
import { BsHouse } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
import { BiUserPlus } from "react-icons/bi";
import { BsPen } from "react-icons/bs";
import { TiArrowBackOutline } from "react-icons/ti";

import NavbarLogo from '../../images/Post-ify.gif';
import Cookies from "js-cookie"
import NavbarDropDownDesk from "./components/navbarDropDownDesk";
import GlobalButton from "../GlobalButton/GlobalButton";

const Navbar=(props)=>
{
    const cookie=Cookies.get('x-auth-token');


    const [isLoggedin,changeIsLoggedin]=useState(true);
    const [userName,changeUserName]=useState("");
    const [userProfilePic , setUserProfilePic] = useState();
    const [matchedUsers , setMatchedUsers] = useState();
    const [mobileNavbarOpen , setMobileNavbarOpen] = useState(false);
    const [searchInputValue , setSearchInputValue] = useState("");
    const [lastCancelToken , setLastCancelToken] = useState(null);




    const removeBottomBorder=()=>{
        const  pathUrl = window.location.pathname;
        const navbarIcon=document.getElementsByClassName(getIconClass[pathUrl]);
        navbarIcon[0] && navbarIcon[0].classList.remove("color-bottom-border");
    }

    const getIconClass={
        "/home":"navbar-feed-icon",
        "/notification":"navbar-notification-icon",
        "/friendrequest":"navbar-friend-req-icon",
        "/newpost":"navbar-newpost-icon",
    }
    const  pathUrl = window.location.pathname;

    useEffect(()=>{
        const fetch=async()=>{

            const navbarIcon=document.getElementsByClassName(getIconClass[pathUrl]);
            navbarIcon[0] !== undefined && navbarIcon[0].classList.add("color-bottom-border");

            try {
                
                if(cookie !== undefined)
                {
                    const res=await axios.get(process.env.REACT_APP_BACKEND_API_URL+'home/?token='+cookie);
                    changeUserName(res.data.username);
                    setUserProfilePic(res.data.profilePic);
                }
            } catch (error) {
                removeBottomBorder();
                window.location="/error"
            }
        
        }
        
        
        if(cookie)
        {
            changeIsLoggedin(true);
        }
        else
        {
            changeIsLoggedin(false);
        }

        fetch();
    },[])

    

    const searchBarOnChangeHandler=async(event)=>{
        event.preventDefault();

        lastCancelToken && lastCancelToken.cancel();

        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        setLastCancelToken(source);

        const searchedName = event.target.value;

        setSearchInputValue(searchedName);

        try {
            
            const res = await axios.post(process.env.REACT_APP_BACKEND_API_URL+"findusers?token="+cookie,{"searchedName":searchedName},{
                cancelToken : source.token
            });

            if(res.status === 200){

                setMatchedUsers(res.data.users);
                setLastCancelToken(null);
                
            }
            
            

        } catch (error) {
            
            const e = new Error(error);

            if(e.message !== "Cancel"){
                window.location="/error";
            }
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

    const onLogoClickHandler = () => {

        console.log("clciked");

        const leftNavbar = document.querySelectorAll(".left-navbar-full-div");

        leftNavbar.forEach(l => {
            l.style.left = "0"
        });

    }

    return(
        <div>

            <NavbarDropDownDesk
                profileImg = {userProfilePic && userProfilePic}
                userName = {userName ? userName : null}
                cookie = {cookie ? true : false}
            />

            <div className="navbar-mobile-icons-div">
                
                <div className="navbar-mobile-icons-inside-div">
                
                <div className="navbar-mobile-icon navbar-mobile-feed-icon" style={{color:pathUrl === "/home" && "blue"}} onClick={()=>{window.location="/home";removeBottomBorder();}}>

                    <BsHouse/>
                </div>
                <div className="navbar-mobile-icon navbar-mobile-friend-req-icon" style={{color:pathUrl === "/friendrequest" && "blue"}} onClick={()=>{window.location="/friendrequest";removeBottomBorder();}}>
                    <BiUserPlus/>
                </div>
                <div className="navbar-mobile-icon navbar-mobile-notification-icon" style={{color:pathUrl === "/friendsuggestion" && "blue"}} onClick={()=>{window.location="/notification";removeBottomBorder();}}>
                    <IoNotificationsOutline/>
                </div>
                <div className="navbar-mobile-icon navbar-mobile-newpost-icon" style={{color:pathUrl === "/newpost" && "blue"}} onClick={()=>{window.location="/newpost";removeBottomBorder();}}>
                    <BsPen/>
                </div>
                </div>


            </div>



            {cookie!==undefined && <div className="navbar-search-div" style={{zIndex:matchedUsers!== undefined && matchedUsers.length>0 && "12"}}>
                    <input value={searchInputValue} autoComplete="off" required className="navbar-search-input" type="text" name="searchedUserName" onChange={searchBarOnChangeHandler}/>                   
                    <span className="placeholder"><i className="fas fa-search"></i>{" Search Users"}</span>
                    
                </div>}





            <div className="navbar-searched-users-div" style={{left : matchedUsers!== undefined && searchInputValue && matchedUsers.length>0 && "0" , opacity :  matchedUsers!== undefined && searchInputValue && matchedUsers.length>0 && "1" , pointerEvents :  matchedUsers!== undefined && searchInputValue && matchedUsers.length>0 && "unset"}}>
                    <div className="search-bar-back-icon" onClick={()=>{setSearchInputValue("")}}><TiArrowBackOutline/></div>
                    {/* <div className="post-card-underline" style={{height:"1px",marginLeft:"0",marginTop:"2.5px",width:"90%"}}></div> */}
                    <div className="searched-users-outer-div">
                    {
                        (matchedUsers!== undefined && matchedUsers.length > 0) &&
                        matchedUsers.map((eachUser)=>{
                            return(
                                <div onClick={(e)=>{
                                        e.preventDefault();
                                        window.location="/profilepage?searcheduserid="+eachUser._id;
                                        }} key={eachUser._id}>
                                <div className="searched-users">
                                    <img src ={eachUser.usingGoogleAuth ? eachUser.profilePic: (eachUser.profilePic?process.env.REACT_APP_BACKEND_API_URL+eachUser.profilePic:"https://qph.fs.quoracdn.net/main-qimg-2b21b9dd05c757fe30231fac65b504dd")} />
                                    <h5>{eachUser.username}</h5>
                                </div>
                                
                                </div> 
                            );
                        })
                    }
                    </div>
                    </div>
                
                <div style={{boxShadow : window.location.pathname === "/welcomepage" && "none" , background : window.location.pathname === "/welcomepage" && "transparent"}} className="navbar-top">
                <div className="navbar-logo-div">
                    <img onClick = {onLogoClickHandler} src={NavbarLogo}/>
                </div>

                

                {cookie !== undefined && 
                <div onClick={mobileNavButtonClickHandler} className="mobile-navigation-switch">
                    
                    <div className="hamburger-button">

                    </div>
                    
                </div>}
                
                <div style={{display : !cookie && "none"}} className="navbar-icons-div">
                    <div className="navbar-icon navbar-feed-icon" onClick={()=>{window.location="/home";removeBottomBorder();}}>
                        <BsHouse/>
                    </div>
                    <div className="navbar-icon navbar-friend-req-icon" onClick={()=>{window.location="/friendrequest";removeBottomBorder();}}>
                        
                        <BiUserPlus/>
                    </div>
                    <div className="navbar-icon navbar-notification-icon" onClick={()=>{window.location="/notification";removeBottomBorder();}}>
                        
                        <IoNotificationsOutline/>
                    </div>
                    <div className="navbar-icon navbar-newpost-icon" onClick={()=>{window.location="/newpost";removeBottomBorder();}}>
                        
                        <BsPen/>
                    </div>
                </div>

                
                
                <div className="navbar-login-signup-logout-div">
                    <div className="navbar-userdetatil" style={{display:isLoggedin?"inline-flex":"none"}}>
                        <div className="navbar-userpic" onClick={()=>{window.location="/myprofile"}}
                            >
                            <img id="user-profile-pic" src = {userProfilePic?(userProfilePic[0] == 'u' ?  (process.env.REACT_APP_BACKEND_API_URL+userProfilePic) : userProfilePic):"https://qph.fs.quoracdn.net/main-qimg-2b21b9dd05c757fe30231fac65b504dd"} />
                            
                        </div>
                    </div>

                    {!isLoggedin && <GlobalButton
                        icon = {<i className = 'fas fa-user-plus'></i>}
                        text = {"  Sign up"}
                        style = {{marginRight : "10px"}}
                        onClick = {()=>{
                            removeBottomBorder();
                            window.location = "/signup"
                        }}
                        className = "navbar-global-buttons"
                    />}
                    {!isLoggedin && <GlobalButton
                        icon = {<i className="fas fa-sign-in-alt"></i>}
                        text = {"   Login"}
                        color = "#5CA3DF"
                        borderColor = "#5CA3DF"
                        backgroundColor = "#5CA3DF"
                        onClick = {()=>{
                            removeBottomBorder();
                            window.location = "/login"
                        }}
                        className = "navbar-global-buttons"
                    />}
                </div>
            </div>
        </div>
        
    )
}
export default React.memo(Navbar);