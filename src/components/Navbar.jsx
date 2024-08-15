import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <img
                className="h-8 w-8 rounded-full"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8zW0EU8EE_kTsu7xloGP8RLynPduoCQbWof92KIYWjg&s" // Replace with your logo path
                alt="Logo"
              />
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a
                href="#"
                className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
                Dashboard
              </a>
            </div>
          </div>
          <div className="flex items-center">
            <button className="p-1 rounded-full text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
              <span className="sr-only">View notifications</span>
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C8.67 6.165 8 7.388 8 9v5.159c0 .538-.214 1.055-.595 1.436L6 17h5m0 0v1a3 3 0 11-6 0v-1m6 0a3 3 0 006 0v-1"></path>
              </svg>
            </button>
            <div className="ml-3 relative">
              <div>
                <button
                  className="bg-white flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true">
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="User"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
