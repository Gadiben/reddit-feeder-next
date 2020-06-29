import React, { useState } from "react";
import userNameInputStyle from "./userNameInput.css";
import { useMutation } from "@apollo/react-hooks";
import { SIGNUP } from "../../gql/mutations";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
export const UserNameInput = (props) => {
  const [userName, setUserName] = useState();
  const [signupMutation, { data }] = useMutation(SIGNUP);

  const signup = () => {
    signupMutation({ variables: { userName: userName } });
    props.signup(userName);
  };
  return (
    <>
      <TextField
        className="name-text"
        fullWidth
        label="Your username"
        value={userName}
        disabled={props.isLoggedIn}
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      />
      <div className="name-actions">
        {!props.isLoggedIn ? (
          <>
            <Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={() => props.login(userName)}
            >
              Login
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="secondary"
              onClick={() => signup()}
            >
              Signup
            </Button>
          </>
        ) : (
          <Button
            size="small"
            variant="outlined"
            color="primary"
            onClick={() => props.logout()}
          >
            Log Out
          </Button>
        )}
      </div>
      <style jsx>{userNameInputStyle}</style>
    </>
  );
};
