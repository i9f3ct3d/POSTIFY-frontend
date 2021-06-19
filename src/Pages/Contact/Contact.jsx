import react, { useState } from "react";
import emailjs from 'emailjs-com';
import "./Contact.css"
import Navbar from "../../component/navbar/navbar"
import BackImg from "../../images/icon.svg";

const Contact=()=>{

    const [isValidEmail, setisValidEmail]=useState(true);
    const [isValidMessage, setisValidMessage]=useState(true);
    const [isEmailSent, setIsEmailSent]=useState(false);
    const [showBottomLine, setShowBottomLine]=useState(false);


    let validateEmail = (email) => {
        let re =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
        if (re.test(email)) {
          return true;
        } else {
          return false;
        }
      };

    const emailOnChangeHandler=(event)=>{
        var inputEmailIdName=document.getElementById("contact-form-input");
        const typedEmail=event.target.value;
        if(!validateEmail(typedEmail))
        {
            
            setisValidEmail(false);
            inputEmailIdName.style.borderColor="rgb(223, 45, 0)";
        }else {
            
            inputEmailIdName.style.borderColor="grey";
            setisValidEmail(true);
        }
    }

    const messageOnChangeHandler=(event)=>{
        var inputMessageIdName=document.getElementById("contact-form-message");
        const typedMessage=event.target.value;
        if(!typedMessage.trim())
        {

            setisValidMessage(false);
            inputMessageIdName.style.borderColor="rgb(223, 45, 0)";
        }else {

            inputMessageIdName.style.borderColor="grey";
            setisValidMessage(true);
        }
    }

    const handleContactFormSUbmit=(event)=>{
        event.preventDefault();

        if(validateEmail(event.target.email.value) && event.target.message.value.trim())
        {
            emailjs.sendForm(process.env.REACT_APP_EMAIL_JS_SERVICE_ID, process.env.REACT_APP_EMAIL_JS_TEMPLATE_ID, event.target, process.env.REACT_APP_EMAIL_JS_USER_ID)
            .then((result) => {
                setIsEmailSent(true);
                event.target.reset();
                setShowBottomLine(true);
            }, (error) => {
                event.target.reset();
                window.location="/error";
            });
        }
        else{
            setIsEmailSent(false);
            setShowBottomLine(true);
        }
    
      
    }

    return(
    <div className="contact-page-div">
    <div className="background-image-container">
        <img src={BackImg} />
      </div>
        <Navbar/>
        <div className="contact-page-all-content">
        <h1>We are</h1>
        <h1 style={{color:"yellowgreen"}}>Eager</h1>
        <h1>to hear from</h1>
        <h1 style={{color:"yellowgreen"}}>U</h1>
        <div className="contact-form-div">
            <form type="submit" onSubmit={handleContactFormSUbmit}>
                <input onChange={emailOnChangeHandler} id="contact-form-input" className="contact-form-input" type="email" name="email" placeholder="type your email here"/>
                {!isValidEmail && <p style={{color:"rgb(223, 45, 0)"}}>Please enter a valid email</p>}
                <textarea onChange={messageOnChangeHandler} id="contact-form-message" className="contact-form-message" type="text" name="message" placeholder="type your message here"/>
                {!isValidMessage && <p style={{color:"rgb(223, 45, 0)"}}>Message area can't be left empty</p>}
                <button className="contact-form-button" type="submit"><i className="fas fa-share-square fa-4x"></i></button>
                {showBottomLine &&( isEmailSent?<p style={{color:"blue"}}><i className="far fa-check-circle">Thanks for your feedback</i></p>:<p><i style={{color:"rgb(223, 45, 0)"}} className="far fa-times-circle">Email not sent..invalid data</i></p>)}
            </form>
        </div>
        </div>
    </div>)
}

export default Contact;