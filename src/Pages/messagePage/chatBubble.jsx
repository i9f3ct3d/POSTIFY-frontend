import axios from 'axios';
import React, { useEffect, useRef } from 'react';

import './chatBubble.css'

const ChatBubble = (props) =>{

    const ref = useRef();

    const seenMessage = async() => {

        try {

            if(props && props.senderid !== props.myUserid && !(props.isSeen)){

                const res = await axios.post(process.env.REACT_APP_BACKEND_API_URL + "messageseen",{
                    customChatid : props.customChatid,
                })
    
            }

        } catch (error) {
            
            window.location = "/error";

        }

    }

    const observer = new IntersectionObserver(
      async([entry]) => {

        seenMessage();

      }
    )
  
    useEffect(() => {
      observer.observe(ref.current)
      // Remove the observer as soon as the component is unmounted
      return () => { observer.disconnect() }
    }, [])


    const isUserMessage=()=>{
        return (props.myUserid && props.senderid && props.myUserid === props.senderid);
    }

    return(
        <div ref = {ref} id = {props ? (props.id ? props.id : undefined) : undefined} style={{textAlign : props && isUserMessage() && "right"}} className="chatbubble-div">
        <div 
        className="chatbubble-content-div"
        style={{
            margin: props && isUserMessage() && "0 2rem 10px auto",
            borderRadius: props && props.isPreviousMessageSenderSame ? "10px" : (isUserMessage() && "10px 0 10px 10px"),
            background : props && isUserMessage() && " #056162 ",
        }}
        >
            <p style={{color :props && isUserMessage() && "white" }} className="chatbubble-content">{props.chatContent && props.chatContent}</p>
            <div className="chatbubble-time-div">
                <p style = {{color : props && !isUserMessage() && "grey"}} className="chatbubble-time">{props.date && new Date(props.date).getHours()+" : "+new Date(props.date).getMinutes()}</p>
            </div>
        </div>
        </div>
    )

}

export default React.memo(ChatBubble);