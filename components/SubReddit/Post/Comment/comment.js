import React, { useState } from "react";
import CommentStyle from "./comment.css";
export const Comment = (props) => {
  return (
    <div className="comment-container">
      <div className="comment-author">{props.comment.author}</div>
      <div className="comment-body">{props.comment.content}</div>
      <style jsx>{CommentStyle}</style>
    </div>
  );
};
