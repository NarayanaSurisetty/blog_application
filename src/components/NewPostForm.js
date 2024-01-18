import React, { useEffect, useRef, useState } from "react";
import { Button, Navbar, Nav, Container, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/userAuthContext";
import LoadingBar from 'react-top-loading-bar';
import Posts from "./Posts";
import "bootstrap-icons/font/bootstrap-icons.css";
import { connect } from "react-redux";


const NewPostForm = () => {
    const [text, setText] = useState(null);
    const [newPostModalShow, setNewPostModal] = useState(false);
    const [postContent, setPostContent] = useState(null);

    const newPostFormOpen = () => setNewPostModal(true);
    const newPostFormClose = () => setNewPostModal(false);

    const onChangePostContent = (e) => {
        setPostContent(e.target.value);
    }

    const createNewPost = (e) => {
        e.preventDefault();
        this.props.addPost({ text: this.state.text, id: 1 })
        this.setState({ text: "" })
    }

    // handleOnChange = event => {
    //     this.setState({ text: event.target.value })
    // }

    // handleOnSubmit = event => {
    //     event.preventDefault()
    //     console.log(this.state.text)
    // }

    return (
        <div>
            {/* <h2>New Post Form:</h2>
                <form onSubmit={this.handleOnSubmit}>
                    <textarea
                        placeholder="Post Content..."
                        value={this.state.text}
                        onChange={this.handleOnChange}
                    >
                    </textarea>
                    <input type="submit" />
                </form> */}
            {/* ------------ Create Post Modal Start ---------  */}
            <Modal show={newPostModalShow} onHide={newPostFormClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>New Blog Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Post Content:</Form.Label>
                            <Form.Control as="textarea" rows={8} onChange={onChangePostContent} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={newPostFormClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={createNewPost}>
                        Create New Post
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* ------------ Create Post Modal End ---------  */}

        </div>
    )
}


export default NewPostForm