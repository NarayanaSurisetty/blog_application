import React, { useEffect, useRef, useState } from "react";
import { Button, Navbar, Nav, Container, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/userAuthContext";
import LoadingBar from 'react-top-loading-bar';
import Posts from "./Posts";
import "bootstrap-icons/font/bootstrap-icons.css";
// import NewPostForm from './NewPostForm';
import { connect, useDispatch } from "react-redux";
// import { createNewPost } from '../redux/actions/newPostAction';
import { auth } from "../firebase";

const Home = () => {
    const { logOut, user } = useUserAuth();
    const [show, setShow] = useState(false);
    const [newPostModalShow, setNewPostModal] = useState(false);
    const [postContent, setPostContent] = useState("");
    const [postTitle, setPostTitle] = useState("");
    const navigate = useNavigate();
    const ref = useRef(null);
    const dispatch = useDispatch();
    const [validated, setValidated] = useState(false);

    useEffect(() => {
    }, [])

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const newPostFormOpen = () => setNewPostModal(true);
    const newPostFormClose = () => {
        setNewPostModal(false);
        setValidated(false);
    }

    const onChangePostContent = (e) => {
        setPostContent(e.target.value);
    }

    const onChangePostTitle = (e) => {
        setPostTitle(e.target.value);
    }

    const createNewPost = async (event) => {
        // let form = event.currentTarget;
        // if (form.checkValidity() === false) {
        //     event.preventDefault();
        //     event.stopPropagation();
        // }
        // ref.current.staticStart();
        // setValidated(true);
        // if (postTitle.trim() != "" && postContent.trim() != "") {
        //     await auth.currentUser.reload().then(() => {
        //         // console.log(auth.currentUser);
        //         let data = {
        //             UserUID: auth.currentUser.uid,
        //             Name: auth.currentUser.displayName,
        //             Title: postTitle,
        //             Description: postContent
        //         }
        //         dispatch(createNewPost(data)).then(async (res) => {
        //             console.log(res);
        //             ref.current.complete();
        //             if (res.type == 'success') {
        //                 setValidated(false);
                      setNewPostModal(false);
        //             } else {
        //                 console.log(res);
        //             }
        //         });
        //     })
        // } else {
        //     ref.current.complete();
        // }
    }

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
                            <Button variant="light" title="Create Post" onClick={newPostFormOpen}>
                                <i className="bi bi-file-plus"></i> Create Post
                            </Button>
                            &nbsp;
                            <Button type="button" variant="danger" title="Logout" onClick={handleShow}>
                                <i className="bi bi-box-arrow-right"></i>
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
                            <Modal show={newPostModalShow} onHide={newPostFormClose} backdrop="static" keyboard={false}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>New Blog Post</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form noValidate validated={validated}>
                                        <Form.Group className="mb-3" >
                                            <Form.Label htmlFor="title">Post title</Form.Label>
                                            <Form.Control type="text" id="title" aria-describedby="PostTitle"
                                                onChange={onChangePostTitle} required />
                                        </Form.Group>
                                        <Form.Group
                                            className="mb-3"
                                            controlId="exampleForm.ControlTextarea1"
                                        >
                                            <Form.Label>Post Content</Form.Label>
                                            <Form.Control as="textarea" rows={8} onChange={onChangePostContent} required />
                                        </Form.Group>
                                    </Form>
                                    <Button type="submit" onClick={createNewPost}>
                                        Create New Post
                                    </Button>
                                </Modal.Body>
                            </Modal>
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