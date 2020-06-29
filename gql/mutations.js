import { gql } from "apollo-boost";
export const ADD_BOOKMARK = gql`
  mutation addBookmark($subreddit: SubredditInput!, $userName: String!) {
    addBookmark(subreddit: $subreddit, userName: $userName) {
      name
      bookmarks
    }
  }
`;
export const REMOVE_BOOKMARK = gql`
  mutation removeBookmark($subreddit: SubredditInput!, $userName: String!) {
    removeBookmark(subreddit: $subreddit, userName: $userName) {
      name
      bookmarks
    }
  }
`;
