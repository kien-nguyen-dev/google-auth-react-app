import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function App() {
    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState(null);
    const [ accessToken, setAccessToken ] = useState(null);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                axios
                    .post(`http://localhost:3000/google-login/callback`, {token: user.access_token})
                    .then((res) => {
                        setProfile(res.data.user)
                        setAccessToken(res.data.token)
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        setProfile(null);
    };
    return (
        <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            {profile && accessToken ? (
                <div>
                    <h3>User Logged in</h3>
                    <p>Email Address: {profile.email}</p>
                    <p>Access Token: {accessToken}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <button onClick={() => login()}>Sign in with Google 🚀 </button>
            )}
        </div>
    );
}
export default App;