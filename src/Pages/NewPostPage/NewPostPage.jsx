  
import React,{useEffect, useState} from "react";
import PostForm from "../PostForm/PostForm"
import axios from "axios";
import Cookies from "js-cookie";
import Footer from "../../component/footer/footer"
import "./NewPostPage.css"
import BackImg from "../../images/icon.svg";

const NewPostPage=(props)=>{
    const noPic = "https://qph.fs.quoracdn.net/main-qimg-2b21b9dd05c757fe30231fac65b504dd";

    const[user , setUser]=useState();
    
    useEffect(()=>{
        const cookie=Cookies.get('x-auth-token');
        const fetchData = async () => {
            try {
                const res=await axios.get(process.env.REACT_APP_BACKEND_API_URL+'newpost/?token='+cookie);
                if(res.status===200)
                {               
                    setUser(res.data.user);
                }
            } catch (error) {
                
                window.location="/error";
            }
        };
        fetchData();
    },[])

    
    return(
        <div className="new-post-page-full-container">
        <div className="background-image-container">
        <img src={BackImg} />
      </div>
        <div className="new-post-page-container">      
            {user && <PostForm
                userid={user._id}
                username={user.username}
                userProfilePic={user.profilePic ? process.env.REACT_APP_BACKEND_API_URL+ user.profilePic : noPic}
            />}
        </div>
            <Footer/>
        </div>
    )
}

export default NewPostPage;