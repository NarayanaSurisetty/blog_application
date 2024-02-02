import React from "react";
import "./Posts.css";
import Post from "./Post.js";

const Posts = (props) => {
    return (
        <div className="posts-container mt-3 mb-3">
            {props.getAllPostsData ? props.getAllPostsData.map((post) => (
                <div key={post.id}>
                    <Post post={post} />
                    <br />
                </div>
            )) : "No Posts available.."}
        </div>
    );
};

export default Posts;