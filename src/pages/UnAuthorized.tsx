import { Helmet } from "react-helmet";
import { Link } from "react-router";

const UnAuthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <Helmet>
        <title>UnAuthorized - NEOPAY</title>
        <meta name="description" content="This is UnAuthorized Page" />
      </Helmet>
      <h1 className="text-6xl font-bold text-red-600">403</h1>
      <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200">
        Unauthorized Access
      </h2>
      <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-md">
        Sorry, you don’t have permission to access this page. Please contact the
        administrator if you think this is a mistake.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 text-white bg-primary rounded-lg shadow hover:bg-primary/90 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default UnAuthorized;
