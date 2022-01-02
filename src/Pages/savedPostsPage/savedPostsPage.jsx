import React, { useEffect, useState } from 'react';
import './savedPostsPage.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import PostCard from '../../component/postCard/postCard';
import RightOnlineUsersBar from '../../component/rightOnlineUsersBar/rightOnlineUsersBar';

const SavedPostsPage=(props)=>{

    const [posts , setPosts] = useState(null);
    const [viewingUser , setViewingUser] = useState(null);

    useEffect(() => {

        if(window.innerWidth > 900) props && props.showLeftNavbar && props.showLeftNavbar();
        else props && props.hideLeftNavbar && props.hideLeftNavbar();
    
    },[])

    useEffect(()=>{

        const fetch=async()=>{

            props && props.setProgress && props.setProgress(10);
            try {

                const cookie = Cookies.get("x-auth-token");
                props && props.setProgress && props.setProgress(30);
                const res = await axios.get(process.env.REACT_APP_BACKEND_API_URL+"getsavedposts/?token="+cookie);
                props && props.setProgress && props.setProgress(80);
                if(res.status === 200){
                    
                    setPosts(res.data.savedPosts);
                    setViewingUser(res.data.viewingUser);
                     
                }

                props && props.setProgress && props.setProgress(100);

            } catch (error) {

                window.location = "/error";
            }
            
        }

        fetch();

    },[])


    return(

        <div className="saved-posts-page-full-div">
            <RightOnlineUsersBar
                viewingUserid={viewingUser && viewingUser._id}
            />

            {
                posts && viewingUser && posts.length > 0 && posts.map((eachPost)=>{

                    return(
                        <PostCard
                            viewingUserProfilePic = {viewingUser.profilePic}
                            userEmail = {viewingUser.email}
                            mainUserId = {viewingUser._id}
                            viewingUsername = {viewingUser.username}
                            post = {eachPost}
                            key = {eachPost._id}
                        />
                    );
                })
            }
        </div>

    );
}
export default SavedPostsPage;