import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Post } from "./Post/post";
import SubredditStyle from "./subReddit.css";
import StarIcon from "@material-ui/icons/Star";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";

import { ADD_BOOKMARK, REMOVE_BOOKMARK } from "../../../gql/mutations";

export const SubReddit = (props) => {
  const [bookmarked, setBookmarked] = useState(props.bookmarked);

  const [addBookmark, addBData] = useMutation(ADD_BOOKMARK);
  const [removeBookmark, removeBData] = useMutation(REMOVE_BOOKMARK);

  const toggleBookmark = (subreddit, bookmarkToAdd) => {
    if (!props.userName) return;
    setBookmarked(!bookmarked);
    const mutationVariables = {
      subreddit: { title: subreddit },
      userName: props.userName,
    };
    if (bookmarkToAdd) {
      addBookmark({ variables: mutationVariables });
    } else {
      removeBookmark({ variables: mutationVariables });
    }
  };

  return (
    <div className="subreddit-container">
      <div className="subbredit-header">
        <div className="subreddit-title">{props.title}</div>
        <div
          className="star-container"
          onClick={() => {
            toggleBookmark(props.title, !bookmarked);
          }}
        >
          {bookmarked && props.userName ? (
            <StarIcon />
          ) : (
            <StarBorderOutlinedIcon />
          )}
        </div>
      </div>
      {props.posts.map((post) => {
        return <Post post={post}></Post>;
      })}
      <style jsx>{SubredditStyle}</style>
    </div>
  );
};
