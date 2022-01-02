import React, { useEffect, useRef } from "react";
import emailjs from 'emailjs-com';
import "./Contact.css"

import { RiMailSendLine } from 'react-icons/ri'
import InputField from "../../component/inputField/inputField";
import Logo from '../../component/logo/logo'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { IoArrowRedo } from 'react-icons/io5'

const Contact=({hideLeftNavbar})=>{



    let validateEmail = (email) => {
        let re =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
        if (re.test(email)) {
          return true;
        } else {
          return false;
        }
      };

      useEffect(() => {

        hideLeftNavbar && hideLeftNavbar();

      },[])


    const emailRef = useRef();
    const nameRef = useRef();
    const messageRef = useRef();

    const handleContactFormSUbmit=(event)=>{
        event.preventDefault();

        const typedEmail = emailRef.current.value.trim();
        const typedName = nameRef.current.value.trim();
        const typedMessage = messageRef.current.value.trim();

        if(typedEmail.length === 0 || !validateEmail(typedEmail)){

            //email error
            toast.error('Invalid Email entered!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            return;

        }

        if(!typedName || typedName.length === 0){

            //name error
            toast.error('Cannot leave the Name field!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            return;

        }

        
        if(!typedMessage || typedMessage.length === 0){

            //message error
            toast.error('Message area is empty!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            return;

        }

            emailjs.sendForm(process.env.REACT_APP_EMAIL_JS_SERVICE_ID, process.env.REACT_APP_EMAIL_JS_TEMPLATE_ID, event.target, process.env.REACT_APP_EMAIL_JS_USER_ID)
            .then((result) => {
                event.target.reset();
            }, (error) => {
                event.target.reset();
                window.location="/error";
            });
    
      
    }

    return(
    <div className="contact-page-div">
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme = "colored"
        />
        <div className="contact-page-all-content">
        <div className="contact-form-div">
            <form type="submit" onSubmit={handleContactFormSUbmit}>
                <div className = "contact-page-logo-div">                    
                    <Logo
                        className = "contact-page-logo"
                    />
                </div>
                <h1>We are</h1>
                <h1 style={{color:"greenYellow"}}>Eager</h1>
                <h1>to hear from</h1>
                <h1 style={{color:"greenYellow"}}>U</h1>

                <br/>
                <br/>
                <br/>
                <br/>
                <InputField
                    ref = {emailRef}
                    type = "text"
                    placeholder = "Email"
                    name = "email"
                    placeholderBackground = "#141414"
                    style = {{
                    color : "whiteSmoke",
                    borderLeftWidth : "10px",
                    background : "#141414",
                    borderRadius : "0",
                    borderColor : "#242527"
                }}
              />
              <br/>
              <br/>
              <InputField
                    ref = {nameRef}
                    type = "text"
                    name = "name"
                    placeholder = "Name"
                    placeholderBackground = "#141414"
                    style = {{
                    color : "whiteSmoke",
                    borderLeftWidth : "10px",
                    background : "#141414",
                    borderColor : "#242527"
                }}
              />
              <br/>
              <br/>
              <InputField
                    ref = {nameRef}
                    type = "text"
                    name = "subject"
                    placeholder = "Subject"
                    placeholderBackground = "#141414"
                    style = {{
                    color : "whiteSmoke",
                    borderLeftWidth : "10px",
                    background : "#141414",
                    borderColor : "#242527"
                }}
              />
                <textarea
                    ref = {messageRef}
                    className="contact-form-message" 
                    type="text" 
                    name="message" 
                    placeholder="type your message here"
                    required
                />
                <div className="contactme-send-button-div">
                    <button className="contactme-send-button"><RiMailSendLine/>{" Contact"}</button>
                </div>
            <div className="contact-page-message-icon-div">
                <IoArrowRedo
                    className = "contact-page-message-icon"
                />
            </div>
            </form>
        </div>
        </div>
    </div>)
}

export default React.memo(Contact);