
const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
            <p className="text-2xl text-gray-700 mb-2">Not Found</p>
            <p className="text-lg text-gray-500 text-center max-w-md mb-6">
                The page you are looking for does not exist. Please check the URL or return to the homepage.
            </p>
            <a
                href="/"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            >
                Go to Homepage
            </a>
        </div>
    );
};

export default NotFound;
