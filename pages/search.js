import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import TextField from "@material-ui/core/TextField";
import { withApollo } from "../libs/apollo";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import { POPULAR } from "../gql/querries";
import { SubReddit } from "../components/SubReddit/subReddit";
function Search() {
  const [searchTerm, setsearchTerm] = useState("");
  const { loading, error, data } = useQuery(POPULAR);
  return (
    <>
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
      {data
        ? data.searchPopularReddit.map((subreddit) => {
            console.log(subreddit);
            return (
              <SubReddit
                title={subreddit.title}
                posts={subreddit.posts}
              ></SubReddit>
            );
          })
        : ""}
      <style jsx>
        {`
          .search-reddit {
            width: 80%;
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
        `}
      </style>
    </>
  );
}
export default withApollo()(Search);
