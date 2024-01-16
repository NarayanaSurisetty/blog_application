import React, { useEffect, useRef, useState } from "react";
import { Button, Navbar, Nav, Container, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/userAuthContext";
import LoadingBar from 'react-top-loading-bar';
import Posts from "./Posts";
import "bootstrap-icons/font/bootstrap-icons.css";

const Home = () => {
    const { logOut, user } = useUserAuth();
    const [show, setShow] = useState(false);
    // const [newPostModalShow, setNewPostModal] = useState(false);
    // const [logoutModalshow, setLogoutModalShow] = useState(false);
    const navigate = useNavigate();
    const ref = useRef(null);

    // useEffect(() => {
    //     // console.log(11111, user)
    // }, [])


    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const Logout = async () => {
        ref.current.staticStart();
        try {
            await logOut();
            ref.current.complete();
            navigate("/");
        } catch (error) {
            ref.current.complete();
            console.log(error.message);
        }
    };

    return (
        <>
            <LoadingBar color="#08518b" height={2.5} ref={ref} />
            <Navbar bg="primary" variant="dark" expand="md">
                <Container>
                    <Navbar.Collapse>
                        <Nav className="justify-content-start" style={{ width: "100%" }}>
                            <h5 className="name-textColor">Welcome {user && user.displayName}</h5>
                        </Nav>
                        <Nav className="justify-content-center" style={{ width: "100%" }}>
                            <h4 className="justify-content-center name-textColor">Blog Application</h4>
                        </Nav>
                        <Nav className="justify-content-end" style={{ width: "100%" }}>
                            <Button variant="light" title="Create Post">
                                <i class="bi bi-file-plus"></i> Create Post
                            </Button>
                            &nbsp;
                            <Button type="button" variant="danger" title="Logout" onClick={handleShow}>
                                <i class="bi bi-box-arrow-right"></i>
                            </Button>
                            {/* ------------ Logout Modal Start ---------  */}
                            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} >
                                <Modal.Header closeButton>
                                    <Modal.Title>Logout Confirmation!</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Are you sure want to logout ?</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        No
                                    </Button>
                                    <Button variant="primary" onClick={Logout}>
                                        Yes, logout
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                            {/* ------------ Logout Modal End ---------  */}

                            {/* ------------ Create Post Modal Start ---------  */}
                            {/* <Modal show={newPostModal} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Modal heading</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="name@example.com"
                                                autoFocus
                                            />
                                        </Form.Group>
                                        <Form.Group
                                            className="mb-3"
                                            controlId="exampleForm.ControlTextarea1"
                                        >
                                            <Form.Label>Example textarea</Form.Label>
                                            <Form.Control as="textarea" rows={3} />
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={handleClose}>
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
                            </Modal> */}
                            {/* ------------ Create Post Modal End ---------  */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Posts />
        </>
    );
};

export default Home;