import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./navbar.css";
import { BsHouse } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
import { BiUserPlus } from "react-icons/bi";
import { BsPen } from "react-icons/bs";
import { TiArrowBackOutline } from "react-icons/ti";
import Cookies from "js-cookie"
import NavbarDropDownDesk from "./components/navbarDropDownDesk";
import GlobalButton from "../GlobalButton/GlobalButton";
import LogoLotti from '../../images/LogoLotti.json'
import LottiAnimation from "../../Pages/lottiAnimation";

import Avatar from "../Avatar/Avatar";
import noPicAvatar from '../../images/noPicAvatar.jpg'


const pathNameSet = new Set(
    ['/signup','/login','/welcomepage']
  );

const Navbar=(props)=>
{
    const cookie=Cookies.get('x-auth-token');
    const [viewingUser , setViewingUser] = useState(null);
    const [matchedUsers , setMatchedUsers] = useState();
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
                    const res=await axios.get(process.env.REACT_APP_BACKEND_API_URL+'fetchuser/?token='+cookie);
                    
                    if(res.status === 200 && res.data.credentials === "valid"){
                        setViewingUser(res.data.user);
                    }
                }
            } catch (error) {
                removeBottomBorder();
                window.location="/error"
            }
        
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

    const onLogoClickHandler = () => {

        const leftNavbar = document.querySelectorAll(".left-navbar-full-div");

        leftNavbar.forEach(l => {
            l.style.transform = "translateX(0) translateZ(0)"
        });

    }

    const searchedDivInputRef = useRef();
    const mobileSearchedDivRef = useRef();
    const searchedUsersDivRef = useRef();

    return(
        <div>

            <NavbarDropDownDesk
                profileImg = {viewingUser && viewingUser.profilePic}
                userName = {viewingUser ? viewingUser.username : null}
                cookie = {cookie ? true : false}
            />

            { !pathNameSet.has(window.location.pathname) && cookie && <div className="navbar-mobile-icons-div">
                
                <div className="navbar-mobile-icons-inside-div">
                
                <div className="navbar-mobile-icon navbar-mobile-feed-icon" style={{color:pathUrl === "/home" && "cyan"}} onClick={()=>{window.location="/home";removeBottomBorder();}}>

                    <BsHouse/>
                </div>
                <div className="navbar-mobile-icon navbar-mobile-friend-req-icon" style={{color:pathUrl === "/friendrequest" && "cyan"}} onClick={()=>{window.location="/friendrequest";removeBottomBorder();}}>
                    <BiUserPlus/>
                </div>
                <div className="navbar-mobile-icon navbar-mobile-notification-icon" style={{color:pathUrl === "/notification" && "cyan"}} onClick={()=>{window.location="/notification";removeBottomBorder();}}>
                    <IoNotificationsOutline/>
                </div>
                <div className="navbar-mobile-icon navbar-mobile-newpost-icon" style={{color:pathUrl === "/newpost" && "cyan"}} onClick={()=>{window.location="/newpost";removeBottomBorder();}}>
                    <BsPen/>
                </div>
                </div>


            </div>}


            {cookie !== undefined && 
            <div onClick = {(e) => {
                searchedDivInputRef.current.style.display = "block";
                searchedDivInputRef.current.style.zIndex = "14";
                mobileSearchedDivRef.current.style.display = "none"

                searchedUsersDivRef.current.style.transform = "translateX(0) translateZ(0)"
                searchedUsersDivRef.current.style.opacity = "1"
                searchedUsersDivRef.current.style.pointerEvents = "unset"


            }} ref = {mobileSearchedDivRef} className = "navbar-mobile-search-icon-div">
                <i className="fas fa-search navbar-mobile-search-icon"></i>
            </div>}

            {cookie!==undefined && <div ref = {searchedDivInputRef} className="navbar-search-div" style={{zIndex:matchedUsers!== undefined && matchedUsers.length>0 && "14"}}>
                    <input value={searchInputValue} autoComplete="off" required className="navbar-search-input" type="text" name="searchedUserName" onChange={searchBarOnChangeHandler}/>                   
                    <span className="placeholder"><i className="fas fa-search"></i>{" Search Users"}</span>
                    
                </div>}





            <div ref = {searchedUsersDivRef} className="navbar-searched-users-div" style={{transform : matchedUsers!== undefined && searchInputValue && matchedUsers.length>0 && "translateX(0) translateZ(0)" , opacity :  matchedUsers!== undefined && searchInputValue && matchedUsers.length>0 && "1" , pointerEvents :  matchedUsers!== undefined && searchInputValue && matchedUsers.length>0 && "unset"}}>
                    <div className="search-bar-back-icon" onClick={()=>{

                        searchedUsersDivRef.current.style.transform = "translateX(-101%) translateZ(0)"
                        searchedUsersDivRef.current.style.opacity = "0"
                        searchedUsersDivRef.current.style.pointerEvents = "none"

                        if(window.innerWidth <= 1173){
                            searchedDivInputRef.current.style.display = "none";
                            searchedDivInputRef.current.style.zIndex = "unset";
                            mobileSearchedDivRef.current.style.display = "block"
                        }

                        setSearchInputValue("")

                    }}><TiArrowBackOutline/></div>
                    <div className="searched-users-outer-div">
                    {
                        (matchedUsers!== undefined && matchedUsers.length > 0) &&
                        matchedUsers.map((eachUser)=>{
                            return(
                                <div onClick={(e)=>{
                                        e.preventDefault();

                                        if(viewingUser && eachUser._id === viewingUser._id){
                                            window.location = "/myprofile";
                                            return;
                                        }

                                        window.location="/profilepage?searcheduserid="+eachUser._id;
                                }} key={eachUser._id}>
                                <div className="searched-users">
                                    <Avatar
                                        image = {eachUser.usingGoogleAuth ? eachUser.profilePic: (eachUser.profilePic && process.env.REACT_APP_BACKEND_API_URL+eachUser.profilePic)}
                                        height = "3rem"
                                        width = "3rem"
                                        style = {{
                                            display: "table-cell",
                                            height: "3rem",
                                            width: "3rem",
                                            borderRadius: "3rem",
                                            border:"2px solid cyan",
                                            boxShadow: "2px 2px 3px rgba(0 , 0 , 0 , 0.5)",
                                        }}
                                    />
                                    <h5>{eachUser.username}</h5>
                                </div>
                                
                                </div> 
                            );
                        })
                    }
                    </div>
                    </div>
                
                <div style={{boxShadow : window.location.pathname === "/welcomepage" && "none" , background : window.location.pathname === "/welcomepage" && "transparent"}} className="navbar-top">
                <div onClick={onLogoClickHandler} className="navbar-logo-div">
                    <LottiAnimation
                        lotti = {LogoLotti}
                        height = "100%"
                        width = "100%"
                    />
                </div>

            
                
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
                    <div className="navbar-userdetatil" style={{display:(!pathNameSet.has(window.location.pathname) && cookie)?"inline-flex":"none"}}>
                        <div className="navbar-userpic" onClick={()=>{window.location="/myprofile"}}
                            >
                            <img id="user-profile-pic" src = {viewingUser && viewingUser.profilePic ?(viewingUser.profilePic[0] == 'u' ?  (process.env.REACT_APP_BACKEND_API_URL+viewingUser.profilePic) : viewingUser.profilePic):noPicAvatar} />
                            
                        </div>
                    </div>

                    {(pathNameSet.has(window.location.pathname) || (window.location.pathname == '/contact' && !cookie)) && <GlobalButton
                        icon = {<i style = {{marginRight : "10px"}} className = 'fas fa-user-plus'></i>}
                        text = {"  Sign up"}
                        style = {{marginRight : "10px"}}
                        onClick = {()=>{
                            removeBottomBorder();
                            window.location = "/signup"
                        }}
                        className = "navbar-global-buttons"
                    />}
                    {(pathNameSet.has(window.location.pathname) || (window.location.pathname == '/contact' && !cookie)) && <GlobalButton
                        icon = {<i style = {{marginRight : "10px"}} className="fas fa-sign-in-alt"></i>}
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