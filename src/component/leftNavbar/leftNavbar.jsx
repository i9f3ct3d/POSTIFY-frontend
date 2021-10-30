import React from 'react';
import Avatar from '../Avatar/Avatar';
import LeftNavbarLinks from './components/leftnavbarlinks';
import './leftNavbar.css';
import { IoCloseOutline } from 'react-icons/io5'

const LeftNavbar=(props)=>{

    const leftNavbarLinks = [
        <LeftNavbarLinks
            key={1}
            type = "saved"
            text = "Saved"
            onClick = {()=>{window.location="/savedposts"}}
            delay = {1}
        />,
        <LeftNavbarLinks
            key={2}
            type = "friends"
            text = "Friends"
            delay = {2}
        />,
        <LeftNavbarLinks
            key={3}
            type = "starred"
            text = "Starred"
            delay = {3}
        />,
        <LeftNavbarLinks
            key={4}
            type = "memories"
            text = "Memories"
            delay = {4}
        />,
        <LeftNavbarLinks
            key={5}
            type = "weather"
            text = "Weather"
            delay = {5}
        />,
        <LeftNavbarLinks
        key={6}
            type = "groups"
            text = "Groups"
            delay = {6}
        />,
        <LeftNavbarLinks
            key={7}
            type = "pages"
            text = "Pages"
            delay = {7}
        />,
        <LeftNavbarLinks
            key={8}
            type = "messenger"
            text = "Messenger"
            delay = {8}
        />

    ]

    const rightNavbarCloseHandler = () => {

        const leftNavbar = document.querySelectorAll(".left-navbar-full-div");

        leftNavbar.forEach(l => {
            l.style.left = "-100%"
        });

    }

    return(
        <div className="left-navbar-full-div">
            <div onClick = {rightNavbarCloseHandler} className="left-navbar-mobile-cross-div">
                <IoCloseOutline
                    
                />
            </div>
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