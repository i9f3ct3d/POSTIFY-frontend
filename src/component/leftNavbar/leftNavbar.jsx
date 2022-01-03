import {
    useState,
    useEffect,
    useRef,
    forwardRef,
    memo,
    lazy,
    Suspense,
} from "react";
import "./leftNavbar.css";
import Cookies from "js-cookie";
import axios from "axios";
import { useHistory } from "react-router-dom";

const LeftNavbarLinks = lazy(() => import("./components/leftnavbarlinks"));
const Avatar = lazy(() => import("../Avatar/Avatar"));

const LeftNavbar = (props, ref) => {
    const cookie = useRef(Cookies.get("x-auth-token"));
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get(
                    process.env.REACT_APP_BACKEND_API_URL +
                    "leftnavbar/?token=" +
                    cookie.current
                );

                if (res.status === 200) {
                    setUser(res.data);
                }
            } catch (error) {
                window.location = "/error";
            }
        };

        cookie.current && fetch();
    }, []);

    const history = useHistory();

    return (
        <div id="#left-navbar-full-div" className="left-navbar-full-div">
            <div className="left-navbar-inner-div">
                <div
                    onClick={() => {
                        history.push("/myprofile");
                    }}
                    className="left-navbar-profile-link-div"
                >
                    <Suspense fallback={<span></span>}>
                        <Avatar
                            height="2.2rem"
                            width="2.2rem"
                            image={user && user.userProfilePic}
                        />
                    </Suspense>
                    <span className="left-navbar-profile-link-text">
                        {user && user.username}
                    </span>
                </div>
                <Suspense fallback={<></>}>
                    <LeftNavbarLinks
                        key={1}
                        type="saved"
                        text="Saved"
                        onClick={() => {
                            history.push("/savedposts");
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
