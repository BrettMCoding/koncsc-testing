import React from 'react';
import AuthenticationService from '../services/AuthenticationService'


export default function LogoutComponent(props) {

    const logout = () => {
        AuthenticationService.logout()
        //console.log("\n\n\n\n\n")
        //console.log("Logout successful")
        //console.log("\n\n\n\n\n")
        props.getUserLoggedInProp(AuthenticationService.isUserLoggedIn())
    }

    return (
        <div>
            {props.isUserLoggedIn && 
                <button className="btn btn-danger" onClick={logout}>Logout</button> 
            }
        </div>
    )
}
