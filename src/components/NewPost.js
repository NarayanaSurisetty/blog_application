import React from "react";
import { Button, Modal, Form, Spinner } from "react-bootstrap";

const NewPost = (props) => {
    return (
        <Modal show={props.show} onHide={props.onHide} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>{props.page ? props.page : "New"} Blog Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={props.validated}>
                    <Form.Group className="mb-3" >
                        <Form.Label htmlFor="title">Post title</Form.Label>
                        <Form.Control type="text" id="title" aria-describedby="PostTitle"
                            value={props.postTitle}
                            onChange={props.onChangePostTitle} required />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Post Content</Form.Label>
                        <Form.Control as="textarea" rows={8} value={props.postContent} onChange={props.onChangePostContent} required />
                    </Form.Group>
                </Form>
                <div className="btn-center">
                    {props.loading && (
                        <Spinner animation="border" role="status" variant="primary">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    )}
                    <Button type="submit" onClick={props.createNewPostData} disabled={props.loading}>
                        {props.page ? props.page : "Create"} New Post
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default NewPost;