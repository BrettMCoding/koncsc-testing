import React, { useState } from 'react';
import AuthenticationService from '../services/AuthenticationService';
import { useAlert } from 'react-alert';

function LoginComponent(props) {
    const APP_URL = process.env.REACT_APP_DOMAIN

    const [email, updateEmail] = useState('');
    const [password, updatePassword] = useState('');
    const [hasLoginFailed, setLoginFailed] = useState(false);
    const [showSuccessMessage, setSuccessMessage] = useState(false);
    const alert = useAlert();

    const loginClicked = () => {
        ///console.log("\n\n\n\n\n")
        //console.log("attempting to login")
        //console.log("\n\n\n\n\n")

        AuthenticationService
            .executeBasicAuthenticationService(email, password)
            .then(() => {
                AuthenticationService.registerSuccessfulLogin(email, password)
                alert.show("Login Successful", {type:'success', timeout: 5000})
                // this.props.history.push(`/courses`)

                props.toggleModal();
                props.getUserLoggedInProp(AuthenticationService.isUserLoggedIn());
                props.loadCharacterList();

            }).catch(() => {
                setSuccessMessage(false);
                setLoginFailed(true);
                //console.log("Login Failed. Likely invalid credentials (401)")
                //console.log("\n\n\n\n\n")
            })
    }

    const eventUpdateEmail = (event) => updateEmail(event.target.value);
    const eventUpdatePassword = (event) => updatePassword(event.target.value);

    return (
        <div>
        {!props.isUserLoggedIn &&
                <div className="container form-group d-flex flex-column">
                    <h1 className="text-center">Login</h1>

                    {hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}

                    {showSuccessMessage && <div className="alert alert-success text-center">Login Successful</div>}

                    Email: <input type="text" className="form-control" name="email" value={email} onChange={eventUpdateEmail}/>

                    Password: <input type="password" className="form-control" name="password" value={password} onChange={eventUpdatePassword}/>

                    <button className="btn btn-lg btn-success p-1 mt-3 mb-2" onClick={loginClicked}>Login</button>
                    <div>
                        <a href={APP_URL + '/register'} className="btn btn-outline-secondary text-center">Create account</a>
                        <a href={APP_URL + '/forgot'} className="btn btn-outline-secondary text-center">Forgot your password?</a>
                        
                    </div>
                </div>
            }
        </div>
    )
}

export default LoginComponent