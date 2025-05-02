import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Manage Users */}
        <Link to="/users">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transform transition-all duration-300">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-indigo-100 p-3 rounded-full">
                <svg
                  className="h-10 w-10 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.121 17.804A6 6 0 0112 15c1.657 0 3.156.672 4.243 1.757M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-700 text-center">
              Manage Users
            </h2>
          </div>
        </Link>

        {/* Manage Products */}
        <Link to="/products">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transform transition-all duration-300">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <svg
                  className="h-10 w-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6m16 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0H4"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-700 text-center">
              Manage Products
            </h2>
          </div>
        </Link>

        {/* Manage Stock Movements */}
        <Link to="/stock">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transform transition-all duration-300">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-yellow-100 p-3 rounded-full">
                <svg
                  className="h-10 w-10 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h11M9 21V3m10 18v-6m0 0l3 3m-3-3l-3 3"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-700 text-center">
              Manage Stock Movement
            </h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
