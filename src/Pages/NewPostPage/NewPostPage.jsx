import {memo, useEffect} from "react";
import PostForm from "../PostForm/PostForm"
import "./NewPostPage.css"

const NewPostPage=({hideLeftNavbar , user})=>{

    useEffect(() => {

        hideLeftNavbar && hideLeftNavbar();

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
                userid={user && user._id}
                username={user && user.username}
                userProfilePic={user && user.profilePic && user.profilePic}
            />}
        </div>
        </div>
    )
}

export default memo(NewPostPage);