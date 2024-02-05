import React, { useState, useRef } from "react";
import "./Post.css";
import LoadingBar from 'react-top-loading-bar';
import Comments from "./Comments";

const Post = ({ post: { title, description, name, id } }) => {
    const [show, setShow] = useState(false);
    const ref = useRef(null);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <>
            <LoadingBar color="#08518b" height={2.5} ref={ref} />
            <div className="post-container">
                <h3 className="heading">{title}</h3>
                <p>{description}</p>
                <div className="info mt-2">
                    <h6>Written by: {name}</h6>
                </div>
                <div variant="light" className="comments-cursor" onClick={handleShow}>
                    <i className="bi bi-chat-dots"></i> Comments
                </div>
                {show && <Comments show={show} modalClose={handleClose} id={id} title={title} />}
            </div>
        </>
    );
};

export default Post;