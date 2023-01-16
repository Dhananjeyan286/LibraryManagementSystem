import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { logout } from "../actions/UserActions";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <a href="/">
                        <Navbar.Brand>Affins Library</Navbar.Brand>
                    </a>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            {userInfo ? (
                                <NavDropdown
                                    title={userInfo.name}
                                    id="username"
                                >
                                    <NavDropdown.Item href="/profile">
                                        Profile
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <a href={"/login"} style={{ color: "white" }}>
                                    <i className="fas fa-user"></i> Sign In
                                </a>
                            )}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title="Admin" id="adminmenu">
                                    <NavDropdown.Item href="/admin/userlist">
                                        Users
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/admin/booklist">
                                        Books
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/admin/orderlist">
                                        Orders
                                    </NavDropdown.Item>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
