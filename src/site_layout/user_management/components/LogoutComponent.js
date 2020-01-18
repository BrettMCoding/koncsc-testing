import React from 'react';
import AuthenticationService from '../services/AuthenticationService'
import { useAlert } from 'react-alert';

export default function LogoutComponent(props) {
    const alert = useAlert();

    const logout = () => {
        AuthenticationService.logout()
        alert.show('Logout Successful', {type:'success', timeout:5000})
        props.getUserLoggedInProp(AuthenticationService.isUserLoggedIn())
    }

    return (
        <div>
                <button className="btn btn-danger" onClick={logout}>Logout</button> 
        </div>
    )
}
