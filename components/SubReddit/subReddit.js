import React, { useState } from "react";
import { Post } from "./Post/post";
import SubredditStyle from "./subReddit.css";
export const SubReddit = (props) => {
  return (
    <div className="subreddit-container">
      <div className="subreddit-title">{props.title}</div>
      {props.posts.map((post) => {
        return (
          <Post
            author={post.author}
            content={post.content}
            title={post.title}
            comments={post.comments}
          ></Post>
        );
      })}
      <style jsx>{SubredditStyle}</style>
    </div>
  );
};
