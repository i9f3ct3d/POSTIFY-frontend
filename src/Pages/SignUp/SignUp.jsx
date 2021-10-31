import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import Logo from "../../component/logo/logo";
import "./SignUp.css";
import Navbar from "../../component/navbar/navbar";
import SignupLoginButton from '../../component/signup_login_buttons/signupLoginButton'
import imageCompression from "browser-image-compression";
import BackgroundAnimation from '../../component/BackgroundAnimation/BackgroundAnimation'
import InputField from "../../component/inputField/inputField";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {


  const [file, setFile] = useState();
  const [preview , setPreview]=useState("https://qph.fs.quoracdn.net/main-qimg-2b21b9dd05c757fe30231fac65b504dd");
  const [compressedImage , setCompressedImage] = useState(null);


  useEffect(()=>{
    
    const cookie  = Cookies.get('x-auth-token');

    if(cookie){
      window.location = "/home";
    }

  },[])


  const userEmailRef = useRef();
  const usernameRef = useRef();
  const userPasswordRef = useRef();
  const userConfirmPasswordRef = useRef();




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

    const submittingUsername = usernameRef.current.value.trim();
    const submittingUserEmail = userEmailRef.current.value.trim();
    const submittingPassword = userPasswordRef.current.value.trim();
    const submittingConfirmPassword = userConfirmPasswordRef.current.value.trim();

    if(submittingUsername.length < 5 || submittingUsername.length > 12){
      //toast => invalid username
      toast.error('Username must be 5 to 10 characters long', {
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

    if(!validateEmail(submittingUserEmail)){
      //toast => invalid useremail
      toast.error('Invalid email entered!', {
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

    if(!submittingPassword.length){
      //toast => invalid password
      toast.error('Invalid password enetered!', {
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

    if(submittingPassword !== submittingConfirmPassword){
      // toast => password didn't matched 
      toast.error("Password didn't matched!", {
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



      try {

        const formData=new FormData();

        formData.append("username" , submittingUsername);
        formData.append("email" , submittingUserEmail);
        formData.append("password" , submittingPassword);
        formData.append("isProfilePic" , file ? true : false);
        formData.append("profilePic" , compressedImage);

        const response = await axios.post(
          process.env.REACT_APP_BACKEND_API_URL + "signup",formData);

        if (response.data.credentials === "valid") {
          Cookies.set("x-auth-token", response.data.token, { expires: 7 });
          window.location = "/home";


        } else {

          // toast => email is already taken
          toast.error('Email is already taken!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });

        }
      } catch (error) {
        window.location = "/error";
      }
  };


  const compressImage = async ()=>{

    try {

      const options = {
        maxSizeMB: 0.2,
        maxWidthOrHeight: 1920,
        useWebWorker: true
      }
  
      const compressedFile = await imageCompression(file, options);
  
      setCompressedImage(compressedFile);
      
    } catch (error) {
      
      window.location = "/error";

    }


  }


  useEffect(()=>{

    if(file){

      if(file.size > (200 * 1024)){

        compressImage();

      }else{
        setCompressedImage(file);
      }


    }

  },[file])


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
      <div className="background-div"></div>
      <Navbar />
      <BackgroundAnimation/>
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
      <div className="signup-fulldiv" style={{width : "100%"}}>
        
        <div className="signup-div" style={{width : "100%"}}>
          <form className="signup-full-form" onSubmit={onFormSubmitHandler} encType="multipart/form-data">

              <div className="img-input">
                <img onClick={pickFileHandler} className="profile-pic-image-preview" src={preview}  />
                <br/>
                <input style={{display:"none"}} ref={filePickerRef} type="file" accept=".jpg , .jpeg , .png" onChange={(e)=>{setFile(e.target.files[0])}}/>
                <button onClick={pickFileHandler} id="file-picker-button"><i className="far fa-images"></i>{"          Pick Image"}
                  <div className="file-picker-button-background">
                    
                  </div>
                </button>
              </div>

            <div className="written-input" >
            <div className="signup-page-logo-div">
              <Logo className = "signup-page-logo"
              />
              <h1 className="signup-here-text">Sign up Here</h1>
            </div>
            <div style={{borderRadius : "0 50px 50px 0", height : "10px" , backgroundColor : "#1877F2", marginLeft : "90px" , width : "15rem"}} className="underline signup-page-underline"></div>
                
            <div className="signup-page-inputs-div">
              <InputField
                ref = {usernameRef}
                type = "text"
                placeholder = "Username"
              />
              <br/>
              <br/>
              <InputField
                ref = {userEmailRef}
                type = "text"
                placeholder = "Email"
              />
              <br/>
              <br/>
              <InputField
                ref = {userPasswordRef}
                type = "password"
                placeholder = "Password"
              />
              <br/>
              <br/>
              <InputField
                ref = {userConfirmPasswordRef}
                type = "password"
                placeholder = "Confirm Password"
              />
              <br/>
              <br/>
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

export default React.memo(SignUp);
