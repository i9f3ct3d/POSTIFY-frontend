import { useEffect, useState, lazy, Suspense, memo } from 'react';
import './savedPostsPage.css';
import axios from 'axios';
import Cookies from 'js-cookie';
const PostCard = lazy(() => import( '../../component/postCard/postCard'))

const SavedPostsPage=({showLeftNavbar , hideLeftNavbar , setProgress , user})=>{

    const [posts , setPosts] = useState(null);

    useEffect(() => {

        if(window.innerWidth > 900){
            showLeftNavbar && showLeftNavbar();
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
        else hideLeftNavbar && hideLeftNavbar();
    
    },[])

    useEffect(()=>{

        const fetch=async()=>{

            setProgress && setProgress(10);
            try {

                const cookie = Cookies.get("x-auth-token");
                setProgress && setProgress(30);
                const res = await axios.get(process.env.REACT_APP_BACKEND_API_URL+"getsavedposts/?token="+cookie);
                setProgress && setProgress(80);
                if(res.status === 200){
                    
                    setPosts(res.data.savedPosts);
                     
                }

                setProgress && setProgress(100);

            } catch (error) {

                window.location = "/error";
            }
            
        }

        fetch();

    },[])


    return(

        <div className="saved-posts-page-full-div">
            {
                user && posts && posts.length > 0 && 
                <Suspense fallback = {<></>}>
                    {posts.map((eachPost)=>{

                        return(
                            <PostCard
                                viewingUserProfilePic = {user.profilePic}
                                userEmail = {user.email}
                                mainUserId = {user._id}
                                viewingUsername = {user.username}
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