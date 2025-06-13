import Lottie from "lottie-react";
import { Link } from "react-router";
import notFoundAnim from "../assets/404.json"; // Or replace with your own JSON animation

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center p-4">
            <div className="w-full max-w-md">
                <Lottie animationData={notFoundAnim} loop={true} />
            </div>
            <h1 className="text-4xl font-bold text-primary mt-4">
                Lost in Knowledge?
            </h1>
            <p className="text-base-content mt-2">
                Oops! The page you're looking for doesn't exist.
            </p>
            <Link to="/" className="mt-6">
                <button className="btn btn-primary btn-wide rounded-full">
                    Back to Home
                </button>
            </Link>
        </div>
    );
};

export default NotFound;
