import { Container, Nav, Navbar } from "react-bootstrap";

function Header() {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Timetable App</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#/"></Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Header;

