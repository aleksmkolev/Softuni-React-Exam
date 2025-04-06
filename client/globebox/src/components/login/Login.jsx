import { Link, useNavigate } from 'react-router'
import { useActionState, useContext } from 'react'

import '../../../public/styles/Login.css'
import { useLogin } from '../../api/authApi';
import { UserContext } from '../../contexts/UserContext';

export default function Login() {
    const navigate = useNavigate(); 
    const {login} = useLogin(); 
    const {userLoginHandler} = useContext(UserContext);

    const loginHandler = async (_, formData) => {
        const {email, password} = Object.fromEntries(formData); 
        const authData = await login(email, password);
        userLoginHandler(authData);
        navigate('/box');
        return authData;
    };

    const [, loginAction, isPending] = useActionState(loginHandler, {email: '', password: ''})

    return (
        <div className="auth-container">
            <form className="auth-form" action={loginAction}>
                <h1>Login</h1>
                
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="Email" 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="Password" 
                        required 
                    />
                </div>

                <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={isPending}
                >
                    Login
                </button>

                <div className="auth-link">
                    Your first time here?
                    <Link to="/register">Register</Link>
                </div>
            </form>
        </div>
    );
};