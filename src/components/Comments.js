import React, { useState, useEffect, useRef } from "react";
import "./Post.css";
import { Row, Col, Form, Spinner } from "react-bootstrap";
import Button from '@mui/material/Button';
import { createNewComment } from "../redux/actions/newCommentAction";
import { getComments } from "../redux/actions/getComments";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import EditComment from "./EditComment";
import { deleteComments } from "../redux/actions/deleteComments";
import SendIcon from '@mui/icons-material/Send';
import Stack from "@mui/material/Stack";
import { CircularProgress } from "@mui/material";
import MenuList from "./Menu";

const Comments = (props) => {
    const [commentContent, setCommentContent] = useState("");
    const [getAllComments, setGetAllComments] = useState([]);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [editComment, setEditComment] = useState(false);
    const [perticularComment, setPerticularComment] = useState(null);
    const [id, setId] = useState("");
    const [updated, setUpdated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [userId, setUserId] = useState(null);
    const testRef = useRef(null);

    useEffect(() => {
        getAllCommentsDataMethod();
        setUpdated(false);
        auth.currentUser.reload().then(() => {
            setUserId(auth.currentUser.uid);
        });
        return () => {
            setGetAllComments([]);
        }
    }, [!updated])

    const handleClick = (event, comment) => {
        event.preventDefault();
        console.log(event.currentTarget);
        setAnchorEl(event.currentTarget);
        setPerticularComment(comment.commentDescription);
        setId(comment.id);
    };

    const drawerClose = () => {
        setEditComment(false);
        getAllCommentsDataMethod();
    };

    const closeMenu = async (item) => {
        setAnchorEl(null);
        if (item === "Edit") {
            setEditComment(true);
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
            setIsLoading(false);
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
            <div style={{ marginTop: "1em", marginBottom: "1em" }}>
                {getAllComments && getAllComments.length > 0 ?
                    <Stack direction="column" sx={{ height: "200px", overflowY: "scroll" }} ref={testRef}>
                        {getAllComments.map((comment) => (
                            <div key={comment.id} style={{ marginLeft: "1em" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                    <p style={{ fontSize: 12, marginBottom: (userId != comment.userUID) ? "0.7rem" : "-1rem", }}>
                                        <b style={{ fontSize: 15 }}>{comment.userName + " "}</b>  {" " + new Date(comment.createdDate).toLocaleString('en-US', {
                                            dateStyle: 'long',
                                            timeStyle: 'short'
                                        })}
                                    </p>
                                    {(userId == comment.userUID) ?
                                        <MenuList anchorEl={anchorEl} setAnchorEl={setAnchorEl}
                                            handleClick={handleClick} comment={comment}
                                            closeMenu={closeMenu} />
                                        : ""}
                                </div>
                                <span style={{ fontSize: 14 }}>{comment.commentDescription}</span>
                                <hr className="hr-opacity" />
                            </div>
                        ))}
                    </Stack>
                    :
                    <>
                        {isLoading && <CircularProgress color="secondary" title="Loading Data..." />
                        }
                        {!isLoading && getAllComments && (getAllComments.length === 0) && (
                            <p style={{ textAlign: "center" }}>No Comments are available..</p>
                        )}

                    </>
                }
            </div>
            {!isLoading &&
                <div>
                    <Form onSubmit={createNewCommentData}>
                        <Form.Group className="mb-3" >
                            <Row style={{ display: "flex", marginLeft: "0.5em" }}>
                                <Col md={10} style={{ flex: 1 }}>
                                    <Form.Control type="text" id="commentContent" autoComplete="off"
                                        value={commentContent} aria-describedby="CommentContent"
                                        placeholder="Add comment"
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setCommentContent(e.target.value)
                                        }
                                        } required
                                    />
                                </Col>
                                <Col md={2} style={{ flex: 1 }}>
                                    <div className="btn-center">
                                        {loading && (
                                            <Spinner animation="border" role="status" variant="primary">
                                                <span className="visually-hidden">Loading...</span>
                                            </Spinner>
                                        )}
                                        <Button disabled={commentContent.trim().length > 0 ? false : true} onClick={createNewCommentData}
                                            variant="contained" endIcon={<SendIcon />}>
                                            Send
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Form.Group>
                    </Form>

                    {editComment &&
                        <EditComment
                            perticularComment={perticularComment} id={id} setPerticularComment={setPerticularComment}
                            drawerClose={drawerClose}
                        />
                    }
                </div>
            }
        </>
    )

}

export default Comments;