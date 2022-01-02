import axios from "axios";
import { useEffect, useRef, lazy, memo, Suspense } from "react";
import Cookies from "js-cookie";
import "./LogIn.css";
import { Link } from "react-router-dom";
import InputField from "../../component/inputField/inputField";
import LoginPageLotti from "../../images/loginPageLottie.json";
import { IoArrowRedo } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalButton from "../../component/GlobalButton/GlobalButton";

const LottiAnimation = lazy(() => import("../lottiAnimation"));
const Logo = lazy(() => import("../../component/logo/logo"));

const LogIn = ({ hideLeftNavbar }) => {
  const formEmailRef = useRef("");
  const formPasswordRef = useRef("");

  const emailOnchangeHandler = (e) => {
    e.preventDefault();
    const typedEmail = e.target.value.trim();
    formEmailRef.current = typedEmail;
  };

  const passwordOnchangeHandler = (e) => {
    e.preventDefault();
    const typedPassword = e.target.value;
    formPasswordRef.current = typedPassword;
  };

  let validateEmail = (email) => {
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(email)) {
      return true;
    } else {
      return false;
    }
  };

  const onLogInSubmitHandler = async (event) => {
    event.preventDefault();

    const email = formEmailRef.current.trim(); //change
    const password = formPasswordRef.current.trim(); //change

    if (!validateEmail(email)) {
      // generate invalid email entered toast
      toast.error("Invalid email entered!", {
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

    if (!password) {
      // generate invalid password entered toast
      toast.error("Invalid password entered!", {
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
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_API_URL + "login",
        {
          email: email,
          password: password,
        }
      );
      if (response.data.credentials === "valid") {
        Cookies.set("x-auth-token", response.data.token, { expires: 7 });
        window.location = "/home";
      } else {
        toast.error("Invalid credentials!", {
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

  const googleSignUpHandler = async () => {
    window.location =
      process.env.REACT_APP_BACKEND_API_URL + "signupusinggoogle";
  };

  const GoogleSvg = (props) => {
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
    );
  };

  const leftDivRef = useRef();
  const rightDivRef = useRef();

  const observer = new IntersectionObserver(([entry]) => {
    leftDivRef.current.style.opacity = "1";
    leftDivRef.current.style.transform = "translateX(0)";

    rightDivRef.current.style.opacity = "1";
    rightDivRef.current.style.transform = "translateX(0)";
  });

  useEffect(() => {
    observer.observe(leftDivRef.current);
    // Remove the observer as soon as the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    hideLeftNavbar && hideLeftNavbar();
  }, []);

  return (
    <div style={{ width: "100%", minHeight: "100vh" }}>
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
        theme="colored"
      />
      <div className="login-div-container">
        <div ref={leftDivRef} className="loginPage-background-image-div">
          <Suspense fallback={<></>}>
            <LottiAnimation
              lotti={LoginPageLotti}
              className="loginPage-background-image"
            />
          </Suspense>
        </div>
        <div ref={rightDivRef} className="login-fulldiv">
          <div className="login-page-message-icon-div">
            <IoArrowRedo className="login-page-message-icon" />
          </div>
          <div className="login-page-logo-div">
            <Suspense fallback={<></>}>
              <Logo className="login-page-logo" />
            </Suspense>
          </div>
          <div className="login-page-logo-underline-div"></div>
          <h1>Login Here</h1>
          <div
            style={{
              borderRadius: "0 50px 50px 0",
              height: "10px",
              backgroundColor: "cyan",
              marginLeft: "0",
              width: "90%",
            }}
            className="underline"
          ></div>
          <div className="login-div">
            <form onSubmit={onLogInSubmitHandler}>
              <InputField
                type="text"
                placeholder="Email"
                onChange={emailOnchangeHandler}
                style={{
                  color: "whiteSmoke",
                }}
              />
              <br />
              <br />
              <InputField
                type="password"
                placeholder="Password"
                onChange={passwordOnchangeHandler}
                style={{
                  color: "whiteSmoke",
                }}
              />
              <br />
              <br />
              <GlobalButton
                text="Login"
                borderColor="cyan"
                color="cyan"
                backgroundColor="cyan"
                style={{
                  width: "276px",
                }}
              />
              <br />
            </form>
            <br />
            <br />
            <div
              style={{
                backgroundColor: "#3D3F42",
                width: "100%",
                height: "1px",
                margin: "0 auto",
              }}
            ></div>

            <div className="login-with-google-button-div">
              <div onClick={googleSignUpHandler} className="google-login-div">
                <div className="google-login-svg-div">
                  <GoogleSvg />
                </div>
                <div className="google-login-text-div">Login with Google</div>
              </div>
            </div>
            <span className="login-page-signup-link">
              Not registered yet ?{" "}
              <Link to="/signup">
                <i
                  style={{ fontSize: "0.8rem" }}
                  className="fas fa-user-plus"
                ></i>{" "}
                Sign Up
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(LogIn);
