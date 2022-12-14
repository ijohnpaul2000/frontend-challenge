import React from "react";
import { Link } from "react-router-dom";
const ErrorPage = () => {
  return (
    <div className="w-screen h-screen">
      <div className="max-w-[1400px] h-full mx-auto grid place-content-center">
        <p className="text-white font-bold text-5xl mb-4">
          Oops! Something went wrong.
        </p>
        <Link to="/" className="text-blue-400 underline">
          Go back to homepage.
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
