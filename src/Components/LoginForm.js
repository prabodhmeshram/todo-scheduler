import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/auth";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const logMeIn = () => {
    if (username.trim() === "" || password.trim() === "") {
      setError(true);
      return;
    }
    dispatch(login({ user: { username } }));
  };

  const onUsername = (text) => {
    setUsername(text);
  };

  const onPassword = (text) => {
    setPassword(text);
  };

  return (
    <div className="container mx-auto w-96">
      <Card>
        <CardHeader
          variant="gradient"
          color="light-blue"
          className="mb-4 grid h-20 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign In
          </Typography>
        </CardHeader>
        <CardBody>
          <div className="my-2">
            <Input
              color="blue"
              label="Username"
              onChange={(ev) => onUsername(ev.target.value)}
            />
          </div>
          <div className="my-2">
            <Input
              color="blue"
              label="Password"
              type="password"
              onChange={(ev) => onPassword(ev.target.value)}
            />
          </div>
          {error && (
            <Alert variant="outlined" color="red">
              Enter valid credentials
            </Alert>
          )}
        </CardBody>
        <Button color="light-blue" onClick={() => logMeIn()}>
          Login
        </Button>
      </Card>
    </div>
  );
}
