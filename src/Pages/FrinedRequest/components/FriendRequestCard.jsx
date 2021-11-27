import React, { useRef } from 'react'
import Avatar from '../../../component/Avatar/Avatar'
import './FriendRequestCard.css'

const FriendRequestCard = (props) => {

    const acceptButton = useRef();
    const cancelButton = useRef();
    const friendsButton = useRef();

    const acceptButtonClickHandler = () => {

        if(props){
            props.confirmFriendButtonClickHandler();
            acceptButton.current.style.display = "none"
            cancelButton.current.style.display = "none"
            friendsButton.current.style.display = "block"
        }

    }

    return (
        <div className="friend-request-card-full-div">
            <div className="friend-request-card-upper-div">
                <div onClick = {() => {

                    window.location = "/profilepage?searcheduserid="+props.userid;

                }} className="friend-request-card-avatar-div">
                    <Avatar
                        height = "3rem"
                        width = "3rem"
                        image = {props && props.userProfilePic}
                        borderColor = "cyan"
                    />
                </div>
                <div className="friend-request-card-username-div">
                    <p className="friend-request-card-username">
                        {props && props.username}
                    </p>
                </div>
            </div>
            <div className="friend-request-card-action-div">
                <button ref={acceptButton} onClick={acceptButtonClickHandler} className="friend-request-card-accept-button friend-request-card-button">Accept</button>
                <button ref={friendsButton} style={{display : "none"}} className="friend-request-card-accept-button friend-request-card-button">Friends</button>
                <button ref={cancelButton} onClick={()=>{props.cancelFriendRequestButtonClickHandler()}} className="friend-request-card-cancel-button friend-request-card-button">Cancel</button>
            </div>
        </div>
    )
}

export default FriendRequestCard
