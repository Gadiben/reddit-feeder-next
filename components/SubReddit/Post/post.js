import React, { useState } from "react";
import { Comment } from "./Comment/comment";
import PostStyle from "./post.css";
export const Post = (props) => {
  return (
    <>
      <div className="post-author">{props.author}</div>
      <div className="post-title">{props.title}</div>
      <div className="post-body">{props.content}</div>
      {props.comments
        ? props.comments.map((comment) => {
            return (
              <Comment
                author={comment.author}
                content={comment.content}
              ></Comment>
            );
          })
        : ""}
      <style jsx>{PostStyle}</style>
    </>
  );
};
