import React, { useState, useEffect } from 'react'
import axios from 'axios';

export default function NewPasswordComponent(props) {

    const [password, updatePassword] = useState('');
    const [password2, updatePassword2] = useState('');
    const [hasRegisterFailed, setRegisterFailed] = useState(false);
    const [showSuccessMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        document.title = "Enter New Password"
     }, []);

    const eventUpdatePassword = (event) => updatePassword(event.target.value);
    const eventUpdatePassword2 = (event) => updatePassword2(event.target.value);

    console.log(props)

    const requestNewPassword = (password, password2) => {

        return axios.post(`http://localhost:8080/confirm?token=` + props.match.params.token,
            { "p1": password,
                "p2": password2 })
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
            <h1 className="text-center">Enter New Password</h1>

                    {hasRegisterFailed && <div className="alert alert-warning">{"Error: " + errorMessage}</div>}

                    {showSuccessMessage && <div className="alert alert-success text-center">Password accepted. You may now log in normally. Thank you.</div>}

                    {!showSuccessMessage &&
                    <>
                    Password: <input type="password" className="form-control" name="password" value={password} onChange={eventUpdatePassword}/>

                    Confirm Password: <input type="password" className="form-control" name="password2" value={password2} onChange={eventUpdatePassword2}/>


                    <button className="btn btn-lg btn-success p-1 mt-3 mb-2" onClick={(event) => {event.persist(); requestNewPassword(password, password2);}}>Submit</button>
                    </>
                    }
                    <a href="http://localhost:3000" className="text-center m-auto w-50 btn btn-secondary">Back to homepage</a>
                </div>
        </div>
    )
}
