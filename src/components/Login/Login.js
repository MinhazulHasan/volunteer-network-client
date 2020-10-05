import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import googleIcon from '../../logos/google.png'
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../Firebase/firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [user, setUser] = useState({
        name: '',
        email: '',
        photo: ''
    })

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: '/' } };

    const provider = new firebase.auth.GoogleAuthProvider();
    const googleSignIn = () => {
        firebase.auth().signInWithPopup(provider)
            .then(res => {
                const { displayName, photoURL, email } = res.user;
                const signedInUser = {
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setUser(signedInUser);
                setLoggedInUser(signedInUser);
                history.replace(from);
            })
            .catch(error => {
                document.getElementById('login-error').innerText = error.message;
            });
    }
    return (
        <div className="lightgray-bg d-flex align-items-center justify-content-center">
            <div className="form-box">
                <div className="login text-center m-5 p-5">
                    <h2 className="mb-4 pt-5">Login With</h2>
                    <Button onClick={googleSignIn} className="login-btn" variant="light" size="md" block>
                        <img src={googleIcon} alt="" />
                        <span className="mx-auto">Continue with Google</span>
                    </Button>
                    <p className='text-danger mt-1 text-center' id='login-error'></p>
                    <p className="mt-2 pb-5">Don’t have an account? <span className="text-primary">Create an account</span></p>
                </div>
            </div>
        </div>
    );
};

export default Login;