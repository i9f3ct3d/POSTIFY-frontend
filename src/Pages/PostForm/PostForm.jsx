import React, { useState , useRef, useEffect} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./PostForm.css";
import Navbar from "../../component/navbar/navbar";
import {FcAddImage} from 'react-icons/fc';
import reactSvg from '../../images/react.svg'



const PostForm = (props) => {
  const [isValidPost, setisValidPost] = useState(true);
  const [emptyTitle, setemptyTitle] = useState(false);
  const [invalidTitle, setInvalidTitle] = useState(false);
  const [emptyContent, setEmptyContent] = useState(false);
  const [file , setFile] = useState();
  const [preview , setPreview]=useState();
  const [titleHasValue , setTitleHasValue] = useState(false);

  const filePickerRef=useRef();

  const pickFileHandler=(event)=>{
    event.preventDefault();
    filePickerRef.current.click();
  }

  const onsubmitHandler = async (event) => {
    event.preventDefault();

    let allcondition = true;

    var newPostContent = document.getElementById("post-content-span").innerText;
    if (!newPostContent.trim()) {
      setisValidPost(false);
      allcondition = false;
      setEmptyContent(true);
    }
    if (
      !event.target.heading.value.trim() ||
      event.target.heading.value.length > 15
    ) {
      if (event.target.heading.value.length > 17) {
        setInvalidTitle(true);
      } else if (!event.target.heading.value.trim()) {
        setemptyTitle(true);
      }
      setisValidPost(false);
      allcondition = false;
    }
    if (
      newPostContent.trim() &&
      event.target.heading.value.trim() &&
      event.target.heading.value.length <= 17
    ) {
      setisValidPost(true);
      allcondition = true;
    }

    if (allcondition) {
      try {
        let time = new Date().toLocaleTimeString();
        let date = new Date().toLocaleDateString();
        
        const formData = new FormData();

        formData.append("heading" , event.target.heading.value);
        formData.append("userid" , props.userid);
        formData.append("username" , props.username);
        formData.append("postContent" , newPostContent);
        formData.append("postTime" , time);
        formData.append("postDate" , date);
        formData.append("postImage" , file);

        const response = await axios.post(
          process.env.REACT_APP_BACKEND_API_URL + "newpost",
          formData
        );

        if (response.data.credentials === "valid") {
          Cookies.set("x-auth-token", response.data.token);
          window.location = "/home";
        }
      } catch (error) {
        window.location = "/error";
      }
    }
  };


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

  },[file])




  return (
    <div style={{width:"100%"}}>
    <Navbar />
    <div className="post-form-div">
      <h2 className="content-tagline">Say something about your day</h2>
        <h1 className="content-tagline-h1">so-far</h1>
        <div className="post-card-underline" style={{height:"1px", width : "50%" , marginBottom : "20px"}}></div>
        <div className="postform-header-div">
          <div className="postform-user-image-div">
            <img className="postform-user-image" src={props.userProfilePic} alt=""userImage/>
          </div>
          <h4 className="postform-username">{props.username}</h4>
        </div>
        <br/>
        {preview !== undefined && <div className="postform-img-preview-div"><img className="postform-img-preview" src={preview}/></div>}
      
      <form autoComplete="off" onSubmit={onsubmitHandler} encType="multipart/form-data">
      {/* {preview !== undefined && <div className="post-card-underline" style={{height:"1px", width : "90%",marginTop:"0"}}></div>} */}
      <div className="postform-title-input-div">
      <input
          style={{
            borderColor:emptyTitle && "red",
          }}
          maxLength="19"
          autoComplete="off"
          className="title-input-area"
          onClick={() => {
            setInvalidTitle(false);
            setemptyTitle(false);
          }}
          type="text"
          name="heading"
          onChange={(e)=>{e.target.value.trim().length>0?setTitleHasValue(true):setTitleHasValue(false)}}
        />
        <span style={{visibility:titleHasValue && "hidden"}} className="postform-title-placeholder">Give a title</span>
      </div>
        <p style={{ color: "red" ,visibility:!emptyTitle && "hidden",margin:"0"}}>Post must have a title</p>
          <p style={{ color: "red" ,visibility:!invalidTitle && "hidden",margin:"0"}}>Title Can't be more than 19 characters</p>

        
        <input style={{display:"none"}} type="file" ref={filePickerRef} accept=".jpg , .png , .jpeg" onChange={(event)=>{setFile(event.target.files[0])}}/>
        {/* <div className="postform-image-picker-button" onClick={pickFileHandler}><FcAddImage/></div> */}
        <span
          style={{
            borderColor:emptyContent?"red":"white",
          }}
          onClick={() => {
            setEmptyContent(false);
          }}
          id="post-content-span"
          contentEditable="true"
        ></span>
        <br />
          <svg onClick={pickFileHandler} className="post-form-image-picker-icon" style={{width: "1em", height: "1em",verticalAlign: "middle",fill: "currentColor",overflow: "hidden"}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M160.006511 256.052085h703.986978c17.709054 0 32.084639 14.375585 32.084639 32.084639v447.934893c0 17.709054-14.375585 32.084639-32.084639 32.084639H160.006511c-17.709054 0-32.084639-14.375585-32.084639-32.084639v-447.934893c0-17.709054 14.375585-32.084639 32.084639-32.084639z" fill="#808080" /><path d="M160.006511 287.928383h703.986978v447.934893H160.006511z" fill="#9ED3FF" /><path d="M246.26002 336.888708c13.333876 0 25.209359 5.416887 33.959716 13.958901 8.750356 8.750356 13.958901 20.625839 13.958901 33.959716s-5.416887 25.209359-13.958901 33.959715c-8.750356 8.750356-20.625839 13.958901-33.959716 13.958901s-25.209359-5.416887-33.959715-13.958901c-8.750356-8.750356-13.958901-20.625839-13.958901-33.959715s5.416887-25.209359 13.958901-33.959716c8.750356-8.542014 20.834181-13.958901 33.959715-13.958901z" fill="#FFE082" /><path d="M160.006511 607.941404h703.986978v127.921872H160.006511z" fill="#9FCA7B" /><path d="M866.701933 721.696033c-43.126755-80.836623-113.129603-161.464903-129.171923-242.301526-48.543642 80.836623-64.585961 177.715565-145.422584 242.301526H866.701933z" fill="#5D4037" /><path d="M752.113937 721.696033c-52.710478-98.754018-138.338962-197.716378-158.131434-296.470397-59.377416 98.754018-78.961546 217.50885-177.923907 296.470397H752.113937z" fill="#795548" /><path d="M593.982503 425.225636c-59.377416 98.754018-17.917396 230.842726-177.923907 296.470397l177.923907-296.470397z" fill="#5D4037" /><path d="M470.852492 346.889115c-6.250254 0-12.083825 2.29176-16.667344 5.833571 0.416684-1.875076 0.625025-3.750153 0.625025-5.833571 0-14.792269-12.083825-26.876094-26.876094-26.876094-14.792269 0-26.876094 12.083825-26.876093 26.876094v1.041709c-2.500102-0.833367-5.000203-1.041709-7.708647-1.041709-14.792269 0-26.876094 12.083825-26.876094 26.876094 0 20.000814 19.167447 25.417701 19.167447 26.251068h91.045371c12.292167-2.500102 21.042523-13.75056 21.042523-26.251068 0-14.792269-12.083825-26.876094-26.876094-26.876094zM763.98942 356.056155c-8.542014 0-16.250661 2.916785-22.500915 7.916988 0.625025-2.500102 0.833367-5.208545 0.833367-7.916988 0-20.000814-16.042319-36.043133-36.043133-36.043134-20.000814 0-36.043133 16.042319-36.043134 36.043134v1.458392c-3.333469-1.041709-6.666938-1.458393-10.41709-1.458392-20.000814 0-36.043133 16.042319-36.043134 36.043133 0 26.876094 25.834385 34.168057 25.834385 35.209766h122.088301c16.459003-3.541811 28.126144-18.542421 28.126145-35.209766 0.208342-20.000814-15.833978-36.043133-35.834792-36.043133z" fill="#FFFFFF" /></svg>
          <p onClick={pickFileHandler} className="post-form-image-picker-p">Pick Image</p>
          {/* <p style={{ color: "red" ,visibility:!emptyContent && "hidden",margin:"0"}}>Post Area Cannot be left empty</p> */}
          <br/>
        <button className="new-post-submit-button" type="submit"><i className="fas fa-feather-alt"></i></button>
      </form>
    </div>
    </div>
  );
};

export default PostForm;
