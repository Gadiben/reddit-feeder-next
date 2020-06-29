import React, { useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";

import TextField from "@material-ui/core/TextField";
import { withApollo } from "../libs/apollo";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import { POPULAR, NEW, BOOKMARKS } from "../gql/queries";

import { RedditFeeder } from "../components/RedditFeeder/redditFeeder";
// import { UserNameInput } from "../components/UserNameInput/userNameInput";
import { UserNameInput } from "../components/UserNameInput/userNameInput";
function Search() {
  const [searchTerm, setsearchTerm] = useState("gautier");
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
      // console.log("Completed");
      // console.log(data.bookmarks);
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
    <div className="search-page">
      <h1>Search</h1>
      <div className="name-input">
        <UserNameInput
          login={login}
          logout={logout}
          signup={signup}
          isLoggedIn={isLoggedIn}
        />
      </div>
      <form
        className="search-reddit"
        noValidate
        autoComplete="off"
        onSubmit={(event) => {
          console.log(event);
          return false;
        }}
      >
        <TextField
          fullWidth
          label="Search for subreddits"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">r/</InputAdornment>
            ),
          }}
          style={{ margin: 20 }}
          onChange={(e) => {
            console.log(e.target.value);
            setsearchTerm(e.target.value);
          }}
        />
        <Button
          variant="contained"
          onClick={() => {
            console.log("clicked");
          }}
        >
          Search
        </Button>
      </form>
      <div className="browse-container">
        <Button
          variant="contained"
          onClick={() => {
            changeDataSource("popular");
          }}
        >
          Browse Popular subreddits
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            changeDataSource("new");
          }}
        >
          Browse New subreddits
        </Button>
      </div>
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
          .search-page {
            max-width: 1100px;
            margin: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .search-page > h1 {
            align-self: flex-start;
          }
          .search-reddit {
            width: 60%;
            margin: auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
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
export default withApollo()(Search);
