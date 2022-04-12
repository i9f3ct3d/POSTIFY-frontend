import {
    memo,
    lazy,
    Suspense,
    useRef,
    forwardRef,
} from "react";
import "./leftNavbar.css";
import { useNavigate } from "react-router-dom";
import { useImperativeHandle } from "react";

const LeftNavbarLinks = lazy(() => import("./components/leftnavbarlinks"));
const Avatar = lazy(() => import("../Avatar/Avatar"));

const LeftNavbar = ({user},ref) => {

    const navigate = useNavigate();
    const leftNavbarRef = useRef();

    async function isPostInfoPage() {
        const pageLocation = window.location.pathname;
        const postinfoPageRoute = "/postinfo";
    
        let pageI = 0;
    
        for await (const i of postinfoPageRoute) {
          if (i !== pageLocation[pageI]) {
            return false;
          }
    
          pageI++;
        }
    
        return true;
      }

    useImperativeHandle(ref,() => ({
        showLeftNavbar : async() => {
            const leftNavbar = leftNavbarRef.current;

            if (leftNavbar) {
              leftNavbar.style.display = "block";
        
              if (
                window.innerWidth <= 900 ||
                window.location.pathname === "/newpost" ||
                (await isPostInfoPage())
              ) {
                leftNavbar.style.backgroundColor = "#121212";
                leftNavbar.style.height = "100vh";
                leftNavbar.style.transform = "translateX(0) translateZ(0)";
                leftNavbar.style.boxShadow = "8px -4px 10px rgba(0 , 0 , 0 , 0.5)";
              } else {
                leftNavbar.style.backgroundColor = "transparent";
                leftNavbar.style.height = "unset";
                leftNavbar.style.transform = "translateX(0) translateZ(0)";
                leftNavbar.style.boxShadow = "none";
              }
            }
        },
        hideLeftNavbar : () => {
            const leftNavbar = leftNavbarRef.current;

            if (leftNavbar) {
              leftNavbar.style.display = "none";
        
              leftNavbar.style.backgroundColor = "#242527";
              leftNavbar.style.height = "100vh";
              leftNavbar.style.transform = "translateX(-101%) translateZ(0)";
              leftNavbar.style.boxShadow = "8px -4px 10px rgba(0 , 0 , 0 , 0.5)";
            }
        }
    }))

    return (
        <div ref = {leftNavbarRef} id="#left-navbar-full-div" className="left-navbar-full-div">
            <div className="left-navbar-inner-div">
                <div
                    onClick={() => {
                        navigate("/myprofile");
                    }}
                    className="left-navbar-profile-link-div"
                >
                    <Suspense fallback={<span></span>}>
                        <Avatar
                            height="2rem"
                            width="2rem"
                            image={user && user.userProfilePic}
                        />
                    </Suspense>
                    <span className="left-navbar-profile-link-text">
                        {user && user.username}
                    </span>
                </div>
                <div style = {{width : 'calc(100% + 50px)' , height : '1px' , backgroundColor : 'rgb(61, 63, 66)'}} className = 'underline' />
                <Suspense fallback={<></>}>
                    <LeftNavbarLinks
                        key={1}
                        type="saved"
                        text="Saved"
                        onClick={() => {
                            navigate("/savedposts");
                        }}
                        delay={1}
                    />
                    <LeftNavbarLinks key={2} type="friends" text="Friends" delay={2} />
                    <LeftNavbarLinks key={3} type="starred" text="Starred" delay={3} />
                    <LeftNavbarLinks key={4} type="memories" text="Memories" delay={4} />
                    <LeftNavbarLinks key={5} type="weather" text="Weather" delay={5} />
                    <LeftNavbarLinks key={6} type="groups" text="Groups" delay={6} />
                    <LeftNavbarLinks key={7} type="pages" text="Pages" delay={7} />
                    <LeftNavbarLinks
                        key={8}
                        type="messenger"
                        text="Messenger"
                        delay={8}
                    />
                </Suspense>
            </div>
        </div>
    );
};

export default memo(forwardRef(LeftNavbar));
