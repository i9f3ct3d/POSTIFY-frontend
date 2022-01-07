import { memo, useEffect, useState } from "react";
import "./Notification.css"
import Cookies from "js-cookie";
import axios from "axios";
import Avatar from "../../component/Avatar/Avatar";
import { useNavigate } from "react-router-dom";

const Notification=({showLeftNavbar , setProgress , hideLeftNavbar , user})=>{

    const [postNotifications , setPostNotifications] = useState(null);
    const cookie = Cookies.get("x-auth-token");
    const navigate = useNavigate();

    useEffect(() => {

        if(window.innerWidth > 900){
            showLeftNavbar && showLeftNavbar();
            const rightOnlineUsersBar = document.getElementById('#right__online-users__bar');
            if(rightOnlineUsersBar){
                rightOnlineUsersBar.style.backgroundColor = 'transparent'
                rightOnlineUsersBar.style.height = '100vh'
                rightOnlineUsersBar.style.transform = 'translateX(0) translateZ(0)'
                rightOnlineUsersBar.style.boxShadow = 'none'
            }
      
            const crossCloser = document.getElementById('#right__online-users__bar-cross-closer');
            if(crossCloser){
                crossCloser.style.display = 'none'
            }
        }
        else hideLeftNavbar && hideLeftNavbar();
    
    },[])

    useEffect(()=>{

        const fetch=async()=>{

            setProgress && setProgress(10);

            try {
                
                const res = await axios.get(process.env.REACT_APP_BACKEND_API_URL+"getnotifications/?token="+cookie);
                
                setProgress && setProgress(40);

                if(res.status === 200){
                    await res.data.allNotifications.sort((a,b)=>{
                        var pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
                        var a_date = new Date(a.time.replace(pattern,'$3-$2-$1'));
                        var b_date = new Date(b.time.replace(pattern,'$3-$2-$1'));
                        return new Date(b_date) - new Date(a_date);
                    })
                    setPostNotifications(res.data.allNotifications);
                }

                setProgress && setProgress(100);
            
            } catch (error) {

                window.location="/error";
            }


        }

        fetch();

    },[])

    const notificationClickHandler=async(postid , notificationid)=>{
        try {
            
            const res = await axios.post(process.env.REACT_APP_BACKEND_API_URL+"notificationseen",{
                notificationid : notificationid,
            });

            navigate(`/postinfo/${postid}/${user._id}`);


        } catch (error) {
            window.location="/error"
        }
    }

    function getMonth(n){

        switch(n){
            case 1 : {
                return "Jan";
            }
            case 2 : {
                return "Feb";
            }
            case 3 : {
                return "Mar";
            }
            case 4 : {
                return "Apr";
            }
            case 5 : {
                return "May";
            }
            case 6 : {
                return "Jun";
            }
            case 7 : {
                return "Jul";
            }
            case 8 : {
                return "Aug";
            }
            case 9 : {
                return "Sep";
            }
            case 10 : {
                return "Oct";
            }
            case 11 : {
                return "Nov";
            }
            case 12 : {
                return "Dec";
            }
            default : {
                return "Jan";
            }
        }

    }

    function getTime(date){

        var pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
        var dt = new Date(date.replace(pattern,'$3-$2-$1'));
        return (dt.getDate()+" "+getMonth(dt.getMonth())+" "+dt.toLocaleTimeString());
    }

    return(
        <div className="notification-page-full-div">
            <div className="notification-page-navbar-div">
            </div>
            <div className="notification-div">
                <div className="notification-inner-div">
                    {
                        postNotifications && postNotifications.map((eachNotification)=>{
                            return(
                                <div
                                    className="eachnotification-div"
                                    key={eachNotification._id} 
                                    onClick={()=>{notificationClickHandler(eachNotification.postid , eachNotification._id)}} 
                                    style={{background : eachNotification.isSeen && "#b3b3b362"}}
                                    >
                                    <div className="eachnotification-avatar-div">
                                        <Avatar
                                            height = "4.5rem"
                                            width = "4.5rem"
                                            image = {eachNotification.reactorProfilePic}
                                        />
                                    </div>
                                    <div className="eachnotification-info-div">
                                        <div className="eachnotification-text-div">
                                        <p className="eachnotification-text">{eachNotification.type === "react" ? eachNotification.reactorUsername : eachNotification.commentorUsername}{eachNotification.type === "react" ? " starred your post" : " commented on your post"}</p>
                                        </div>
                                        <div className="eachnotification-time-div">
                                            <span>{getTime(eachNotification.time)}</span>
                                        </div>
                                    </div>
                                    {eachNotification.type === "react" && <i style={{color : "gold"}} className="fa-star fas eachnotification-div-react-icon"></i>}
                                    {eachNotification.type === "comment" && <i style={{color : "greenyellow"}} className="fas fa-comment-alt fas eachnotification-div-react-icon"></i>}
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default memo(Notification);