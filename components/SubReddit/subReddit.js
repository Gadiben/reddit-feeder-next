import React, { useState } from "react";
import { Post } from "./Post/post";
import SubredditStyle from "./subReddit.css";
export const SubReddit = (props) => {
  return (
    <div className="subreddit-container">
      <div className="subreddit-title">{props.title}</div>
      {props.posts.map((post) => {
        return <Post post={post}></Post>;
      })}
      <style jsx>{SubredditStyle}</style>
    </div>
  );
};
