import React, { useState } from "react";
import { Post } from "./Post/post";
import SubredditStyle from "./subReddit.css";
import StarIcon from "@material-ui/icons/Star";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
export const SubReddit = (props) => {
  const [bookmarked, setBookmarked] = useState(props.bookmarked);
  return (
    <div className="subreddit-container">
      <div className="subbredit-header">
        <div className="subreddit-title">{props.title}</div>
        <div
          className="star-container"
          onClick={() => {
            setBookmarked(!bookmarked);
          }}
        >
          {bookmarked ? <StarIcon /> : <StarBorderOutlinedIcon />}
        </div>
      </div>
      {props.posts.map((post) => {
        return <Post post={post}></Post>;
      })}
      <style jsx>{SubredditStyle}</style>
    </div>
  );
};
