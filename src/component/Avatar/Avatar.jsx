import React, { useRef } from "react";
import "./Avatar.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import noPicAvatar from "../../images/noPicAvatar.jpg";

const Avatar = (props) => {
    const linkRef = useRef();

    if (props && props.link) {
        return (
            // u => means the profile pic is uploaded by the user and that "u" actually means the uploaded folder in the backend
            <div
                style={{
                    height: props && props.height && props.height,
                    width: props && props.width && props.width,
                    borderColor: props && props.borderColor && props.borderColor,
                    borderWidth: props.width && props.borderWidth,
                }}
                className={`avatar__outer-div ${props && props.className && props.className
                    }`}
            >
                <Link ref={linkRef} to={props && props.link && props.link} />
                <LazyLoadImage
                    placeholderSrc={process.env.PUBLIC_URL + "/logo192.png"}
                    height="100%"
                    width="100%"
                    alt="avatarPic"
                    onClick={() => {
                        console.log(props && props.link && props.link);
                        linkRef && linkRef.current && linkRef.current.click();
                    }}
                    className="avatar-image"
                    style={{
                        height: props.height,
                        width: props.width,
                    }}
                    src={
                        props.image
                            ? props.image[0] == "u"
                                ? process.env.REACT_APP_BACKEND_API_URL + props.image
                                : props.image
                            : noPicAvatar
                    }
                />
            </div>
        );
    }

    return (
        <div
            style={{
                height: props && props.height && props.height,
                width: props && props.width && props.width,
                borderColor: props && props.borderColor && props.borderColor,
                borderWidth: props.width && props.borderWidth,
            }}
            className={`avatar__outer-div ${props && props.className && props.className
                }`}
        >
            {/* <Link ref = {linkRef} to = {props && props.link && props.link} /> */}
            <LazyLoadImage
                placeholderSrc={process.env.PUBLIC_URL + "/logo192.png"}
                height="100%"
                width="100%"
                alt="avatarPic"
                onClick={() => {
                    props && props.onClick && props.onClick();
                }}
                className="avatar-image"
                style={{
                    height: props.height,
                    width: props.width,
                }}
                src={
                    props.image
                        ? props.image[0] == "u"
                            ? process.env.REACT_APP_BACKEND_API_URL + props.image
                            : props.image
                        : noPicAvatar
                }
            />
        </div>
    );
};

export default React.memo(Avatar);
