  
import React,{useEffect, useState} from "react";
import PostForm from "../PostForm/PostForm"
import axios from "axios";
import Cookies from "js-cookie";
import Footer from "../../component/footer/footer"
import "./NewPostPage.css"

const NewPostPage=(props)=>{
    const noPic = "https://qph.fs.quoracdn.net/main-qimg-2b21b9dd05c757fe30231fac65b504dd";
    const[user , setUser]=useState();
    
    useEffect(()=>{

        props && props.showLoader && props.showLoader();

        const cookie=Cookies.get('x-auth-token');
        const fetchData = async () => {
            try {
                const res=await axios.get(process.env.REACT_APP_BACKEND_API_URL+'newpost/?token='+cookie);
                if(res.status===200)
                {               
                    setUser(res.data.user);
                }
                
                props && props.hideLoader && props.hideLoader();

            } catch (error) {
                
                window.location="/error";
            }
        };
        fetchData();
    },[])

    
    return(
        <div className="new-post-page-full-container">
        <div className = "background-div"></div>
        <div className="new-post-page-container">      
            {user && <PostForm
                showLoader = {props && props.showLoader && props.showLoader}
                hideLoader = {props && props.hideLoader && props.hideLoader}
                userid={user._id}
                username={user.username}
                userProfilePic={user.profilePic ? (user.profilePic[0] === "u" ? process.env.REACT_APP_BACKEND_API_URL+ user.profilePic : user.profilePic) : noPic}
            />}
        </div>
            {/* <Footer/> */}
        </div>
    )
}

export default NewPostPage;