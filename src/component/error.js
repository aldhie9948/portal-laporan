import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <div className="flex justify-center items-center gap-5 font-bold text-5xl">
        <FaExclamationTriangle className="text-red-400" />
        <h1>Page is not found!</h1>
      </div>
      <Link to="/">
        <button className="py-2 px-4 bg-blue-200 text-blue-700 rounded-full">
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
