  
import React,{useEffect, useState} from "react";
import PostForm from "../PostForm/PostForm"
import axios from "axios";
import Cookies from "js-cookie";
import Footer from "../../component/footer/footer"
import "./NewPostPage.css"
import BackImg from "../../images/icon.svg";

const NewPostPage=(props)=>{
    const [username,changeUsername]=useState("");
    const[userid, setuserid]=useState("");
    // const[users, setusers]=useState([]);
    
    useEffect(()=>{
        const cookie=Cookies.get('x-auth-token');
        const fetchData = async () => {
            try {
                const res=await axios.get(process.env.REACT_APP_BACKEND_API_URL+'newpost/?token='+cookie,{});
                if(res.status===200)
                {
                    
                    setuserid(res.data.userid);
                    
                    changeUsername(res.data.username)
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
        <h1>NEW POST HERE</h1>
            {username && <h2 className="top-username">Welcome <span>{username.toUpperCase()}</span></h2>}
            <h2 className="content-tagline">The World of  </h2>
            <h2 className="content-tagline-h1">POSTBOOK</h2>
            <h2 className="content-tagline">is waiting for you</h2>
            <PostForm
                userid={userid}
                username={username}
            />
        </div>
            <Footer/>
        </div>
    )
}

export default NewPostPage;