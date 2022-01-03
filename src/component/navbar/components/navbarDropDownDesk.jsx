import React, { useRef } from 'react';

import './navbarDropDownDesk.css'
import {BsCaretDown} from 'react-icons/bs';
import Avatar from '../../Avatar/Avatar';
import Cookies from 'js-cookie';
import GlobalButton from '../../GlobalButton/GlobalButton';

const pathNameSet = new Set(
  ['/signup','/login','/contact']
);

const NavbarDropDownDesk = (props)=>{

    const cookie = Cookies.get('x-auth-token')

    const onlineUsersButtonClick = () => {

        const allOnlineUsersBar = document.querySelectorAll(".right-online-users-bar-full-div");

        allOnlineUsersBar.forEach(o => {
          o.style.transform = "translateX(0) translateZ(0)";
        });

        dropDownDeskCloseHandler();

    }

    const dropDownButtonRef = useRef();
    const dropDownDeskRef = useRef();

    const dropDownDeskOpenHandler = () => {

        dropDownDeskRef.current.style.transform = "translateX(0) translateY(0) translateZ(0) scale(1)"
        dropDownDeskRef.current.style.opacity = "1"
        dropDownDeskRef.current.style.pointerEvents = "unset";

    }
    
    const dropDownDeskCloseHandler = () => {
      dropDownDeskRef.current.style.transform = "translateX(40%) translateY(-45%) translateZ(0) scale(0.1)"
      dropDownDeskRef.current.style.opacity = "0"
      dropDownDeskRef.current.style.pointerEvents = "none";
    }

    return(
        <div
        ref = {dropDownButtonRef}
        className="newnavbar-dropdown-button">
                     <div className="newnavbar-dropdown-button-icon" onClick={()=>{
                       dropDownDeskOpenHandler();}}
                       >
                      <BsCaretDown/>
                     </div> 
                    
                    <div
                    ref = {dropDownDeskRef}
                    className="newnavbar-dropdown-desk">
                      <i onClick={()=>{dropDownDeskCloseHandler();}} className="fas fa-times newnavbar-dropdown-desk-close-button"></i>
                      <div style={{display : (pathNameSet.has(window.location.pathname) || !cookie) && "none"}} className="newnavbar-dropdown-desk-avatar">
                        <Avatar
                          onClick={()=>{window.location="/myprofile"}}
                          height="4rem"
                          width="4rem"
                          image={props && props.profileImg ? props.profileImg : null}
                        />
                        <p onClick={()=>{window.location="/myprofile"}} className="newnavbar-dropdown-desk-avatar-username">{(props && props.userName!= null) && props.userName}</p>
                      </div>
                      <div style={{display : (pathNameSet.has(window.location.pathname) || !cookie) && "none"}}  className="newnavbar-dropdown-desk-underline"></div>
                     <div onClick = { () => {

                        window.open("https://sushantasaren.vercel.app/")
                       
                     }} className="newnavbar-dropdown-desk-aboutus">
                        <i className="far fa-address-card newnavbar-dropdown-desk-aboutus-icon"></i>
                        <p className="newnavbar-dropdown-desk-avatar-aboutus-text">About me</p>
                      </div>
                      <div onClick={()=>{window.open("/contact")}} className="newnavbar-dropdown-desk-aboutus">
                        <i style={{color : "rgb(224, 198, 50)"}} className="far fa-paper-plane newnavbar-dropdown-desk-aboutus-icon"></i>
                        <p style={{color : "rgb(224, 198, 50)"}} className="newnavbar-dropdown-desk-avatar-aboutus-text">Contact me</p>
                      </div>
                      <div style={{display : (pathNameSet.has(window.location.pathname) || !cookie) && "none"}} onClick={onlineUsersButtonClick} className="newnavbar-dropdown-desk-aboutus">
                        <i style={{color : "greenYellow"}} className="fas fa-signal newnavbar-dropdown-desk-aboutus-icon"></i>
                        <p style={{color : "greenYellow"}} className="newnavbar-dropdown-desk-avatar-aboutus-text">Online users</p>
                      </div>

                    {!pathNameSet.has(window.location.pathname) && cookie && <GlobalButton
                        icon = {<i style = {{marginRight : "10px"}}  className = 'fas fa-sign-out-alt'></i>}
                        text = {"  Log out"}
                        style = {{width : "100%" , marginBottom : "5px"}}
                        color = "red"
                        borderColor = "red"
                        backgroundColor = "red"
                        onClick={()=>{

                          Cookies.remove('x-auth-token'); 
                          window.location="/login"

                        }}
                    />}

                    {(pathNameSet.has(window.location.pathname) || !cookie) && <GlobalButton
                        icon = {<i style = {{marginRight : "10px"}}  className = 'fas fa-sign-in-alt'></i>}
                        text = {"  Login"}
                        style = {{width : "100%" , marginBottom : "5px"}}
                        color = "#5CA3DF"
                        borderColor = "#5CA3DF"
                        backgroundColor = "#5CA3DF"
                        onClick = {()=>{
                            window.location = "/login"
                        }}
                    />}
                    {(pathNameSet.has(window.location.pathname) || !cookie) && <GlobalButton
                        icon = {<i style = {{marginRight : "10px"}}  className = 'fas fa-user-plus'></i>}
                        text = {"  Sign up"}
                        style = {{width : "100%"}}
                        onClick = {()=>{
                            window.location = "/signup"
                        }}
                    />}
                    </div>
                    
        </div>
    )
}

export default React.memo(NavbarDropDownDesk);