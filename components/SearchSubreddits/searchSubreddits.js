import React, { useState } from "react";
import searchSubredditStyle from "./searchSubreddits.css";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
export const SearchSubreddit = (props) => {
  const [searchTerm, setsearchTerm] = useState("gautier");
  return (
    <>
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
            props.onSearch(searchTerm);
            console.log("clicked");
          }}
        >
          Search
        </Button>
      </form>
      <style jsx>{searchSubredditStyle}</style>
    </>
  );
};
