import axios from "axios";
import React ,{useState}from "react";
import Cookies from "js-cookie";
import Footer from "../../component/footer/footer"

import "./LogIn.css"

import Logo from "../../component/logo/logo";
import Navbar from "../../component/navbar/navbar";
import BackImg from "../../images/icon.svg";

const LogIn=(()=>{


    const [isValidEmail, setisValidEmail]=useState(true);
    const [isValidPassword, setisValidPassword]=useState(true);
    const [isAllCredentialsValid, setisAllCredentialsValid]=useState(true);
    const [isCheckboxChecked, setisCheckboxChecked]=useState(false);

    let validateEmail = (email) => {
        let re =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
        if (re.test(email)) {
          return true;
        } else {
          return false;
        }
      };

    const onLogInSubmitHandler=async (event)=>{
        event.preventDefault();
        const email=event.target.email.value;
        const password=event.target.password.value;

        let allInformationValid=true;

        const emailDiv=document.getElementsByName("input-wrapper-1")[0];
        const passwordDiv=document.getElementsByName("input-wrapper-2")[0];
        if(!validateEmail(email)){
            setisValidEmail(false);
            allInformationValid=false;

            emailDiv.style.borderColor="rgb(223, 45, 0)";
        }
        else
        {
            setisValidEmail(true);
            
            emailDiv.style.borderColor="#82df84";
        }

        if(!password.trim()){
            setisValidPassword(false);
            allInformationValid=false;

            passwordDiv.style.borderColor="rgb(223, 45, 0)";
        }
        else
        {
            setisValidPassword(true);
            passwordDiv.style.borderColor="#82df84";
        }

        if(allInformationValid)
        {
            
            try {
                const response=await axios.post(process.env.REACT_APP_BACKEND_API_URL+"login",{
                    email:email,
                    password:password
                })
                if(response.data.credentials==="valid")
                {
                    setisAllCredentialsValid(true);
                    Cookies.set('x-auth-token', response.data.token,{ expires: 7 });
                    window.location="/home";
                }
                else
                {
                    setisAllCredentialsValid(false); 
                }
            } catch (error) {
                setisAllCredentialsValid(false);
                window.location="/error";
            }
        }
    }

    const checkboxHandler=()=>{
        const isChecked=!isCheckboxChecked;
        setisCheckboxChecked(!isCheckboxChecked);
        const element=document.getElementsByClassName("far")[0];
        if(isChecked)
        {
            if(element)
            {
                element.classList.add("fa-eye");
                element.classList.remove("fa-eye-slash");
            }
        }
        else
        {
            if(element)
            {
                element.classList.remove("fa-eye");
                element.classList.add("fa-eye-slash");
            }
        }
    }

    return(
        <div className="login-div-container">
            <Navbar />
            <div className="background-image-container">
        <img src={BackImg} />
      </div>
            <div className="login-fulldiv">
                <Logo scale="1"/>
                <h1>Login Here</h1>
                <div className="login-div">
                    <form onSubmit={onLogInSubmitHandler}>

                        <div className="input-wrapper-outside">
                            <div className="input-wrapper" name="input-wrapper-1">
                                <input type="email" name="email" placeholder="Enter your Email"/>
                            </div>
                            {<p style={{visibility:`${isValidEmail?"hidden":"visible"}`}}>Invalid Email Entered</p>}
                        </div>

                        <div className="input-wrapper-outside">
                            <div className="input-wrapper" name="input-wrapper-2">
                                <input type={isCheckboxChecked? "text":"password"} name="password" placeholder="Enter your Password"/>
                                <i className="far fa-eye-slash" onClick={checkboxHandler}></i>
                            </div>
                            {<p style={{visibility:`${isValidPassword?"hidden":"visible"}`}}>Invalid Password Entered</p>}
                        </div>

                        <button type="submit"><i className="fas fa-sign-in-alt"></i>  Login</button>
                        {!isAllCredentialsValid && <p>Credentials Invalid</p>}
                        <br/>

                        <span>Not registered yet ?     <a href="/signup"><i className="fas fa-user-plus"></i>  Sign Up</a></span>
                    </form>
                </div>
            </div>
            
        </div>
    );

})

export default LogIn;