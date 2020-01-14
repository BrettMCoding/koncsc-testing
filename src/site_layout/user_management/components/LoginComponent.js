import React, { useState } from 'react';
import AuthenticationService from '../services/AuthenticationService';

function LoginComponent(props) {

    const [email, updateEmail] = useState('');
    const [password, updatePassword] = useState('');
    const [hasLoginFailed, setLoginFailed] = useState(false);
    const [showSuccessMessage, setSuccessMessage] = useState(false);

    const loginClicked = () => {
        ///console.log("\n\n\n\n\n")
        //console.log("attempting to login")
        //console.log("\n\n\n\n\n")

        AuthenticationService
            .executeBasicAuthenticationService(email, password)
            .then(() => {
                AuthenticationService.registerSuccessfulLogin(email, password)
                // this.props.history.push(`/courses`)

                props.toggleModal();
                props.getUserLoggedInProp(AuthenticationService.isUserLoggedIn())

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
                <div class="container form-group d-flex flex-column">
                    <h1 className="text-center">Login</h1>

                    {hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}

                    {showSuccessMessage && <div className="alert alert-success text-center">Login Successful</div>}

                    Email: <input type="text" class="form-control" name="email" value={email} onChange={eventUpdateEmail}/>

                    Password: <input type="password" class="form-control" name="password" value={password} onChange={eventUpdatePassword}/>

                    <button className="btn btn-lg btn-success p-1 mt-3 mb-2" onClick={loginClicked}>Login</button>
                </div>
            }
        </div>
    )
}

export default LoginComponent