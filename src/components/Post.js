import React, { useState, useRef } from "react";
import "./Post.css";
import LoadingBar from 'react-top-loading-bar';
import Comments from "./Comments";
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MenuList from "./Menu";
import NewPost from "./NewPost";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { updateBlogPosts } from '../redux/actions/updateBlogPosts';
import { useUserAuth } from "../context/userAuthContext";
import { DeleteBlogPost } from "../redux/actions/deleteBlogPost";
import { Button, Modal, Spinner } from "react-bootstrap";

const Post = ({ post: { title, description, name, id, userUID }, getAllPostsDataMethod }) => {
    const [show, setShow] = useState(false);
    const [deletePopUp, setDeletePopUp] = useState(false);
    const ref = useRef(null);
    const handleClose = () => setShow(false);
    const [expanded, setExpanded] = useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [newPostModalShow, setNewPostModal] = useState(false);
    const [validated, setValidated] = useState(false);
    const [postTitle, setPostTitle] = useState(title);
    const [postContent, setPostContent] = useState(description);
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const dispatch = useDispatch();
    const { user } = useUserAuth();

    const deletePost = () => {
        setLoading1(true);
        dispatch(DeleteBlogPost(id)).then((res) => {
            setLoading1(false);
            if (res.type === "success" && res.data && res.data.length > 0) {
                getAllPostsDataMethod();
            } else {
                console.log(res);
            }
        });
    }

    const onChangePostTitle = (e) => {
        setPostTitle(e.target.value);
    }

    const onChangePostContent = (e) => {
        setPostContent(e.target.value);
    }

    const newPostFormOpen = () => setNewPostModal(true);
    const newPostFormClose = () => {
        setNewPostModal(false);
        setValidated(false);
    }

    const updatePostData = async (event) => {
        event.preventDefault();
        setLoading(true);
        setValidated(true);
        if (postTitle.trim() !== "" && postContent.trim() !== "") {
            await auth.currentUser.reload().then(() => {
                let data = {
                    id: id,
                    name: name,
                    title: postTitle,
                    description: postContent
                }
                dispatch(updateBlogPosts(data)).then((res) => {
                    setLoading(false);
                    if (res.type === "success") {
                        getAllPostsDataMethod();
                        setValidated(false);
                        setNewPostModal(false);
                    } else {
                        setLoading(false);
                    }
                });
            })
        } else {
            setLoading(false);
        }
    }

    const handleClick = (event) => {
        event.preventDefault();
        setExpanded("");
        setAnchorEl(event.currentTarget);
    };

    const closeMenu = async (item) => {
        setAnchorEl(null);
        if (item === "Edit") {
            newPostFormOpen();
        } else if (item === "Delete") {
            setDeletePopUp(true);
        }

    };


    const Accordion = styled((props) => (
        <MuiAccordion disableGutters elevation={0} square {...props} />
    ))(({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&::before': {
            display: 'none',
        },
    }));

    const AccordionSummary = styled((props) => (
        <MuiAccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ fontSize: '0.9rem' }} />}
            {...props}
        />
    ))(({ theme }) => ({
        backgroundColor:
            theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, .05)'
                : 'rgba(0, 0, 0, .03)',
        flexDirection: 'row-reverse',
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(90deg)',
        },
        '& .MuiAccordionSummary-content': {
            marginLeft: theme.spacing(1),
        },
    }));

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <>
            <LoadingBar color="#08518b" height={2.5} ref={ref} />
            <div className="post-container">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    {(userUID == user.uid) ?
                        <div></div>
                        : null}
                    <h3 className="heading">{title}</h3>
                    {(userUID == user.uid) ?
                        <MenuList anchorEl={anchorEl} setAnchorEl={setAnchorEl}
                            handleClick={handleClick} id={id} page="post"
                            closeMenu={closeMenu} />
                        : null}
                </div>
                <p>{description}</p>
                <div className="info mt-2">
                    <h6>Written by: {name}</h6>
                </div>
                <Accordion expanded={expanded} onChange={handleChange('panel1')}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ExpandMoreIcon />}>
                        <>Comments</>
                    </AccordionSummary>
                    <AccordionDetails>
                        {expanded.length > 0 && <Comments show={show} modalClose={handleClose} id={id} title={title} />}
                    </AccordionDetails>
                </Accordion>
                {newPostModalShow && <NewPost show={newPostModalShow} onHide={newPostFormClose}
                    validated={validated} onChangePostTitle={onChangePostTitle}
                    onChangePostContent={onChangePostContent}
                    loading={loading} createNewPostData={updatePostData} page="Update"
                    postTitle={postTitle} postContent={postContent} />
                }
            </div>
            <Modal show={deletePopUp} onHide={() => setDeletePopUp(false)} backdrop="static" keyboard={false} >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Confirmation!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure want to delete this post ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setDeletePopUp(false)}>
                        No
                    </Button>
                    <Button variant="primary" onClick={deletePost}>
                        {loading1 && (
                            <Spinner animation="border" role="status" variant="light" size="sm">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        )}Yes, delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Post;