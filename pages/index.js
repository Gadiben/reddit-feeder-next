import React, { useState } from "react";
import { useLazyQuery } from "@apollo/react-hooks";

import { withApollo } from "../libs/apollo";

import { POPULAR, SEARCH, BOOKMARKS } from "../gql/queries";
import CancelIcon from "@material-ui/icons/Cancel";
import { RedditFeeder } from "../components/RedditFeeder/redditFeeder";
import { SearchSubreddit } from "../components/SearchSubreddits/searchSubreddits";
import { UserNameInput } from "../components/UserNameInput/userNameInput";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState();
  const [searchTerm, setSearchTerm] = useState();
  const [userBookmarks, setUserBookmarks] = useState();

  const [getBookmarks, _] = useLazyQuery(BOOKMARKS, {
    variables: {
      userName: userName,
    },
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      if (data.bookmarks.name && data.bookmarks.name !== userName) return;
      if (data && data.bookmarks.name) {
        setUserBookmarks(data.bookmarks);
        setIsLoggedIn(true);
      } else {
        alert("Wrong username");
        setUserBookmarks();
        setUserName();
      }
    },
  });

  const login = (userName) => {
    setUserName(userName);
    getBookmarks();
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserBookmarks();
    setUserName();
  };

  const signup = (userName) => {
    console.log("signup");
    login(userName);
  };

  return (
    <div className="index">
      <div className="name-input">
        <UserNameInput
          login={login}
          logout={logout}
          signup={signup}
          isLoggedIn={isLoggedIn}
        />
      </div>
      <div className="title search">Search reddits</div>
      <div className="clear-search" onClick={() => setSearchTerm()}>
        Clear search <CancelIcon></CancelIcon>
      </div>
      <SearchSubreddit onSearch={setSearchTerm} />
      {searchTerm ? (
        <RedditFeeder
          query={SEARCH}
          dataAccessor={"searchReddit"}
          variables={{ term: searchTerm }}
          bookmarks={userBookmarks?.bookmarks}
          userName={userName}
          isLoggedIn={isLoggedIn}
          setUserBookmarks={setUserBookmarks}
        ></RedditFeeder>
      ) : (
        ""
      )}

      <div className="title browse">Browse popular reddits</div>
      {true ? (
        <>
          <RedditFeeder
            query={POPULAR}
            dataAccessor={"searchPopularReddit"}
            bookmarks={userBookmarks?.bookmarks}
            userName={userName}
            isLoggedIn={isLoggedIn}
            setUserBookmarks={setUserBookmarks}
          ></RedditFeeder>
        </>
      ) : (
        <div className="loading">
          <CircularProgress />
        </div>
      )}
      <style jsx>
        {`
          .title {
            font-size: 2em;
            align-self: flex-start;
          }

          .index {
            max-width: 1100px;
            margin: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .name-input {
            position: fixed;
            z-index: 1;
            border-bottom-left-radius: 10px;
            padding: 10px;
            right: 0;
            top: 0;
            background-color: #f5f5f5;
          }
          * {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
              "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
              "Helvetica Neue", sans-serif;
          }
          .clear-search {
            display: flex;
            color: #aaa;
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
}
export default withApollo()(App);
