import React from "react";
import { User, LogOut, Menu } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Navbar = ({ onMenuToggle, isMobile = false }) => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {isMobile && (
            <button
              onClick={onMenuToggle}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}
          <h1 className="text-xl font-bold text-gray-900">
            College Management System
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-8 w-8 rounded-full"
              />
            ) : (
              <User className="h-8 w-8 p-1 bg-gray-200 rounded-full text-gray-600" />
            )}
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
            title="Logout"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
