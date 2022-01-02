import React from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router';
import Cookies from 'js-cookie';
import {ImSpinner2} from 'react-icons/im'

function AuthCheck() {

    const {token} = useParams();

    useEffect(() => {
        
        Cookies.set('x-auth-token' , token)
        window.location="/home";

    }, [])
    

    return (
        <div className="temppage-loader">
            {/* <BackgroundAnimation/> */}
            <ImSpinner2/>
        </div>
    )
}

export default React.memo(AuthCheck);
