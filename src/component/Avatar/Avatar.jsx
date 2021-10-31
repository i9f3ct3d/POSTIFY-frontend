import React from 'react';
import './Avatar.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Avatar = (props) =>{

    const noPic = "https://qph.fs.quoracdn.net/main-qimg-2b21b9dd05c757fe30231fac65b504dd";


    return(
        // u => means the profile pic is uploaded by the user and that "u" actually means the uploaded folder in the backend
        <LazyLoadImage placeholderSrc = {process.env.PUBLIC_URL + "/logo192.png"} height={props && props.height && props.height} width={props && props.width && props.width} alt="avatarPic" onClick={()=>{props && props.onClick && props.onClick()}} className="avatar-image" style={{borderColor:props && props.borderColor && props.borderColor , height:props.height,width:props.width , borderWidth : props.width && props.borderWidth}} src={props.image ? (props.image[0] == "u" ? process.env.REACT_APP_BACKEND_API_URL+props.image : props.image ): noPic}/>
    );

}

export default React.memo(Avatar)