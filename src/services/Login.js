import { Form, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(email, password)
    }


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