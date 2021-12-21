import { Form, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, signIn } from '../services/AuthServices';
import { useAuthState } from 'react-firebase-hooks/auth';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, error, loading] = useAuthState(auth);
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        signIn(email, password);
    }

    useEffect(() => {
        if (loading) return
        if (user) navigate('/works')
    }, [user, loading])

    return (
        <>
            <h2 className='mt-3 text-center'>Login</h2>
            <Form className='mx-auto col-sm-6' onSubmit={submitHandler}>
                <Form.Group className='mb-3'>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type='submit'>
                    Login
                </Button>
                <ul>
                    <li>Don't have account? <Link to='/register'>Register</Link></li>
                    <li>Forgot password? <Link to='/reset'>Reset password</Link></li>
                </ul>
            </Form>

        </>
    )
}

export default Login