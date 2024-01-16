import React from "react";
import "./Post.css";

const Post = ({ post: { title, body, author, id } }) => {
    return (
        <div className="post-container">
            <h3 className="heading">{title}</h3>
            <p>{body}</p>
            <div className="info">
                <h6>Written by: {author}</h6>
            </div>
        </div>
    );
};

export default Post;