import React from "react";
import { Link } from "react-router-dom";
const ErrorPage = () => {
  return (
    <div className="w-screen h-screen">
      <div className="max-w-[1400px] h-full mx-auto grid grid-cols-1 md:grid-cols-3 grid-rows-4 gap-10 place-content-center mt-20">
        <p>Oops! Something went wrong</p>
        <Link to="/" className="text-blue-400 underline">
          Go back to homepage.
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
