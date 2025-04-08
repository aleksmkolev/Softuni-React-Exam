import { Link, useNavigate } from 'react-router'
import { useActionState, useContext } from 'react'

import './Login.css'
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
        navigate('/markers');
        // navigate(-1);
        return authData;
    };

    const [_, loginAction, isPending] = useActionState(loginHandler, {email: '', password: ''})
    
    return (
        <div className="feature">
            <div className="login-container">
                <h2>LOGIN</h2>
                <form className="form login-form" action={loginAction}>
                    <input type="text" id="email" name="email" placeholder="Email" required />
                    <input type="password" id="password" name="password" placeholder="Password" required />
                    <input type="submit" className="btn submit login-btn" disabled={isPending} value="Login" />
                </form>
                <p>Your first time here? Go <Link to="/register">register</Link></p>
            </div>
        </div>
    );
};