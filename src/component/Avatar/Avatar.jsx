import React from 'react';

import './Avatar.css';

const Avatar = (props) =>{

    const noPic = "https://qph.fs.quoracdn.net/main-qimg-2b21b9dd05c757fe30231fac65b504dd";


    return(
        <img onClick={()=>{props && props.onClick && props.onClick()}} className="avatar-image" style={{height:props.height,width:props.width}} src={props.image ? process.env.REACT_APP_BACKEND_API_URL+props.image : noPic}/>
    );

}

export default Avatar