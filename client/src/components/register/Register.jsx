import './Register.css'
import { Link, useNavigate } from 'react-router'
import { useRegister } from '../../api/authApi';
import { useActionState, useContext } from 'react';

import { UserContext } from '../../contexts/UserContext';

export default function Register() {
    const navigate = useNavigate();
    const {register} = useRegister();
    const {userRegisterHandler} = useContext(UserContext); 

    const registerHandler = async (_, formData) => {
        const {username, email, password, rePassword} = Object.fromEntries(formData);

        if (password !== rePassword) {
            // show error message
            alert('Password and Confirm Password should match!')
            return;
        }

        const authData = await register(email, username, password); 

        userRegisterHandler({...authData}); 

        navigate('/markers');
    }

    const [_, registerAction, isPending] = useActionState(registerHandler, {email: '', username: '', password: '', repassword: ''})

    return (
        <div className="feature">
            <div className="register-container">
                <h2>REGISTER</h2>
                <form className="form register-form" action={registerAction}>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" placeholder="Username" required />

                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Email" required />

                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Password" required />

                    <label htmlFor="rePassword">Confirm Password</label>
                    <input type="password" id="rePassword" name="rePassword" placeholder="Confirm Password" required />
                    <input type="submit" className="btn submit" value="Register" disabled={isPending} />
                </form>
                <p>Already been on our map? Just <Link to="/login">log in</Link></p>
            </div>
        </div>
    );
};