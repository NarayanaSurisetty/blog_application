import React, { useEffect, useRef, useState } from "react";
import { Button, Navbar, Nav, Container, Modal, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/userAuthContext";
import LoadingBar from 'react-top-loading-bar';
import Posts from "./Posts";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useDispatch } from "react-redux";
import { createNewPost } from '../redux/actions/newPostAction';
import { getAllBlogPosts } from "../redux/actions/getAllBlogPosts";
import { auth } from "../firebase";
import "../App"
import NewPost from "./NewPost";

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
    const [loading, setLoading] = useState(false);
    const [getAllPosts, setGetAllPosts] = useState([]);

    const getAllPostsDataMethod = () => {
        ref.current.staticStart();
        dispatch(getAllBlogPosts()).then((res) => {
            ref.current.complete();
            if (res.type === "success") {
                setGetAllPosts(res.data);
            } else {
                setGetAllPosts([]);
            }
        });
    }

    useEffect(() => {
        getAllPostsDataMethod();
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

    const createNewPostData = async (event) => {
        event.preventDefault();
        setLoading(true);
        setValidated(true);
        if (postTitle.trim() !== "" && postContent.trim() !== "") {
            await auth.currentUser.reload().then(() => {
                let data = {
                    UserUID: auth.currentUser.uid,
                    Name: auth.currentUser.displayName,
                    Title: postTitle,
                    Description: postContent
                }
                dispatch(createNewPost(data)).then((res) => {
                    setLoading(false);
                    if (res.type === "success") {
                        setValidated(false);
                        setNewPostModal(false);
                        setPostTitle("");
                        setPostContent("");
                        getAllPostsDataMethod();
                    } else {
                        setLoading(false);
                    }
                });
            })
        } else {
            setLoading(false);
        }
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
                            {/* <Modal show={newPostModalShow} onHide={newPostFormClose}
                                backdrop="static" keyboard={false}
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
                                    <div className="btn-center">
                                        {loading && (
                                            <Spinner animation="border" role="status" variant="primary">
                                                <span className="visually-hidden">Loading...</span>
                                            </Spinner>
                                        )}
                                        <Button type="submit" onClick={createNewPostData} disabled={loading}>
                                            Create New Post
                                        </Button>
                                    </div>
                                </Modal.Body>
                            </Modal> */}
                            <NewPost show={newPostModalShow} onHide={newPostFormClose}
                                validated={validated} onChangePostTitle={onChangePostTitle}
                                onChangePostContent={onChangePostContent}
                                loading={loading} createNewPostData={createNewPostData}
                                postTitle={postTitle} postContent={postContent} />
                            {/* ------------ Create Post Modal End ---------  */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Posts getAllPostsData={getAllPosts} getAllPostsDataMethod={getAllPostsDataMethod} />
        </>
    );
};

export default Home;