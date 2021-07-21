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
                <button onClick={pickFileHandler} id="file-picker-button"><i className="far fa-images"></i>{"          Pick Image"}</button>
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
