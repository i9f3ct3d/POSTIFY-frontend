import React from 'react';
import Avatar from '../Avatar/Avatar';
import LeftNavbarLinks from './components/leftnavbarlinks';
import './leftNavbar.css';

const LeftNavbar=(props)=>{

    const leftNavbarLinks = [
        <LeftNavbarLinks
            key={1}
            type = "saved"
            text = "saved"
            onClick = {()=>{window.location="/savedposts"}}
            delay = {1}
        />,
        <LeftNavbarLinks
            key={2}
            type = "friends"
            text = "friends"
            delay = {2}
        />,
        <LeftNavbarLinks
            key={3}
            type = "starred"
            text = "starred"
            delay = {3}
        />,
        <LeftNavbarLinks
            key={4}
            type = "memories"
            text = "memories"
            delay = {4}
        />

    ]

    return(
        <div className="left-navbar-full-div">
            <div className="left-navbar-inner-div">
                <div onClick={()=>{window.location = "/myprofile"}} className="left-navbar-profile-link-div">
                    <Avatar
                        height = "2rem"
                        width = "2rem"
                        image = {props && props.profilePic}
                    />
                    <span className="left-navbar-profile-link-text">{props && props.username}</span>
                </div>
                {
                    leftNavbarLinks.map((eachLink)=>{
                        return(
                            eachLink
                        );
                    })
                }
            </div>
        </div>
    );

}

export default LeftNavbar;