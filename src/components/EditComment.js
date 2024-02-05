import React, { useState, useEffect } from "react";
import "./Post.css";
import { Button, Row, Col, Modal, Form, Spinner } from "react-bootstrap";
import { updateComments } from "../redux/actions/updateComments";
import { useDispatch } from "react-redux";

const EditComment = (props, modalClose, setPerticularComment) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const updateCommentData = () => {
        setLoading(true);
        let data = {
            id: props.id,
            commentDescription: props.perticularComment
        };
        dispatch(updateComments(data)).then((res) => {
            setLoading(false);
            if (res.type === "success" && res.data && res.data.length > 0) {
                props.setUpdated(true);
                props.modalClose();
            } else {
                console.log(res);
            }
        });
    }

    return (
        <>
            <Modal show={props.perticularShow} scrollable={true} size="lg" onHide={props.modalClose} backdrop="static" keyboard={false} 
            >
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3 mt-3" >
                            <Row>
                                {/* <Modal.Title>{props.title} - Comments</Modal.Title> */}
                                {/* <Form.Label htmlFor="commentContent">Comment</Form.Label> */}
                                <Col md={10}>
                                    <Form.Control type="text" id="text" autoComplete="off"
                                        value={props.perticularComment} aria-describedby="text"
                                        onChange={(event) => props.setPerticularComment(event.target.value)}
                                        required />
                                </Col>
                                <Col md={2}>
                                    <div className="btn-center">

                                        <Button size="sm"
                                            onClick={updateCommentData}
                                            disabled={props.perticularComment.trim().length > 0 ? false : true} >
                                            {loading && (
                                                <Spinner animation="border" role="status" variant="light" size="sm">
                                                    <span className="visually-hidden">Loading...</span>
                                                </Spinner>
                                            )}Update
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Form.Group>
                        <Button size="sm" onClick={props.modalClose} className="float-end">
                            Close
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )

}

export default EditComment;