import { gql } from "apollo-boost";
export const USERS = gql`
  {
    users {
      name
      bookmarks
    }
  }
`;
