import { Button, Navbar, Typography } from "@material-tailwind/react";
import React from "react";
import { logout, selectLogin } from "../store/auth";
import { useDispatch, useSelector } from "react-redux";

export default function Header() {
  let isLoggedIn = useSelector(selectLogin);

  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <Navbar className="mx-auto py-2">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          variant="h2"
          className="mr-4 self-align cursor-pointer py-1.5 "
        >
          Todo Scheduler
        </Typography>
        {isLoggedIn && (
          <Button
            variant="gradient"
            size="sm"
            className="hidden lg:inline-block"
            onClick={() => onLogout()}
          >
            <span>Logout</span>
          </Button>
        )}
      </div>
    </Navbar>
  );
}
