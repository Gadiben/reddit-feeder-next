import React, { useState } from "react";
import { Comment } from "./Comment/comment";
import PostStyle from "./post.css";
export const Post = (props) => {
  return (
    <div className="post-container">
      <div className="post-author">{props.post.author}</div>
      <div className="post-title">{props.post.title}</div>
      <div className="post-body">{props.post.content}</div>

      {props.post.thumbnail && props.post.thumbnail !== "self" ? (
        <img src={props.post.thumbnail} alt="Post thumbnail"></img>
      ) : (
        ""
      )}
      <div className="comments-container">
        {props.post.comments
          ? props.post.comments.map((comment) => {
              return <Comment comment={comment}></Comment>;
            })
          : ""}
      </div>
      <style jsx>{PostStyle}</style>
    </div>
  );
};
