import React, { useEffect, useState } from 'react';
import './savedPostsPage.css';
import Navbar from '../../component/navbar/navbar'
import LeftNavbar from '../../component/leftNavbar/leftNavbar'
import axios from 'axios';
import Cookies from 'js-cookie';
import PostCard from '../../component/postCard/postCard';

const SavedPostsPage=()=>{

    const [posts , setPosts] = useState(null);
    const [viewingUser , setViewinguser] = useState(null);
    

    useEffect(()=>{

        const fetch=async()=>{

            try {

                const cookie = Cookies.get("x-auth-token");
                
                const res = await axios.get(process.env.REACT_APP_BACKEND_API_URL+"getsavedposts/?token="+cookie);
    
                if(res.status === 200){
                    
                    setPosts(res.data.savedPosts);
                    setViewinguser(res.data.viewingUser);
    
                }

            } catch (error) {
                
            }
            
        }

        fetch();

    },[])

    return(

        <div className="saved-posts-page-full-div">
            <Navbar/>
            <LeftNavbar
                profilePic = {viewingUser && viewingUser.profilePic}
                username = {viewingUser && viewingUser.username}
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