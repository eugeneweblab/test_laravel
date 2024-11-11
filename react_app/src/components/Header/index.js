import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { UserContext } from '../../context/UserContext';
import { ApiContext } from '../../context/ApiContext';

function Header() {
    const { role, setUserRole } = useContext(UserContext);
    const api = useContext(ApiContext);

    const logOutHandler = async () => {
        setUserRole(null);
        await api.logout();
    }

    return (
        <header>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">My App</Navbar.Brand>

                    <Navbar.Toggle aria-controls="navbarNav" />

                    <Navbar.Collapse id="navbarNav">
                        <Nav className="ms-auto">
                            {
                                (role ) ?
                                <Nav.Item>
                                    <button type="button"
                                            className="btn btn-light"
                                            onClick={logOutHandler}>
                                        Sing Out
                                    </button>
                                </Nav.Item>
                                :
                                <Nav.Item>
                                    <Nav.Link as={Link} to="/">Sign In</Nav.Link>
                                </Nav.Item>
                            }


                            {
                                role=== 'admin' ?
                                <Nav.Item>
                                    <Nav.Link as={Link} to="/user-list">User List</Nav.Link>
                                </Nav.Item>
                                : ''
                            }

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
