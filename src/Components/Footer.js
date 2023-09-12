import { Typography } from "@material-tailwind/react";
import React from "react";

export default function Footer() {
  return (
    <div>
      <footer className="flex w-full flex-row items-center justify-center border-t bg-blue-gray-50 border-blue-gray-100 py-10 text-center">
        <Typography color="blue-gray" className="font-normal">
          &copy; 2023 Simple Todo Scheduler
        </Typography>
      </footer>
    </div>
  );
}
