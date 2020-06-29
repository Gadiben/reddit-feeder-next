import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Post } from "./Post/post";
import SubredditStyle from "./subReddit.css";
import StarIcon from "@material-ui/icons/Star";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";

import { ADD_BOOKMARK, REMOVE_BOOKMARK } from "../../../gql/mutations";
import { BOOKMARKS } from "../../../gql/queries";

export const SubReddit = (props) => {
  const [addBookmark] = useMutation(ADD_BOOKMARK, {
    update(cache, { data: { addBookmark } }) {
      console.log("Adding bookmark");
      console.log(addBookmark);
      props.setUserBookmarks(addBookmark);
      cache.writeQuery({
        query: BOOKMARKS,
        data: { bookmarks: addBookmark },
      });
    },
  });
  const [removeBookmark] = useMutation(REMOVE_BOOKMARK, {
    update(cache, { data: { removeBookmark } }) {
      props.setUserBookmarks(removeBookmark);
      console.log("Removing bookmark");
      cache.writeQuery({
        query: BOOKMARKS,
        data: { bookmarks: removeBookmark },
      });
    },
  });

  const toggleBookmark = (subreddit, bookmarkToAdd) => {
    if (!props.userName) return;
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
            toggleBookmark(props.title, !props.bookmarked);
          }}
        >
          {props.bookmarked && props.isLoggedIn ? (
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
