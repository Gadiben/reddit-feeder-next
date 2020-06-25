import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import TextField from "@material-ui/core/TextField";
import { withApollo } from "../libs/apollo";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import { POPULAR } from "../gql/querries";
import { SubReddit } from "../components/SubReddit/subReddit";
function Search() {
  const [searchTerm, setsearchTerm] = useState("");
  const { loading, error, data } = useQuery(POPULAR);
  return (
    <div className="search-page">
      <h1>Search</h1>
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
      {data ? (
        data.searchPopularReddit.map((subreddit) => {
          // console.log(subreddit);
          return (
            <SubReddit
              title={subreddit.title}
              posts={subreddit.posts}
            ></SubReddit>
          );
        })
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
