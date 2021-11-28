import React from 'react';

import './chatBubble.css'

const ChatBubble = (props) =>{


    const isUserMessage=()=>{
        return (props.myUserid && props.senderid && props.myUserid === props.senderid);
    }

    return(
        <div id = {props ? (props.id ? props.id : undefined) : undefined} style={{textAlign : props && isUserMessage() && "right"}} className="chatbubble-div">
        <div 
        className="chatbubble-content-div"
        style={{
            margin: props && isUserMessage() && "0 2rem 10px auto",
            // boxShadow : props && isUserMessage() && "2px 2px 10px rgba(128,128,128,0.568)",
            borderRadius: props && isUserMessage() && "10px 0 10px 10px",
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