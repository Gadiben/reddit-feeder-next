import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";

export default function Search() {
  const [searchTerm, setsearchTerm] = useState("");
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
        .search-bar{
          margin: 20px;
        }
        `}
        </style>
    </>
  );
}
