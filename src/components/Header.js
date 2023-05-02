import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { useAuthState } from "react-firebase-hooks/auth"
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, logout } from '../services/AuthServices'

function Header() {

    const [user, loading] = useAuthState(auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (loading) return
        if (!user) navigate('/')
    }, [user, loading])

    return (
        <Navbar bg="light" variant="dark">
            <Container>
                <Navbar.Brand href="/" className="text-info">Timetable App</Navbar.Brand>

                <Nav className="me-auto">
                    <Nav.Link href="#/"></Nav.Link>
                </Nav>
                <div>
                    <Navbar.Collapse>
                    {
                        user &&
                        <NavDropdown title={user.displayName ?? user.email}>
                            <NavDropdown.Item>{user.email}</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    }
                    </Navbar.Collapse>
                </div>
            </Container>
        </Navbar>
    )
}

export default Header

