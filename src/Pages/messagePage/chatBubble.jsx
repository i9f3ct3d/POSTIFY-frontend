import axios from 'axios';
import React, { useEffect, useRef } from 'react';

import './chatBubble.css'

const ChatBubble = (props) => {

    const ref = useRef();

    const seenMessage = async () => {

        try {

            if (props && props.senderid !== props.myUserid && !(props.isSeen)) {

                const res = await axios.post(process.env.REACT_APP_BACKEND_API_URL + "messageseen", {
                    customChatid: props.customChatid,
                })

            }

        } catch (error) {

            window.location = "/error";

        }

    }

    const observer = new IntersectionObserver(
        async ([entry]) => {

            await seenMessage();

        }
    )

    useEffect(() => {
        observer.observe(ref.current)
        // Remove the observer as soon as the component is unmounted
        return () => { observer.disconnect() }
    }, [])


    const isUserMessage = () => {
        return (props.myUserid && props.senderid && props.myUserid === props.senderid);
    }

    return (
        <div ref={ref} id={props ? (props.id ? props.id : undefined) : undefined} style={{ textAlign: props && isUserMessage() && "right" , 
        margin: props && isUserMessage() && "0 1rem 10px auto",}} className="chatbubble-div">
            <div
                className="chatbubble-content-div"
                style={{
                    borderRadius: props && props.isPreviousMessageSenderSame ? "25px" : (isUserMessage() && "25px 0 25px 25px"),
                    background: props && isUserMessage() && "rgb(19, 162, 165)",
                    borderColor: props && isUserMessage() && "cyan"
                }}
            >
                <div style={{display : props && props.isPreviousMessageSenderSame && 'none' , right : props && isUserMessage() && '-15px' , transform : props && isUserMessage() && 'scaleX(1)' , backgroundColor : props && isUserMessage() && 'rgb(19, 162, 165)' , borderTopColor : props && isUserMessage() && 'cyan'}} className='chatbubble-arrow'></div>
                <div className='chatbubble-chat-content__div'>
                    <p style={{ color: props && isUserMessage() && "white" }} className="chatbubble-content">{props.chatContent && props.chatContent}</p>
                </div>
                <div className="chatbubble-time-div">
                    <p style={{ color: props && !isUserMessage() && "grey" }} className="chatbubble-time">{props.date && new Date(props.date).getHours() + " : " + new Date(props.date).getMinutes()}</p>
                </div>
            </div>
        </div>
    )

}

export default React.memo(ChatBubble);