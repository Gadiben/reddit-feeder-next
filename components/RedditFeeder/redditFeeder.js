import React, { useState } from "react";
import { SubReddit } from "./SubReddit/subReddit";
import { useQuery } from "@apollo/react-hooks";
import { POPULAR, NEW, BOOKMARKS } from "../../gql/queries";

export const RedditFeeder = (props) => {
  const { loading, error, data } = useQuery(props.query);
  // console.log(props.bookmarks);
  return (
    <>
      {data.searchPopularReddit.map((subreddit) => {
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
            ></SubReddit>
          </>
        );
      })}
    </>
  );
};
