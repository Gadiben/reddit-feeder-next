import React, { useState } from "react";
import CommentStyle from "./comment.css";
export const Comment = (props) => {
  return (
    <>
      <div className="comment-author">{props.author}</div>
      <div className="comment-body">{props.content}</div>
      <style jsx>{CommentStyle}</style>
    </>
  );
};
