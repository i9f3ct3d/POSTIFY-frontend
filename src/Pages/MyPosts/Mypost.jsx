  
import React,{useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Navbar from "../../component/navbar/navbar";


import "./Mypost.css"
import MyPostcard from "./component/MyPostsCard/MyPostCard";

const MyPost=(props)=>{
    const cookie=Cookies.get('x-auth-token');
    const [refresh , setRefresh]=useState(false);
    const [isDeletedData, setisDeletedData]=useState(true);
    
    const[myPosts, setmyPosts]=useState([]);
    
    useEffect(()=>{
        const cookie=Cookies.get('x-auth-token');
        ////////////fixed when cookie is undefined/////////specifically when user does not have cookie at all////////////
        if(cookie===undefined)
        {
            window.location="/login";
        }
        else{
            const fetchData = async () => {
                try {
                    const res=await axios.get(process.env.REACT_APP_BACKEND_API_URL+'mypost/?token='+cookie);

                    
                    if(res.status===200)
                    {
                        setmyPosts(res.data.MyPosts);
                        
                    }
                } catch (error) {
                    window.location="/error";
                }
            };
            fetchData();
        }
        
    },[refresh,isDeletedData])

    const deletePost=async (data)=>{
        //deltes any post posted by me....its actually coming from MyPostCardComp.jsx
        try {           
            const response=await axios.post(process.env.REACT_APP_BACKEND_API_URL+'mypost/?token='+cookie,{
            postid:data
        })
        if(response.status===200)
        {
            setRefresh(!refresh);
        }

    } catch (error) {
        
        window.location="/error"
    }
    }
    
    const isDeleted=()=>{
        setisDeletedData(!isDeletedData);
    }

    return(
        <div className="mypost-page-container">
        <Navbar/>
            <h1>MY POSTS</h1>

            { myPosts.length===0? <h2>No posts</h2>:
            <div>
                <MyPostcard
                    posts={myPosts}
                    deletePost={deletePost}
                    isDeleted={isDeleted}
                />
            </div>
            }
        </div>
    )
}

export default MyPost;