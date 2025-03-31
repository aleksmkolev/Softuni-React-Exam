import { useContext } from "react";
import { useRegister } from "../../api/authApi";
import { UserContext } from '../../contexts/UserContextInstance';
import { useNavigate, Link } from "react-router-dom";
import '../../../public/styles/Login.css';

export default function Register() {
    const navigate = useNavigate();
    const { register } = useRegister();
    const { userLoginHandler } = useContext(UserContext);

    const registerHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const { email, password, confirmPassword } = Object.fromEntries(formData);

        if (password !== confirmPassword) {
            // Add error handling here
            return;
        }

        try {
            const authData = await register(email, password);
            userLoginHandler(authData);
            navigate('/');
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={registerHandler}>
                <h1>Register</h1>
                
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="Enter your email"
                        required 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="Enter your password"
                        required 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input 
                        type="password" 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        placeholder="Confirm your password"
                        required 
                    />
                </div>

                <button type="submit" className="submit-btn">
                    Register
                </button>

                <div className="auth-link">
                    Already have an account?
                    <Link to="/login">Login here</Link>
                </div>
            </form>
        </div>
    );
}