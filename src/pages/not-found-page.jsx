import {Link} from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="bg-gray-100 flex items-center justify-center h-screen">
            <div className="max-w-lg w-full text-center bg-white p-6 rounded-lg shadow-lg">
                <img
                    className="mx-auto w-48 mb-8"
                    src="https://cdn-icons-png.flaticon.com/512/565/565622.png"
                    alt="404 Image"
                />
                <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                <p className="text-lg text-gray-600 mb-8">
                    Oops! The page you're looking for doesn't exist.
                </p>
                <Link
                    to="/"
                    className="px-6 py-3 bg-blue-600 text-white rounded-md text-lg hover:bg-blue-700 transition duration-300"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;