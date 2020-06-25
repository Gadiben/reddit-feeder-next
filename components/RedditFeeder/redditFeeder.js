import React, { useState } from "react";
import { SubReddit } from "./SubReddit/subReddit";
import { useQuery } from "@apollo/react-hooks";
import { POPULAR, NEW } from "../../gql/queries";

export const RedditFeeder = (props) => {
  const { loading, error, data } = useQuery(props.query);
  return (props.query === POPULAR
    ? data.searchPopularReddit
    : data.searchNewReddit
  ).map((subreddit) => {
    return (
      <SubReddit title={subreddit.title} posts={subreddit.posts}></SubReddit>
    );
  });
};
