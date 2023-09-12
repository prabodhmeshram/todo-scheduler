import { Button, Card, CardBody, Input } from "@material-tailwind/react";
import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/auth";

export default function LoginForm() {
  const dispatch = useDispatch();

  const logMeIn = () => {
    dispatch(login({ isLoggedIn: true }));
  };

  return (
    <div className="container mx-auto w-96">
      <Card>
        <CardBody>
          <div className="my-2">
            <Input label="Username" />
          </div>
          <div className="my-2">
            <Input label="Password" type="password" />
          </div>
        </CardBody>
        <Button color="light-blue" onClick={() => logMeIn()}>
          Login
        </Button>
      </Card>
    </div>
  );
}
