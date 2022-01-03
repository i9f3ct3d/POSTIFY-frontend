import {memo, useEffect, useState} from "react";
import PostForm from "../PostForm/PostForm"
import axios from "axios";
import Cookies from "js-cookie";
import "./NewPostPage.css"

const NewPostPage=(props)=>{
    const[user , setUser]=useState();

    useEffect(() => {

        props && props.hideLeftNavbar && props.hideLeftNavbar();
    
    },[])
    
    useEffect(()=>{

        props && props.setProgress && props.setProgress(10);

        const cookie=Cookies.get('x-auth-token');
        const fetchData = async () => {
            try {
                const res=await axios.get(process.env.REACT_APP_BACKEND_API_URL+'newpost/?token='+cookie);

                props && props.setProgress && props.setProgress(40);

                if(res.status===200)
                {               
                    setUser(res.data.user);
                }
                
                props && props.setProgress && props.setProgress(100);

            } catch (error) {
                
                window.location="/error";
            }
        };
        fetchData();
    },[])

    useEffect(() => {

        const rightOnlineUsersBar = document.getElementById('#right__online-users__bar');
        if(rightOnlineUsersBar){
            rightOnlineUsersBar.style.backgroundColor = '#242527'
            rightOnlineUsersBar.style.height = '100vh'
            rightOnlineUsersBar.style.transform = 'translateX(101%) translateZ(0)'
            rightOnlineUsersBar.style.boxShadow = '-8px -4px 10px rgba(0 , 0 , 0 , 0.5)'
        }

        const crossCloser = document.getElementById('#right__online-users__bar-cross-closer');
        if(crossCloser){
            crossCloser.style.display = 'inline-block'
        }

    },[])
    
    return(
        <div className="new-post-page-full-container">
        <div className="new-post-page-container">      
            {user && <PostForm
                userid={user._id}
                username={user.username}
                userProfilePic={user.profilePic && user.profilePic}
            />}
        </div>
        </div>
    )
}

export default memo(NewPostPage);