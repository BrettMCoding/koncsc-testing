import React, { useState, useEffect } from 'react'
import axios from 'axios';

export default function ForgotPasswordComponent() {
    const API_URL = process.env.REACT_APP_API_DOMAIN
    const APP_URL = process.env.REACT_APP_DOMAIN

    const [email, updateEmail] = useState('');
    const [hasRegisterFailed, setRegisterFailed] = useState(false);
    const [showSuccessMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        document.title = "Forgot Password"
     }, []);

    const eventUpdateEmail = (event) => updateEmail(event.target.value);

    const requestRegisterNewUser = (email) => {
        let url = API_URL + '/forgot'
        return axios.post(url,
            { "email": email })
            .then((res) => {
                console.log(res)
                setSuccessMessage(true)
                setRegisterFailed(false)
            }).catch((err) => {
                setErrorMessage(err.response.data)
                setRegisterFailed(true)
            })
    }


    return (
        <div>
            <div className="container form-group d-flex flex-column">
            <h1 className="text-center">Forgot Password?</h1>

                    {hasRegisterFailed && <div className="alert alert-warning">{"Error: " + errorMessage}</div>}

                    {showSuccessMessage && <div className="alert alert-success text-center">An email has been sent to the provided email address. Please click the forgot password link in the email to continue</div>}

                    {!showSuccessMessage &&
                    <>
                    Email: <input type="text" className="form-control" name="email" value={email} onChange={eventUpdateEmail}/>

                    <button className="btn btn-lg btn-success p-1 mt-3 mb-2" onClick={(event) => {event.persist(); requestRegisterNewUser(email);}}>Submit</button>
                    </>
                    }
                <a href={APP_URL} className="text-center m-auto w-50 btn btn-secondary">Back to homepage</a>
            </div>
        </div>
    )
}
