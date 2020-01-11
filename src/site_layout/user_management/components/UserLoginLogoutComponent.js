import React, { useState } from 'react';
import LoginComponent from './LoginComponent';
import LogoutComponent from './LogoutComponent';
import AuthenticationService from '../services/AuthenticationService'

export default function UserLoginLogoutComponent() {

    const [isUserLoggedIn, setUserLoggedIn] = useState(AuthenticationService.isUserLoggedIn());

    const getUserLoggedInProp = (boolean) => {
        setUserLoggedIn(boolean);
    }

    return (
            <div className="App">

                <LogoutComponent isUserLoggedIn={isUserLoggedIn} getUserLoggedInProp={getUserLoggedInProp} />

                <LoginComponent isUserLoggedIn={isUserLoggedIn} getUserLoggedInProp={getUserLoggedInProp} />

            </div>
    );

}
