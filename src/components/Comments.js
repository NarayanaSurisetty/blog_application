import React, { useState, useEffect } from "react";
import "./Post.css";
import { Button, Row, Col, Modal, Form, Spinner } from "react-bootstrap";
import { createNewComment } from "../redux/actions/newCommentAction";
import { getComments } from "../redux/actions/getComments";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditComment from "./EditComment";
import { deleteComments } from "../redux/actions/deleteComments";

const options = ["Edit", "Delete"];
// const ITEM_HEIGHT = 48;

const Comments = (props) => {
    const [commentContent, setCommentContent] = useState("");
    const [getAllComments, setGetAllComments] = useState([]);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [perticularShow, setPerticularShow] = useState(false);
    const [perticularComment, setPerticularComment] = useState(null);
    const [id, setId] = useState("");
    const [updated, setUpdated] = useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        getAllCommentsDataMethod();
        setUpdated(false);
        return () => {
            setGetAllComments([]);
        }
    }, [!updated])

    const handleClick = (event, comment) => {
        setAnchorEl(event.currentTarget);
        setPerticularComment(comment.commentDescription);
        setId(comment.id);
        console.log(9, id);
    };

    const modalClose = () => {
        setPerticularShow(false);
        setPerticularComment("");
        getAllCommentsDataMethod();
    };


    const handleClose = (item) => {
        setAnchorEl(null);
        if (item == "Edit") {
            setPerticularShow(true);
        } else if (item === "Delete") {
            dispatch(deleteComments(id)).then((res) => {
                if (res.type === "success" && res.data && res.data.length > 0) {
                    getAllCommentsDataMethod();
                    setPerticularComment("");
                } else {
                   console.log(res);
                }
            });
        }

    };

    const getAllCommentsDataMethod = () => {
        setCommentContent("");
        dispatch(getComments()).then((res) => {
            if (res.type === "success" && res.data && res.data.length > 0) {
                const res2 = res.data.filter((item) => {
                    return item.postId === props.id
                });
                setGetAllComments(res2.reverse());               
            } else {
                setGetAllComments([]);
            }
        });
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
                {/* <Modal.Header closeButton>
                   
                </Modal.Header> */}
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3 mt-3" >
                            <Row>
                                <Modal.Title>{props.title} - Comments</Modal.Title>
                                {/* <Form.Label htmlFor="commentContent">Comment</Form.Label> */}
                                <Col md={10}>
                                    <Form.Control type="text" id="commentContent" autoComplete="off" value={commentContent} aria-describedby="CommentContent" onChange={(e) => setCommentContent(e.target.value)} required />
                                </Col>
                                <Col md={2}>
                                    <div className="btn-center">
                                        {loading && (
                                            <Spinner animation="border" role="status" variant="primary">
                                                <span className="visually-hidden">Loading...</span>
                                            </Spinner>
                                        )}
                                        <Button size="sm" disabled={commentContent.trim().length > 0 ? false : true} onClick={createNewCommentData}>
                                            {/* <i className="bi bi-send"></i> */}
                                            Send
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Form.Group>
                    </Form>
                    <hr />

                    {getAllComments && getAllComments.length > 0 ?
                        getAllComments.map((comment, index) => (
                            <div key={comment.id}>
                                <div style={{ display: "flex", justifyContent: "space-between" }} key={comment.id}>
                                    <span style={{ fontSize: 14 }}>{comment.commentDescription}</span>
                                    <div key={comment.id}>
                                        <IconButton
                                            aria-label="more"
                                            id="long-button"
                                            aria-controls={open ? 'long-menu' : undefined}
                                            aria-expanded={open ? 'true' : undefined}
                                            aria-haspopup="true"
                                            onClick={(e) => handleClick(e, comment)}
                                        >
                                            <MoreVertIcon />
                                        </IconButton>
                                        <Menu
                                            id="long-menu"
                                            MenuListProps={{
                                                'aria-labelledby': 'long-button',
                                            }}
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={() => setAnchorEl(null)}
                                            key={comment.id}
                                        >
                                            {options.map((option) => (
                                                <MenuItem key={option}
                                                    onClick={() => handleClose(option)}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </div>
                                </div>
                                <p style={{ fontSize: 12 }}>
                                    {"Commented by: " + comment.userName + ", " + new Date(comment.createdDate).toLocaleString()}
                                </p>
                                <hr />
                            </div>
                        )) : "No Comments are available.."}
                    <Button size="sm" onClick={props.modalClose} className="float-end">
                        Close
                    </Button>
                </Modal.Body>
            </Modal>
            {perticularShow && <EditComment perticularShow={perticularShow} modalClose={modalClose}
                perticularComment={perticularComment} id={id} setPerticularComment={setPerticularComment} 
                setUpdated = {setUpdated}/>}

        </>
    )

}

export default Comments;