import React, { useState } from "react";
import { SubReddit } from "./SubReddit/subReddit";
import { useQuery } from "@apollo/react-hooks";
import CircularProgress from "@material-ui/core/CircularProgress";

export const RedditFeeder = (props) => {
  const { loading, error, data } = useQuery(
    props.query,
    props.variables ? { variables: props.variables } : null
  );

  return (
    <>
      {data ? (
        data[props.dataAccessor].map((subreddit) => {
          return (
            <>
              <SubReddit
                title={subreddit.title}
                posts={subreddit.posts}
                userName={props.userName}
                bookmarked={
                  props.bookmarks
                    ? props.bookmarks.includes(subreddit.title)
                    : false
                }
                setUserBookmarks={props.setUserBookmarks}
                isLoggedIn={props.isLoggedIn}
              ></SubReddit>
            </>
          );
        })
      ) : (
        <div className="loading">
          <CircularProgress />
        </div>
      )}
    </>
  );
};
