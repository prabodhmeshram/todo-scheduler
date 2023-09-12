import { Button } from "@material-tailwind/react";
import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/auth";

export default function LoginForm() {
  const dispatch = useDispatch();

  const logMeIn = () => {
    dispatch(login({ isLoggedIn: true }));
  };

  return (
    <div>
      <div>Enter UserName</div>
      <div>Enter Password</div>
      <Button onClick={() => logMeIn()}>Login</Button>
    </div>
  );
}
