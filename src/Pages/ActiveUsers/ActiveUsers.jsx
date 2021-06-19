import React from "react";
import "./ActiveUsers.css";

const ActiveUsers=(props)=>{
    return(
        <div className="active-users__users">
            <h3>OUR USERS</h3>
            <ul className="container">
                {props.users.map((eachUsers)=>{
                    return(
                        <li>
                            {eachUsers.username}
                        </li>
                    )
                })}
            </ul>
        </div>
    )

}

export default ActiveUsers;