import { useEffect, useState } from 'react';
import axios from 'axios';

const Verification = () => {
    const [token, setToken] = useState('');
    const [message, setMessage] = useState('Verifying...');

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const tokenValue = urlParams.get('token');

        // if token is not present in url
        if (!tokenValue) {
            return setMessage('Error. (Token not found)')
        }

        // verify token
        axios.get(`${import.meta.env.VITE_API_URL}/auth/verify-email?token=${tokenValue}`)
            .then(response => {
                setMessage("Email verified successfully.");
            })
            .catch(error => {
                console.log(error);
                setMessage('Error verifying email.');
            });
        setToken(tokenValue);
    }, []);



    return (
        <div>
            <div className='bg-white rounded-lg p-8 mx-auto mt-20 max-w-md shadow-md'>
                <h2 className='text-4xl font-bold mb-4'>{message}</h2>
                <p className='text-lg'>
                    if already verified then &nbsp;
                    <a href='/login' className='text-blue-500 hover:text-blue-700'>
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Verification;
