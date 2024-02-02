import React from "react";
import "./Posts.css";
import Post from "./Post.js";

const Posts = (props) => {
    return (
        <div className="posts-container mt-3 mb-3">
            {props.getAllPostsData && props.getAllPostsData.length > 0 ? props.getAllPostsData.map((post) => (
                <div key={post.id}>
                    <Post post={post} />
                    <br />
                </div>
            )) : <p style={{textAlign: "center"}}>No Posts available..</p>}
        </div>
    );
};

export default Posts;