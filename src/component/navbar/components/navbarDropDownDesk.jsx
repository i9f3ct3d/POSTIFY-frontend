import React, { useEffect, useState } from 'react';

import './navbarDropDownDesk.css'
import {BsCaretDown} from 'react-icons/bs';
import Avatar from '../../Avatar/Avatar';
import Cookies from 'js-cookie';

const NavbarDropDownDesk = (props)=>{

    const [dropDownButtonClicked , setDropDownButtonClicked] = useState(false);


    const onlineUsersButtonClick = () => {

        const allOnlineUsersBar = document.querySelectorAll(".right-online-users-bar-full-div");

        allOnlineUsersBar.forEach(o => {
          o.style.right = "0";
        });

        setDropDownButtonClicked(prev => !prev);

    }

    return(
        <div style={{overflow : !dropDownButtonClicked && "hidden"}} className="newnavbar-dropdown-button">
                     <div className="newnavbar-dropdown-button-icon" onClick={()=>{setDropDownButtonClicked(prev => !prev)}}>
                      <BsCaretDown/>
                     </div> 
                    
                    <div style={{zIndex :  dropDownButtonClicked && "100", height :  dropDownButtonClicked && "auto" , width :  dropDownButtonClicked && "15rem" ,top :  dropDownButtonClicked && "-5px" ,  opacity :  dropDownButtonClicked && "1" , borderRadius :  dropDownButtonClicked && "10px"}} className="newnavbar-dropdown-desk">
                      <i onClick={()=>{setDropDownButtonClicked(prev => !prev)}} className="fas fa-times newnavbar-dropdown-desk-close-button"></i>
                      <div style={{display : props && !props.cookie && "none"}} className="newnavbar-dropdown-desk-avatar">
                        <Avatar
                          onClick={()=>{window.location="/myprofile"}}
                          height="4rem"
                          width="4rem"
                          image={props && props.profileImg ? props.profileImg : null}
                        />
                        <p onClick={()=>{window.location="/myprofile"}} className="newnavbar-dropdown-desk-avatar-username">{(props && props.userName!= null) && props.userName}</p>
                      </div>
                      <div style={{display : props && !props.cookie && "none"}}  className="newnavbar-dropdown-desk-underline"></div>
                     <div className="newnavbar-dropdown-desk-aboutus">
                        <i className="far fa-address-card newnavbar-dropdown-desk-aboutus-icon"></i>
                        <p className="newnavbar-dropdown-desk-avatar-aboutus-text">About me</p>
                      </div>
                      <div onClick={()=>{window.location="/contact"}} className="newnavbar-dropdown-desk-aboutus">
                        <i style={{color : "rgb(224, 198, 50)"}} className="far fa-paper-plane newnavbar-dropdown-desk-aboutus-icon"></i>
                        <p style={{color : "rgb(224, 198, 50)"}} className="newnavbar-dropdown-desk-avatar-aboutus-text">Contact me</p>
                      </div>
                      <div onClick={onlineUsersButtonClick} className="newnavbar-dropdown-desk-aboutus">
                        <i style={{color : "greenYellow"}} className="fas fa-signal newnavbar-dropdown-desk-aboutus-icon"></i>
                        <p style={{color : "greenYellow"}} className="newnavbar-dropdown-desk-avatar-aboutus-text">Online users</p>
                      </div>
                    <div style={{display : props && !props.cookie && "none"}}  onClick={()=>{Cookies.remove('x-auth-token'); window.location="/login"}} className="newnavbar-dropdown-desk-logout">
                        <i className="fas fa-sign-out-alt newnavbar-dropdown-desk-logout-icon"></i>
                        <p className="newnavbar-dropdown-desk-avatar-logout-text">Log out</p>
                    </div>
                    </div>
                    
        </div>
    )
}

export default NavbarDropDownDesk;