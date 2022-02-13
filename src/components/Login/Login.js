import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

import { auth } from '../../firebase';

import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const signIn = async(e) => {
        e.preventDefault();

        try {
            const { user } = await  signInWithEmailAndPassword(auth, email, password);

            if(user) {
                navigate('/');
            }
        } catch (error) {
            alert(error.message);
        }

    }

    const register = async(e) => {
        e.preventDefault();

        try {
          const { user } = await createUserWithEmailAndPassword(auth, email, password);

          if(user) {
            navigate('/');
          }
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div className='login'>
            <Link to="/">
                <img
                    className='login__logo'
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
                    alt="amazon logo"
                />
            </Link>

            <div className="login__container">
                <h1>Sign-in</h1>

                <form>
                    <h5>E-mail</h5>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <h5>Password</h5>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        type='submit'
                        className='login__signInButton'
                        onClick={signIn}
                    >
                        Sign In
                    </button>
                </form>

                <p>
                    By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                <button
                    onClick={register}
                    className='login__registerButton'
                >
                    Create your Amazon Account
                </button>
            </div>
        </div>
    );
};

export default Login;
