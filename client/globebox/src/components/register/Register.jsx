import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from '../../contexts/UserContext';
import { useRegister } from '../../api/authApi';
import '../../../public/styles/Register.css';

function Register() {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { userLoginHandler } = useContext(UserContext);
    const { register } = useRegister();

    const registerHandler = async (e) => {
        e.preventDefault();
        setError('');
        const formData = new FormData(e.target);
        const { email, password, confirmPassword } = Object.fromEntries(formData);

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const authData = await register(email, password);
            userLoginHandler({
                email: authData.email,
                accessToken: authData.accessToken
            });
            navigate('/');
        } catch (error) {
            setError('Registration failed. Please try again.');
            console.error('Registration error:', error);
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={registerHandler}>
                <h2>Register</h2>
                
                {error && <p className="error-message">{error}</p>}
                
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

export default Register;