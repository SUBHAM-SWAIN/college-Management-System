import React, { createContext, useContext, useState } from "react";
import { mockStudents, mockFaculty, mockAdmins } from "../data/mockData";

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password, role) => {
    // Simple mock authentication - in real app, this would be an API call
    let foundUser;

    switch (role) {
      case "student":
        foundUser = mockStudents.find((u) => u.email === email);
        break;
      case "faculty":
        foundUser = mockFaculty.find((u) => u.email === email);
        break;
      case "admin":
        foundUser = mockAdmins.find((u) => u.email === email);
        break;
      default:
        foundUser = undefined;
    }

    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
