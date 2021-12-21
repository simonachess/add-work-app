import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, resetPassword } from '../services/AuthServices';

const Reset = () => {
    const [email, setEmail] = useState();

    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        if (!email) {
            alert('Enter email');
        } else {
            resetPassword(email);
            navigate('/login');
        }

    }

    return (
        <>
            <h2 className='mt-3 text-center'>Reset your password</h2>
            <Form className='max-auto col-sm-3 text-center' onSubmit={submitHandler}>
                <Form.Control
                    className='m-3'
                    type='email'
                    placeholder='enter your email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <Button type='submit'>Reset</Button>
            </Form>
            <div className='max-auto col-sm-6 text-center mt-3'>
                Don't have an account? <Link to='/register'>Register</Link>
            </div>
        </>
    )
}

export default Reset