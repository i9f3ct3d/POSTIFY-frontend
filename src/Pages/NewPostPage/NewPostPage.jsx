import {lazy, memo, Suspense, useEffect, useState} from "react";
import PostForm from "../PostForm/PostForm"
import axios from "axios";
import Cookies from "js-cookie";
import "./NewPostPage.css"
const RightOnlineUsersBar = lazy(() => import("../../component/rightOnlineUsersBar/rightOnlineUsersBar"))

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

    
    return(
        <div className="new-post-page-full-container">
            <Suspense fallback = {<></>}>
                <RightOnlineUsersBar
                    viewingUserid={user && user._id}
                    style = {{
                        backgroundColor : "#242527",
                        height : "100vh",
                        transform : "translateX(101%) translateZ(0)",
                        boxShadow : "-8px -4px 10px rgba(0 , 0 , 0 , 0.5)"
                    }}
                    crossCloserStyle = {{
                        display : "inline-block"
                    }}
                />
            </Suspense>
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