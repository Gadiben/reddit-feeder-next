import React, { useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";

import { withApollo } from "../libs/apollo";
import CircularProgress from "@material-ui/core/CircularProgress";

import { POPULAR, NEW, BOOKMARKS } from "../gql/queries";

import { RedditFeeder } from "../components/RedditFeeder/redditFeeder";
import { SearchSubreddit } from "../components/SearchSubreddits/searchSubreddits";
import { UserNameInput } from "../components/UserNameInput/userNameInput";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState();
  const [dataSrc, setDataSrc] = useState(POPULAR);

  const { loading, error, data } = useQuery(POPULAR);

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

  const changeDataSource = (newValue) => {
    switch (newValue) {
      case "new":
        setDataSrc(NEW);
        break;
      case "popular":
        setDataSrc(POPULAR);
        break;
    }
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
      <SearchSubreddit />
      <div className="title browse">Browse popular reddits</div>
      {data ? (
        <>
          <RedditFeeder
            query={dataSrc}
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
            font-size: 3em;
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
          .loading {
            margin-top: 50px;
          }
        `}
      </style>
    </div>
  );
}
export default withApollo()(App);
