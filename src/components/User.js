import { Navbar, NavDropdown } from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, logout } from '../services/AuthServices';
import * as userServices from '../services/UserServices'

const User = () => {

    const [userData, setUserData] = useState([]);
    const [user, error, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return
        if (!user) navigate('/')
        userServices.getUserData(user, setUserData)
    }, [user, loading])

    return (
        <>
            <Navbar.Collapse>
                {
                    user &&
                    <NavDropdown title={userData.name}>
                        <NavDropdown.Item>{userData.email}</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                }
            </Navbar.Collapse>
        </>
    )
}

export default User