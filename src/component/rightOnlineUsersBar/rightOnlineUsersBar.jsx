import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import Avatar from '../Avatar/Avatar';
import {io} from 'socket.io-client';
import './rightOnlineUsersBar.css'
import {IoCloseOutline} from 'react-icons/io5'

const RightOnlineUsersBar=(props)=>{

    const socket = useRef();
    const [onlineUsersData , setOnlineUsersData] = useState(null);
    const [socketUserArray , setSocketUserArray] = useState(null);
    const [viewingUserid , setViewingUserid] = useState(null);

    useEffect(()=>{
    
        socket.current = io("ws://localhost:8900");
    
      },[]);

    useEffect(()=>{

        if(props && props.viewingUserid){
            setViewingUserid(props.viewingUserid);
        }

    },[props])
    
      useEffect(()=>{
              
        if(viewingUserid){
            socket.current.emit("addUser" , viewingUserid);
            socket.current.on("getOnlineUsers" , users=>{
                setSocketUserArray(users)
            })
        }
        
    
      },[viewingUserid])

    //   const onlineUsersBarRef = useRef();


    //   useEffect(()=>{

    //     if(props && props.isOpen && onlineUsersBarRef.current){
    //         onlineUsersBarRef.current.style.display = "block";
    //     }

    //   },[props])


    useEffect(()=>{

        const fetch = async() => {

            try {

                if(socketUserArray){

                    let onlineUsersidArray = [];

                    for await(const u of socketUserArray){
                        onlineUsersidArray = [...onlineUsersidArray,u.userId];
                    }
    
                    const res = await axios.post(process.env.REACT_APP_BACKEND_API_URL+"getonlineusers",{
                        "onlineUsersidArray" : onlineUsersidArray
                    })

                    if(res.status === 200){
                        setOnlineUsersData(res.data.onlineUsersData);
                    }
        
                }
                
            } catch (error) {
                console.log({"error" : error});
                window.location = "/error";
            }
        
        }

        fetch();


    },[socketUserArray])

    const onlineUserClickHandler = (onlineUserid) => {

        window.location="/messagepage/?myuserid="+viewingUserid+"&searcheduserid="+onlineUserid;

    }

    const onlineUsersBarCloseButtonHandler = () => {

        const allOnlineUsersBar = document.querySelectorAll(".right-online-users-bar-full-div");

        allOnlineUsersBar.forEach(o => {
          o.style.right = "-100%";
        });

    }

    return (
        <div className="right-online-users-bar-full-div">
            
            <div onClick = {onlineUsersBarCloseButtonHandler} className="mobile-right-online-users-bar-close-div">
                <IoCloseOutline
                    
                />
            </div>

            <p className="right-online-users-bar-title"><i className="far fa-circle right-online-users-bar-title-icon"></i>Online</p>
            <div style={{height : "1px" , backgroundColor : "#CED0D4" , width : "100%" , margin : "10px 0 0 0"}} className="underline"></div>
            <div className="right-online-users-bar-inner-div">
                {
                    onlineUsersData && onlineUsersData.map((eachUser)=>{
                        return(
                            <div onClick={()=>{onlineUserClickHandler(eachUser._id)}} key={eachUser._id} className="right-online-users-bar-eachuser-div">
                                <div className="right-online-users-bar-eachuser-avatar-div">
                                    <Avatar
                                        height = "3rem"
                                        width = "3rem"
                                        image = {eachUser.profilePic}
                                        borderColor = "greenYellow"
                                    />
                                </div>
                                <div className="right-online-users-bar-eachuser-username-div">
                                    <span className="right-online-users-bar-eachuser-username">{eachUser.username}</span>
                                </div>
                                <div className="right-online-users-bar-eachuser-div-background"></div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}

export default RightOnlineUsersBar
