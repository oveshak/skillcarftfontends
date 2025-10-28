import { FC } from "react";
import { FaClock } from "react-icons/fa"; // Optional, to display an icon

const ComingSoon: FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg max-w-xl mx-auto">
        <FaClock className="text-4xl text-primary mb-4" /> {/* Icon */}
        <h1 className="text-4xl font-semibold text-gray-800">Coming Soon</h1>
        <p className="mt-4 text-xl text-gray-600">
          We're working hard to bring something amazing. Stay tuned!
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition"
          >
            Go Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
