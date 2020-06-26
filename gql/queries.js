import { gql } from "apollo-boost";
export const USERS = gql`
  {
    users {
      name
      bookmarks
    }
  }
`;

export const SEARCH = gql`
  {
    users {
      name
      bookmarks
    }
  }
`;

export const NEW = gql`
  {
    searchNewReddit {
      title
      posts {
        title
        content
        author
        thumbnail
        comments {
          author
          content
        }
      }
    }
  }
`;

export const POPULAR = gql`
  {
    searchPopularReddit {
      title
      posts {
        title
        content
        author
        thumbnail
        comments {
          author
          content
        }
      }
    }
  }
`;

export const BOOKMARKS = gql`
  query bookmarks($userName: String!) {
    bookmarks(userName: $userName) {
      name
      bookmarks
    }
  }
`;
