import React from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Users, BookOpen, Calendar } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* --------------------------------------Header---------------------------------------- */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">EduManage</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a
                href="#features"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Features
              </a>
              <a
                href="#modules"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Modules
              </a>
              <a
                href="#about"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                About
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/*------------------------------------- Hero Section -------------------------------------*/}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
            College Management
            <span className="block text-indigo-600">Made Simple</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            A comprehensive platform for students, faculty, and administrators
            to manage academic activities, track progress, and stay connected.
          </p>

          {/* ---------------------------Login Options------------------------- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Student Portal
              </h3>
              <p className="text-gray-600 mb-6">
                Access assignments, track attendance, register for events, and
                manage your academic journey.
              </p>
              <button
                onClick={() => navigate("/student/login")}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold"
              >
                Student Login
              </button>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Faculty Portal
              </h3>
              <p className="text-gray-600 mb-6">
                Manage classes, track attendance, upload materials, and evaluate
                student performance.
              </p>
              <button
                onClick={() => navigate("/faculty/login")}
                className="w-full px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-semibold"
              >
                Faculty Login
              </button>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Admin Portal
              </h3>
              <p className="text-gray-600 mb-6">
                Oversee operations, manage users, generate reports, and maintain
                system integrity.
              </p>
              <button
                onClick={() => navigate("/admin/login")}
                className="w-full px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-semibold"
              >
                Admin Login
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------Features Section---------------------------------------- */}
      <section id="features" className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Key Features
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need for effective college management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Attendance Tracking",
                description:
                  "Real-time attendance management with detailed analytics",
                icon: "📊",
              },
              {
                title: "Grade Management",
                description:
                  "Comprehensive grading system with performance insights",
                icon: "🎯",
              },
              {
                title: "Event Registration",
                description:
                  "Easy registration for workshops, seminars, and activities",
                icon: "🎪",
              },
              {
                title: "Resource Sharing",
                description:
                  "Upload and download study materials and assignments",
                icon: "📚",
              },
              {
                title: "Leave Management",
                description: "Streamlined leave request and approval process",
                icon: "📝",
              },
              {
                title: "Library System",
                description: "Digital library management with book tracking",
                icon: "📖",
              },
              {
                title: "Reports & Analytics",
                description: "Detailed reports and performance analytics",
                icon: "📈",
              },
              {
                title: "User Management",
                description: "Complete user lifecycle management system",
                icon: "👥",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white/70 rounded-xl border border-white/20 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------Demo Section------------------------------------------ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Try Demo Login
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Experience the system with pre-configured demo accounts
          </p>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Student Demo
                </h3>
                <p className="text-sm text-gray-600 font-mono mb-1">
                  alex.johnson@student.edu
                </p>
                <p className="text-sm text-gray-600 font-mono">password</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Faculty Demo
                </h3>
                <p className="text-sm text-gray-600 font-mono mb-1">
                  michael.brown@faculty.edu
                </p>
                <p className="text-sm text-gray-600 font-mono">password</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Admin Demo</h3>
                <p className="text-sm text-gray-600 font-mono mb-1">
                  jennifer.davis@admin.edu
                </p>
                <p className="text-sm text-gray-600 font-mono">password</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*------------------------------------ Footer----------------------------------------- */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <GraduationCap className="h-8 w-8 text-indigo-400" />
            <span className="text-2xl font-bold">EduManage</span>
          </div>
          <p className="text-gray-400">
            Streamlining education management for the digital age
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
