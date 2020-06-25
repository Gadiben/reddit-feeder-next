import css from "styled-jsx/css";
export default css`
  .subreddit-container {
    margin: 30px auto;
    width: 100%;
    padding: 15px;
    border: 1px solid rgba(150, 150, 150, 0.3);
    box-shadow: lightgrey 0 0 15px 0;
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
  }
  .subbredit-header {
    display: flex;
    justify-content: space-between;
  }
  .star-container:hover {
    cursor: pointer;
  }
  .subreddit-title {
    font-size: 2em;
    color: #474747;
  }
`;
