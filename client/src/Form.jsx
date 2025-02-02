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
        <div className="container rounded flex flex-col pb-2 pl-2 pr-2 " >
            <div className='header pt-20 pb-5 pl-10 pr-10'>
                <p className='mb-5 text-3xl font-bold '>Sign in to your account</p>
                <div className='emailLabel '>
                    <span className='emailSpan '><label className='text-m' htmlFor="email">Email</label></span>

                    <input type="text" className='w-full p-2 rounded border-1 border-stone-500 focus:border-blue-500 focus:ring-3 focus:ring-blue-300  transition-outline duration-300' />
                </div>

                <div className='mb-2'>

                    <div className='passwordLabel'>
                        <div>
                            <span className='text-m'>Password</span>
                        </div>
                        <div>
                            <span className='forgotPasswordSpan text-m' >Forgot your password?</span>
                        </div>
                    </div>

                    <div className="passwordContainer mb-3" style={{ position: 'relative' }}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className='w-full p-2 rounded border-1 border-stone-500 focus:border-blue-500 focus:ring-3 focus:ring-blue-300   transition-outline duration-300'

                        />
                        {showPassword ? (
                            <FaRegEyeSlash
                                onClick={toggleEye}
                                style={{
                                    position: 'absolute',
                                    right: '0.8em',
                                    bottom: '0.5rem',
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
                                    right: '0.8em',
                                    bottom: '0.5rem',
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

                <div className='text-center mt-2   '>
                    <button className='flex items-center justify-center bg-blue-600 text-white rounded hover:border-transparent hover:bg-blue-700 w-110 text-1xl h-10 hover:cursor-pointer active:ring-3 active:ring-blue-300'> Sign in</button>
                </div>




            </div>
            <div className='text-center mt-5 w-full bg-neutral-200 h-14 flex items-center justify-center mt-7  rounded'>
                <p>Click <span className='text-purple-400 underline hover:text-purple-600 hover:cursor-pointer'>here</span> to make an account</p>
            </div>
        </div>
    )
}