import react from "react"
import "./footer.css"

import MongodbIcon from "../../images/mongodb.svg"
import ExpressIcon from "../../images/express.svg"
import ReactIcon from "../../images/react.svg"
import NodeIcon from "../../images/nodejs.svg"

const Footer=()=>{
    return(
        <div className="footer-full-container">
            <h1>Made with ❤ using</h1>
            <br/>
            <div className="footer-icons-full-div">
            <div className="icon-first-div">
                <img className="footer-icons" src={MongodbIcon}/>
                <img id="express-icon" className="footer-icons" src={ExpressIcon}/>
            </div>
            <div className="icon-second-div">
                <img id="react-icon" className="footer-icons" src={ReactIcon}/>
                <img className="footer-icons" src={NodeIcon}/>
            </div>
            </div>
            <div style={{backgroundColor:"rgb(228, 228, 9)"}} className="welcome-page-top-underline">
            
        </div>
            <div className="footer-links">
                <a href="https://www.facebook.com/sushanta.saren.73/" ><i className="fab fa-facebook-f fa-2x"></i></a>
                <a href="https://github.com/i9f3ct3d" ><i className="fab fa-github fa-2x"></i></a>
                <a href="https://www.instagram.com/elite_sushanta/" ><i className="fab fa-instagram fa-2x"></i></a>
                <a href="https://twitter.com/SushantaSaren7" ><i className="fab fa-twitter fa-2x"></i></a>
            </div>
            <p>Copyright© 2020-21</p>
        </div>
    );
}

export default Footer;