import { useEffect, useRef, useState, memo, Suspense, lazy } from "react";
import "./navbar.css";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { BsHouse } from "react-icons/bs";
import { IoNotificationsOutline, IoArrowBack } from "react-icons/io5";
import { BiUserPlus } from "react-icons/bi";
import { BsPen } from "react-icons/bs";
import Cookies from "js-cookie";
import LogoLotti from "../../images/LogoLotti.json";

const Avatar = lazy(() => import("../Avatar/Avatar"));
const NavbarDropDownDesk = lazy(() => import("./components/navbarDropDownDesk"));
const GlobalButton = lazy(() => import("../GlobalButton/GlobalButton"));
const LottiAnimation = lazy(() => import("../../Pages/lottiAnimation"));

const pathNameSet = new Set(["/signup", "/login", "/welcomepage"]);
const dontShowOnThisURLS = new Set(["/signup", "/login", "/contact"]);

const Navbar = ({ showLeftNavbar, hideLeftNavbar, isAuth , user }) => {
    const cookie = Cookies.get("x-auth-token");
    const [viewingUser, setViewingUser] = useState(null);
    const [matchedUsers, setMatchedUsers] = useState();
    const [searchInputValue, setSearchInputValue] = useState("");
    const [lastCancelToken, setLastCancelToken] = useState(null);

    const homelinkRef = useRef();
    const friendreqlinkRef = useRef();
    const notificationlinkRef = useRef();
    const newpostlinkRef = useRef();

    const mobile_homelinkRef = useRef();
    const mobile_friendreqlinkRef = useRef();
    const mobile_notificationlinkRef = useRef();
    const mobile_newpostlinkRef = useRef();

    useEffect(() => {
        isAuth && setViewingUser(user);
    }, [isAuth]);

    const searchBarOnChangeHandler = async (event) => {
        event.preventDefault();

        lastCancelToken && lastCancelToken.cancel();

        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        setLastCancelToken(source);

        const searchedName = event.target.value;

        setSearchInputValue(searchedName);

        try {
            const res = await axios.post(
                process.env.REACT_APP_BACKEND_API_URL + "findusers?token=" + cookie,
                { searchedName: searchedName },
                {
                    cancelToken: source.token,
                }
            );

            if (res.status === 200) {
                setMatchedUsers(res.data.users);
                setLastCancelToken(null);
            }
        } catch (error) {
            const e = new Error(error);

            if (e.message !== "Cancel") {
                window.location = "/error";
            }
        }
    };

    const onLogoClickHandler = () => {
        const leftNavabar = document.getElementById("#left-navbar-full-div");
        if (leftNavabar && leftNavabar.style.display === "none") {
            showLeftNavbar && showLeftNavbar();
        } else {
            hideLeftNavbar && hideLeftNavbar();
        }
    };

    const searchedDivInputRef = useRef();
    const mobileSearchedDivRef = useRef();
    const searchedUsersDivRef = useRef();

    const mobileNavbarSearchingDivRef = useRef();

    const closeMobileSearchingDiv = () => {
        if (mobileNavbarSearchingDivRef && mobileNavbarSearchingDivRef.current) {
            setSearchInputValue("");
            mobileNavbarSearchingDivRef.current.style.display = "none";
        }
    };

    const openMobileSearchingDiv = () => {
        if (mobileNavbarSearchingDivRef && mobileNavbarSearchingDivRef.current) {
            mobileNavbarSearchingDivRef.current.style.display = "block";
        }
    };

    return (
        <div style={{ height: "0", width: "0", overflow: "visible" }}>
            <Suspense fallback={<span></span>}>
                <NavbarDropDownDesk
                    profileImg={isAuth && viewingUser && viewingUser.profilePic}
                    userName={isAuth && viewingUser ? viewingUser.username : null}
                    isAuth={isAuth}
                />
            </Suspense>

            {!dontShowOnThisURLS.has(window.location.pathname) && isAuth && (
                <div className="navbar-mobile-icons-div">
                    <div className="navbar-mobile-icons-inside-div">
                        <NavLink
                            ref={mobile_homelinkRef}
                            to="/home"
                            className="navbar-mobile-icon navbar-mobile-feed-icon"
                            style={({ isActive }) => isActive ? { color: 'cyan' } : {}}
                        >
                            <BsHouse />
                        </NavLink>
                        <NavLink
                            ref={mobile_friendreqlinkRef}
                            to="/friendrequest"
                            className="navbar-mobile-icon navbar-mobile-friend-req-icon"
                            style={({ isActive }) => isActive ? { color: 'cyan' } : {}}
                        >
                            <BiUserPlus />
                        </NavLink>
                        <NavLink
                            ref={mobile_notificationlinkRef}
                            to="/notification"
                            className="navbar-mobile-icon navbar-mobile-notification-icon"
                            style={({ isActive }) => isActive ? { color: 'cyan' } : {}}
                        >
                            <IoNotificationsOutline />
                        </NavLink>
                        <NavLink
                            ref={mobile_newpostlinkRef}
                            to="/newpost"
                            className="navbar-mobile-icon navbar-mobile-newpost-icon"
                            style={({ isActive }) => isActive ? { color: 'cyan' } : {}}
                        >
                            <BsPen />
                        </NavLink>
                    </div>
                </div>
            )}

            {isAuth && window.innerWidth <= 1173 && (
                <div
                    ref={mobileNavbarSearchingDivRef}
                    className="mobile-navbar__user-searching__div"
                >
                    <div className="mobile-navbar__user-searching__div__upper-div">
                        <div
                            onClick={() => {
                                closeMobileSearchingDiv();
                            }}
                            className="mobile-navbar__user-searching__div__upper-div__close-icon-div"
                        >
                            <IoArrowBack />
                        </div>
                        <input
                            value={searchInputValue}
                            onChange={searchBarOnChangeHandler}
                            className="mobile-navbar__user-searching-input"
                            placeholder="Search ..."
                        />
                    </div>
                    <div
                        style={{ height: "1px", width: "100%", backgroundColor: '#3E4042' }}
                        className="underline"
                    ></div>
                    <div className="mobile-navbar__user-searching__div__lower-div">
                        <Suspense fallback={<span></span>}>
                            <div className="mobile-navbar__user-searching__div__lower-inner-div">
                                {matchedUsers &&
                                    matchedUsers.length > 0 &&
                                    matchedUsers.map((eachUser) => {
                                        return (
                                            <div
                                                key={eachUser._id}
                                                className="mobile__matched-eachuser-div"
                                            >
                                                <Link
                                                    onClick={() => {
                                                        closeMobileSearchingDiv();
                                                    }}
                                                    className="mobile__matched-eachuser__link"
                                                    to={
                                                        viewingUser && eachUser._id === viewingUser._id
                                                            ? `/myprofile`
                                                            : `/profilepage/${eachUser._id}`
                                                    }
                                                />
                                                <Avatar
                                                    image={
                                                        eachUser.usingGoogleAuth
                                                            ? eachUser.profilePic
                                                            : eachUser.profilePic &&
                                                            process.env.REACT_APP_BACKEND_API_URL +
                                                            eachUser.profilePic
                                                    }
                                                    height="3rem"
                                                    width="3rem"
                                                />
                                                <span className="mobile__matched-eachuser__username">
                                                    {eachUser.username}
                                                </span>
                                            </div>
                                        );
                                    })}
                            </div>
                        </Suspense>
                    </div>
                </div>
            )}

            {isAuth && (
                <div
                    style={{
                        display:
                            (dontShowOnThisURLS.has(window.location.pathname) || !cookie) &&
                            "none",
                    }}
                    onClick={(e) => {
                        openMobileSearchingDiv();
                    }}
                    ref={mobileSearchedDivRef}
                    className="navbar-mobile-search-icon-div"
                >
                    <i className="fas fa-search navbar-mobile-search-icon"></i>
                </div>
            )}

            {!dontShowOnThisURLS.has(window.location.pathname) && isAuth && (
                <div
                    ref={searchedDivInputRef}
                    className="navbar-search-div"
                    style={{
                        zIndex:
                            matchedUsers !== undefined && matchedUsers.length > 0 && "14",
                    }}
                >
                    <input
                        value={searchInputValue}
                        autoComplete="off"
                        required
                        className="navbar-search-input"
                        type="text"
                        name="searchedUserName"
                        onChange={searchBarOnChangeHandler}
                    />
                    <span className="placeholder">
                        <i className="fas fa-search"></i>
                        {" Search Users"}
                    </span>
                </div>
            )}

            {isAuth && window.innerWidth > 1173 && (
                <div
                    ref={searchedUsersDivRef}
                    className="navbar-searched-users-div"
                    style={{
                        transform:
                            matchedUsers !== undefined &&
                            searchInputValue &&
                            matchedUsers.length > 0 &&
                            "translateX(0) translateZ(0)",
                        opacity:
                            matchedUsers !== undefined &&
                            searchInputValue &&
                            matchedUsers.length > 0 &&
                            "1",
                        pointerEvents:
                            matchedUsers !== undefined &&
                            searchInputValue &&
                            matchedUsers.length > 0 &&
                            "unset",
                    }}
                >
                    <div
                        className="search-bar-back-icon"
                        onClick={() => {
                            searchedUsersDivRef.current.style.transform =
                                "translateX(-101%) translateZ(0)";
                            searchedUsersDivRef.current.style.opacity = "0";
                            searchedUsersDivRef.current.style.pointerEvents = "none";

                            setSearchInputValue("");
                        }}
                    >
                        <IoArrowBack />
                    </div>
                    <Suspense fallback={<span></span>}>
                        <div className="searched-users-outer-div">
                            {matchedUsers !== undefined &&
                                matchedUsers.length > 0 &&
                                matchedUsers.map((eachUser) => {
                                    return (
                                        <div
                                            className="navbar__searched-eachuser__div"
                                            key={eachUser._id}
                                        >
                                            <Link
                                                onClick={() => {
                                                    setSearchInputValue("");
                                                }}
                                                className="navbar__searched-eachuser__link"
                                                to={
                                                    viewingUser && eachUser._id === viewingUser._id
                                                        ? `/myprofile`
                                                        : `/profilepage/${eachUser._id}`
                                                }
                                            />
                                            <div className="searched-users">
                                                <Avatar
                                                    image={
                                                        eachUser.usingGoogleAuth
                                                            ? eachUser.profilePic
                                                            : eachUser.profilePic &&
                                                            process.env.REACT_APP_BACKEND_API_URL +
                                                            eachUser.profilePic
                                                    }
                                                    height="3rem"
                                                    width="3rem"
                                                    style={{
                                                        display: "table-cell",
                                                        height: "3rem",
                                                        width: "3rem",
                                                        borderRadius: "2rem",
                                                        border: "2px solid cyan",
                                                        boxShadow: "2px 2px 3px rgba(0 , 0 , 0 , 0.5)",
                                                    }}
                                                />
                                                <h5>{eachUser.username}</h5>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </Suspense>
                </div>
            )}

            <div className="navbar-top">
                <Suspense fallback={<></>}>
                    <div onClick={onLogoClickHandler} className="navbar-logo-div">
                        <LottiAnimation lotti={LogoLotti} height="100%" width="100%" />
                    </div>
                </Suspense>

                {!dontShowOnThisURLS.has(window.location.pathname) && isAuth && <div
                    className="navbar-icons-div"
                >
                    <NavLink
                        ref={homelinkRef}
                        className="navbar-icon navbar-feed-icon"
                        to="/home"
                        style={({ isActive }) => isActive ? {
                            color: "cyan",
                            borderColor: "cyan",
                        } : {}}
                    >
                        <BsHouse />
                    </NavLink>
                    <NavLink
                        ref={friendreqlinkRef}
                        className="navbar-icon navbar-friend-req-icon"
                        to="/friendrequest"
                        style={({ isActive }) => isActive ? {
                            color: "cyan",
                            borderColor: "cyan",
                        } : {}}
                    >
                        <BiUserPlus />
                    </NavLink>
                    <NavLink
                        ref={notificationlinkRef}
                        className="navbar-icon navbar-notification-icon"
                        to="/notification"
                        style={({ isActive }) => isActive ? {
                            color: "cyan",
                            borderColor: "cyan",
                        } : {}}
                    >
                        <IoNotificationsOutline />
                    </NavLink>
                    <NavLink
                        ref={newpostlinkRef}
                        className="navbar-icon navbar-newpost-icon"
                        to="/newpost"
                        style={({ isActive }) => isActive ? {
                            color: "cyan",
                            borderColor: "cyan",
                        } : {}}
                    >
                        <BsPen />
                    </NavLink>
                </div>}

                <div className="navbar-login-signup-logout-div">
                    {!pathNameSet.has(window.location.pathname) && isAuth && <Suspense fallback={<span></span>}>
                        <div
                            className="navbar-userdetatil"
                        >
                            <Avatar
                                image={viewingUser && viewingUser.profilePic}
                                height='3.5rem'
                                width='3.5rem'
                                link='/myprofile'
                            />
                        </div>
                    </Suspense>}


                    {(pathNameSet.has(window.location.pathname) ||
                        (window.location.pathname == "/contact" && !isAuth)) && <Suspense fallback={<></>}>


                            <GlobalButton
                                icon={
                                    <i
                                        style={{ marginRight: "10px" }}
                                        className="fas fa-user-plus"
                                    ></i>
                                }
                                text={"  Sign up"}
                                style={{ marginRight: "10px" }}
                                onClick={() => {
                                    // removeBottomBorder();
                                    window.location = "/signup";
                                }}
                                className="navbar-global-buttons"
                            />


                            <GlobalButton
                                icon={
                                    <i
                                        style={{ marginRight: "10px" }}
                                        className="fas fa-sign-in-alt"
                                    ></i>
                                }
                                text={"   Login"}
                                color="#5CA3DF"
                                borderColor="#5CA3DF"
                                backgroundColor="#5CA3DF"
                                onClick={() => {
                                    // removeBottomBorder();
                                    window.location = "/login";
                                }}
                                className="navbar-global-buttons"
                            />

                        </Suspense>}
                </div>
            </div>
        </div>
    );
};
export default memo(Navbar);
