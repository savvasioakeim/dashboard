import './Form.css'
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from 'react';
import CheckboxWithCheckmark from './Checkbox';




export default function Form() {

    const [showPassword, setShowPassword] = useState(false);

    function toggleEye() {
        setShowPassword((prevState) => !prevState);
    }



    return (
        <div className="container">
            <div className='header'>
                <p className='mb-2 text-3xl'>Sign in to your account</p>
                <div className='emailLabel'>
                    <span className='emailSpan'><label htmlFor="email">Email</label></span>

                    <input type="text" />
                </div>

                <div className='mb-2'>

                    <div className='passwordLabel'>
                        <div>
                            <span>Password</span>
                        </div>
                        <div>
                            <span className='forgotPasswordSpan' >Forgot your password?</span>
                        </div>
                    </div>

                    <div className="passwordContainer" style={{ position: 'relative' }}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                        />
                        {showPassword ? (
                            <FaRegEyeSlash
                                onClick={toggleEye}
                                style={{
                                    position: 'absolute',
                                    right: '1em',
                                    bottom: '0.6rem',
                                    fontSize: '1.7rem',
                                    cursor: 'pointer',
                                    userSelect: 'none'
                                }}
                            />
                        ) : (
                            <FaEye
                                onClick={toggleEye}
                                style={{
                                    position: 'absolute',
                                    right: '1em',
                                    bottom: '0.6rem',
                                    fontSize: '1.7rem',
                                    cursor: 'pointer',
                                    userSelect: 'none'
                                }}
                            />
                        )}
                    </div>

                </div>
                <div>
                    <CheckboxWithCheckmark />
                </div>





            </div>
        </div>
    )
}