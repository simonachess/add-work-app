import { Form, Button } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import { register, auth } from '../services/AuthServices'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'

const Register = () => {

    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, error, loading] = useAuthState(auth); //auth, kad galetume tikrinti busenas
    const navigate = useNavigate()

    useEffect(() => {
        if (loading) return;
        if (user) navigate('/works')
    }, [user, loading])

    const submitHandler = (e) => {
        e.preventDefault();
        if (!userName) {
            alert('Enter name');
        }
        register(userName, email, password);
    }



    return (
        <>
            <h2 className='mt-3 text-center'>Register</h2>
            <Form className='mx-auto col-sm-6' onSubmit={submitHandler}>
                <Form.Group className='mb-3'>
                    <Form.Control
                        type='text'
                        placeholder='Your name'
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </Form.Group>
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
                    Register
                </Button>
            </Form>

        </>
    )
}

export default Register;