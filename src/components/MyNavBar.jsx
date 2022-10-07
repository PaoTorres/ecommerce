import React, { useState } from 'react';
import { Navbar, Container, Nav, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import CartSideBar from './CartSideBar';


const MyNavBar = () => {

    const navigate = useNavigate();

    const logout =()=>{
        localStorage.setItem("token", "");
        navigate("/login");
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Navbar bg="primary" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand to="/" as={Link}>Shopping App</Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/product">Product</Nav.Link>
                            <Nav.Link as={Link} to="/purchases">Purchases</Nav.Link>
                            <Nav.Link onClick={handleShow}>Cart (Sidebar)</Nav.Link>
                            <Nav.Link onClick={logout}>Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <CartSideBar show={show} handleClose={handleClose} />
        </>
    );
};

export default MyNavBar;