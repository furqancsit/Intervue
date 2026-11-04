
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4">

            <div className="text-center max-w-xl">

                <h1 className="text-9xl font-extrabold text-red-500 drop-shadow-lg">
                    404
                </h1>

                <h2 className="text-3xl font-bold text-white mt-4">
                    Oops! Page Not Found
                </h2>

                <p className="text-gray-400 mt-4 text-lg">
                    The page you're looking for doesn't exist
                    or has been moved.
                </p>

                <button
                    onClick={() => navigate("/")}
                    className="mt-8 inline-flex items-center gap-2
                    bg-amber-600 hover:bg-amber-700
                    text-white font-semibold px-6 py-3 cursor-pointer
                    rounded-xl shadow-lg transition-all
                    duration-300 hover:scale-105"
                >
                    <Home size={20} />
                    Back to Home
                </button>

            </div>
        </div>
    );
}
