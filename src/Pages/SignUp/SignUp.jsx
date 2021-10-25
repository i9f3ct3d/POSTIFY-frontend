import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import Logo from "../../component/logo/logo";
import "./SignUp.css";
import Navbar from "../../component/navbar/navbar";
import BackImg from "../../images/icon.svg";
import SignupLoginButton from '../../component/signup_login_buttons/signupLoginButton'

const SignUp = () => {
  const [isUsernameValid, setisUsernameValid] = useState(true);
  const [isEmailvalid, setisEmailvalid] = useState(true);
  const [isPassword1, setisPassword1] = useState(true);
  const [isPassword2, setisPassword2] = useState(true);
  const [file, setFile] = useState();
  const [preview , setPreview]=useState("https://qph.fs.quoracdn.net/main-qimg-2b21b9dd05c757fe30231fac65b504dd");
  

  const [isChecked, setisChecked] = useState(false);
  const [isAllCredentialsValid, setisAllCredentialsValid] = useState(true);

  let validateEmail = (email) => {
    let re =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(email)) {
      return true;
    } else {
      return false;
    }
  };

  const onFormSubmitHandler = async (event) => {
    event.preventDefault();
    setisAllCredentialsValid(true);
    let allConditionSatisfied = true;

    const userDiv = document.getElementsByName("input-wrapper-1")[0];
    const emailDiv = document.getElementsByName("input-wrapper-2")[0];
    const passwordDiv = document.getElementsByName("input-wrapper-3")[0];
    const confirmPasswordDiv = document.getElementsByName("input-wrapper-4")[0];

    if (
      event.target.username.value.trim().length < 5 ||
      event.target.username.value.trim().length > 10
    ) {
      setisUsernameValid(false);
      allConditionSatisfied = false;

      userDiv.style.borderColor = "rgb(223, 45, 0)";
    } else {
      setisUsernameValid(true);

      userDiv.style.borderColor = "#000";
    }

    if (!validateEmail(event.target.email.value.trim())) {
      setisEmailvalid(false);
      allConditionSatisfied = false;

      emailDiv.style.borderColor = "rgb(223, 45, 0)";
    } else {
      setisEmailvalid(true);

      emailDiv.style.borderColor = "#000";
    }

    if (event.target.password1.value.trim().length < 5) {
      setisPassword1(false);
      allConditionSatisfied = false;

      passwordDiv.style.borderColor = "rgb(223, 45, 0)";
    } else {
      setisPassword1(true);

      passwordDiv.style.borderColor = "#000";
    }
    if (event.target.password1.value !== event.target.password2.value) {
      setisPassword2(false);
      allConditionSatisfied = false;

      confirmPasswordDiv.style.borderColor = "rgb(223, 45, 0)";
    } else {
      setisPassword2(true);

      confirmPasswordDiv.style.borderColor = "#000";
    }

    if (allConditionSatisfied) {
      try {
        const formData=new FormData();

        formData.append("username" , event.target.username.value);
        formData.append("email" , event.target.email.value);
        formData.append("password" , event.target.password1.value);
        formData.append("isProfilePic" , file ? true : false);
        formData.append("profilePic" , file);

        console.log(formData);
        const response = await axios.post(
          process.env.REACT_APP_BACKEND_API_URL + "signup",formData);

        if (response.data.credentials === "valid") {
          setisAllCredentialsValid(true);
          Cookies.set("x-auth-token", response.data.token, { expires: 7 });
          window.location = "/home";
        } else {
          setisAllCredentialsValid(false);
        }
      } catch (error) {
        window.location = "/error";
      }
    }
  };

  const onCheckHandler = () => {
    setisChecked(!isChecked);
    const element = document.getElementsByClassName("far")[0];
    if (!isChecked) {
      if (element) {
        element.classList.add("fa-eye");
        element.classList.remove("fa-eye-slash");
      }
    } else {
      if (element) {
        element.classList.remove("fa-eye");
        element.classList.add("fa-eye-slash");
      }
    }
  };

  const filePickerRef=useRef();

  const pickFileHandler=(e)=>{
    e.preventDefault();
    filePickerRef.current.click();
  }

  useEffect(()=>{

    if(!file)
    {
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload=()=>{
      setPreview(fileReader.result);
    }
    fileReader.readAsDataURL(file);

  },[file]);

  const googleSignUpHandler=async()=>{
      window.location = process.env.REACT_APP_BACKEND_API_URL+"signupusinggoogle";
  }


  const GoogleSvg=(props)=>{
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="google-svg"
        // x={0}
        // y={0}
        width="100%"
        height="100%"
        xmlSpace="preserve"
        preserveAspectRatio="xMidYMid meet" 
        viewBox="0 0 192 192"
        {...props}
      >
        <style>
          {
            ".prefix__st26{fill:none;stroke:#33363a;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10}.prefix__st70{fill:#f7b92b}.prefix__st163{fill:#4087ed}"
          }
        </style>
        <path
          d="M71.402 8.477c-18.663 0-35.302 8.184-46.575 21.16a61.26 61.26 0 00-8.718 13.109L36.841 58.58a36.35 36.35 0 0113.11-17.974c6.005-4.376 13.411-6.961 21.451-6.961 8.682 0 16.522 3.077 22.683 8.11l17.924-17.898c-10.923-9.508-24.926-15.38-40.607-15.38z"
          fill="#ff4743"
        />
        <path
          d="M24.827 38.853a61.771 61.771 0 00-5.044 6.698L36.841 58.58a36.35 36.35 0 0113.11-17.974c6.005-4.376 13.411-6.961 21.451-6.961 8.682 0 16.522 3.077 22.683 8.11l12.748-12.73C96.8 21.934 84.709 17.693 71.402 17.693c-18.663 0-35.301 8.184-46.575 21.16z"
          fill="#e3443a"
        />
        <path
          className="prefix__st70"
          d="M34.996 70c0-.567.04-1.125.066-1.686a36.706 36.706 0 011.778-9.734L16.109 42.745c-3.812 7.732-6.025 16.392-6.271 25.569-.017.563-.049 1.122-.049 1.686 0 .566.032 1.126.049 1.69.246 9.166 2.459 17.822 6.261 25.545l20.725-15.863a36.54 36.54 0 01-1.761-9.682c-.027-.564-.067-1.121-.067-1.69z"
        />
        <path
          className="prefix__st70"
          d="M16.099 97.235l20.725-15.863a36.54 36.54 0 01-1.761-9.682c-.026-.564-.066-1.121-.066-1.69 0-.567.04-1.125.066-1.686a36.706 36.706 0 011.778-9.734L16.109 42.745"
        />
        <path
          d="M91.863 100.977c-5.555 3.498-12.55 5.378-20.461 5.378a36.392 36.392 0 01-21.451-6.996c-6.065-4.416-10.708-10.653-13.11-17.938L16.109 97.255a61.345 61.345 0 008.704 13.091c11.272 12.987 27.92 21.178 46.589 21.178 5.645 0 11.193-.752 16.493-2.223 8.809-2.445 16.927-6.868 23.648-13.109l-19.68-15.215z"
          fill="#59c96e"
        />
        <path
          d="M16.109 97.255a61.345 61.345 0 008.704 13.091c11.272 12.987 27.92 21.178 46.589 21.178 5.645 0 11.193-.752 16.493-2.223 8.809-2.445 16.927-6.868 23.648-13.109l-19.681-15.215c-5.555 3.498-12.55 5.378-20.461 5.378a36.392 36.392 0 01-21.451-6.996"
          fill="#40a557"
        />
        <path
          d="M128.811 58.813H71.402v23.772h33.045c-1.652 8.102-6.15 14.334-12.584 18.391l19.681 15.215c5.398-5.011 9.882-11.205 13.106-18.479 3.537-7.966 5.561-17.229 5.561-27.712 0-3.635-.559-7.55-1.4-11.187z"
          fill="#0097e2"
        />
        <path
          className="prefix__st163"
          d="M111.544 116.191c5.398-5.011 9.882-11.205 13.106-18.479 3.537-7.966 5.561-17.229 5.561-27.712 0-3.635-.559-7.55-1.4-11.187h-3.693M71.402 68.314v14.272h33.045"
        />
        <g>
          <path
            className="prefix__st26"
            d="M35.062 71.69c-.026-.564-.066-1.121-.066-1.69 0-.567.04-1.125.066-1.686a36.706 36.706 0 011.778-9.734 36.35 36.35 0 0113.11-17.974c6.005-4.376 13.411-6.961 21.451-6.961 8.682 0 16.522 3.077 22.683 8.11l17.924-17.898c-10.923-9.507-24.926-15.38-40.606-15.38-18.663 0-35.302 8.184-46.575 21.16a61.26 61.26 0 00-8.718 13.109c-3.812 7.732-6.025 16.392-6.271 25.569-.017.562-.049 1.121-.049 1.685 0 .566.032 1.126.049 1.69.246 9.166 2.459 17.822 6.261 25.545l20.725-15.863a36.54 36.54 0 01-1.762-9.682z"
          />
          <path
            className="prefix__st26"
            d="M128.811 58.813H71.402v23.772h33.045c-1.652 8.102-6.15 14.334-12.584 18.391-5.555 3.498-12.55 5.378-20.461 5.378a36.392 36.392 0 01-21.451-6.996c-6.065-4.416-10.708-10.653-13.11-17.938L16.109 97.255a61.345 61.345 0 008.704 13.091c11.272 12.987 27.92 21.178 46.589 21.178 5.645 0 11.193-.752 16.493-2.223 8.809-2.445 16.927-6.868 23.648-13.109 5.398-5.011 9.882-11.205 13.106-18.479 3.537-7.966 5.561-17.229 5.561-27.712.001-3.636-.558-7.551-1.399-11.188z"
          />
        </g>
        <path
          className="prefix__st26"
          d="M36.841 58.58L16.109 42.745M91.863 100.977l19.681 15.214M78.902 82.586h33.045"
        />
        <g>
          <path
            className="prefix__st26"
            d="M31.457 131.523h6.525M50.818 131.523h18.821M43.854 131.523h1.218"
          />
        </g>
      </svg>
    )
  }

  return (
    <div className="signup-page-div" style={{width : "100%",height:"100%"}}>
      <Navbar />
      <div className="background-image-container">
        <img src={BackImg} />
      </div>
      <div className="signup-fulldiv" style={{width : "100%"}}>
        
        <div className="signup-div" style={{width : "100%"}}>
          <form className="signup-full-form" onSubmit={onFormSubmitHandler} encType="multipart/form-data">

              <div className="img-input">
                <img className="profile-pic-image-preview" src={preview}  />
                <br/>
                <input style={{display:"none"}} ref={filePickerRef} type="file" accept=".jpg , .jpeg , .png" onChange={(e)=>{setFile(e.target.files[0])}}/>
                <button onClick={pickFileHandler} id="file-picker-button"><i className="far fa-images"></i>{"          Pick Image"}
                  <div className="file-picker-button-background">
                    
                  </div>
                </button>
              </div>

            <div className="written-input" >
            <Logo scale="1.2" />
            <h1>Sign up Here</h1>
            <div className="input-wrapper-outside">
              <div className="input-wrapper" name="input-wrapper-1">
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your UserName"
                />
              </div>
              {
                <p
                  style={{
                    visibility: isUsernameValid ? "hidden" : "visible",
                    margin:"0",
                    padding:"0",
                    height :"17px"
                  }}
                >
                  UserName must be 5 to 10 characters long
                </p>
              }
            </div>
            <div className="input-wrapper-outside">
              <div className="input-wrapper" name="input-wrapper-2">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your Email"
                />
              </div>
              {
                <p
                  style={{
                    visibility: `${isEmailvalid ? "hidden" : "visible"}`,
                  }}
                >
                  email Not valid
                </p>
              }
            </div>
            <div className="input-wrapper-outside">
              <div className="input-wrapper" name="input-wrapper-3">
                <input
                  type={isChecked ? "text" : "password"}
                  name="password1"
                  placeholder="Enter your Password"
                />
                <i className="far fa-eye-slash" onClick={onCheckHandler}></i>
              </div>
              {
                <p
                  style={{
                    visibility: `${isPassword1 ? "hidden" : "visible"}`,
                  }}
                >
                  password Not valid
                </p>
              }
            </div>
            <div className="input-wrapper-outside">
              <div className="input-wrapper" name="input-wrapper-4">
                <input
                  type={isChecked ? "text" : "password"}
                  name="password2"
                  placeholder="Confirm your Password"
                />
              </div>
              {
                <p
                  style={{
                    visibility: `${isPassword2 ? "hidden" : "visible"}`,
                  }}
                >
                  password do not match
                </p>
              }
            </div>
              <SignupLoginButton
                iconClassName="fas fa-user-plus"
                buttonText="Signup"
                borderColor="green"
                textColor="rgb(53, 155, 13)"
                shadowColor="rgba(191, 253, 98, 0.63)"
                background="greenyellow"
              />
            </div>
          </form>
          <br />
            <div onClick={googleSignUpHandler} className="google-Signup-div">
              <div className="google-svg-div">
                <GoogleSvg/>
              </div>
              <div className="google-Signup-text-div">
                Signup with Google
              </div>
            </div>
            {!isAllCredentialsValid && <p>Email already exist</p>}
            <span>
              Already registered{" "}
              <a href="/login">
                <i className="fas fa-sign-in-alt"></i> login
              </a>
            </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
