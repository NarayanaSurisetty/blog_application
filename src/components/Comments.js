import React, { useState, useEffect } from "react";
import "./Post.css";
import { Button, Row, Col, Modal, Form, Spinner } from "react-bootstrap";
import { createNewComment } from "../redux/actions/newCommentAction";
import { getComments } from "../redux/actions/getComments";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";

const Comments = (props) => {
    const [commentContent, setCommentContent] = useState("");
    const [getAllComments, setGetAllComments] = useState([]);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getAllCommentsDataMethod();
        return () => {
            setGetAllComments([]);
        }
    }, [])

    const getAllCommentsDataMethod = () => {
        setCommentContent("");
        dispatch(getComments()).then((res) => {
            if (res.type == "success" && res.data && res.data.length > 0) {
                const res2 = res.data.filter((item) => {
                    return item.postId == props.id
                });
                setGetAllComments(res2.reverse());
            } else {
                setGetAllComments([]);
            }
        });
    }

    const onChangeCommentContent = (e) => {
        setCommentContent(e.target.value);
    }

    const createNewCommentData = async (e) => {
        e.preventDefault();
        setLoading(true);
        await auth.currentUser.reload().then(() => {
            let data = {
                PostId: props.id,
                UserUID: auth.currentUser.uid,
                UserName: auth.currentUser.displayName,
                CommentDescription: commentContent
            }
            dispatch(createNewComment(data)).then((res) => {
                setLoading(false);
                if (res.type === "success") {
                    setCommentContent("");
                    getAllCommentsDataMethod();
                } else {
                    setLoading(false);
                }
            });
        });
    }

    return (
        <>
            <Modal show={props.show} scrollable={true} size="lg" onHide={props.modalClose} backdrop="static" keyboard={false} >
                <Modal.Header closeButton>
                    <Modal.Title>{props.title} - Comments</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                        >
                            <Row>
                                <Form.Label htmlFor="commentContent">Comment</Form.Label>
                                <Col md={10}>
                                    <Form.Control type="text" id="commentContent" value={commentContent} aria-describedby="CommentContent" onChange={onChangeCommentContent} required />
                                </Col>
                                <Col md={2}>
                                    <div className="btn-center">
                                        {loading && (
                                            <Spinner animation="border" role="status" variant="primary">
                                                <span className="visually-hidden">Loading...</span>
                                            </Spinner>
                                        )}
                                        <Button disabled={commentContent.trim().length > 0 ? false : true} onClick={createNewCommentData}>
                                            {/* <i className="bi bi-send"></i> */}
                                            Send
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Form.Group>
                    </Form>
                    <hr />
                    {getAllComments && getAllComments.length > 0 ? getAllComments.map((comment) => (
                        <div key={comment.id}>
                            {/* <div style={{display: "flex", justifyContent: "space-between"}}> */}
                            {/* <div> */}
                            <p style={{ fontSize: 14 }}>{comment.commentDescription}</p>
                            {/* </div>
                                <div> */}
                            <p style={{ fontSize: 12 }}> {"Commented by: " + comment.userName + ", " + new Date(comment.createdDate).toLocaleString()} </p>
                            {/* <p style={{ fontSize: 12 }}>{new Date(comment.createdDate).toLocaleString()}</p> */}
                            {/* </div> */}
                            {/* </div> */}
                            <hr />
                        </div>
                    )) : "No Comments are available.."}
                    <Button onClick={props.modalClose} className="float-end">
                        Close
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    )

}

export default Comments;