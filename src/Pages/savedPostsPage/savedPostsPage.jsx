import { useEffect, useState, lazy, Suspense, memo } from 'react';
import './savedPostsPage.css';
import axios from 'axios';
import Cookies from 'js-cookie';
const PostCard = lazy(() => import( '../../component/postCard/postCard'))

const SavedPostsPage=(props)=>{

    const [posts , setPosts] = useState(null);
    const [viewingUser , setViewingUser] = useState(null);

    useEffect(() => {

        if(window.innerWidth > 900){
            props && props.showLeftNavbar && props.showLeftNavbar();
            const rightOnlineUsersBar = document.getElementById('#right__online-users__bar');
            if(rightOnlineUsersBar){
                rightOnlineUsersBar.style.backgroundColor = 'transparent'
                rightOnlineUsersBar.style.height = '100vh'
                rightOnlineUsersBar.style.transform = 'translateX(0) translateZ(0)'
                rightOnlineUsersBar.style.boxShadow = 'none'
            }
      
            const crossCloser = document.getElementById('#right__online-users__bar-cross-closer');
            if(crossCloser){
                crossCloser.style.display = 'none'
            }
        }
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
            {
                posts && viewingUser && posts.length > 0 && 
                <Suspense fallback = {<></>}>
                    {posts.map((eachPost)=>{

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
                    })}
                </Suspense>
            }
        </div>

    );
}
export default memo(SavedPostsPage);