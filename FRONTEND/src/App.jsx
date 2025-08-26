import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Auth Pages
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

// Layout
import DashboardLayout from './components/layout/DashboardLayout';

// Student Pages
import StudentDashboard from './pages/student/Dashboard';
import StudentProfile from './pages/student/Profile';
import StudentAssignments from './pages/student/Assignments';
import StudentEvents from './pages/student/Events';
import StudentLeave from './pages/student/Leave';
import StudentLibrary from './pages/student/Library';

// Faculty Pages
import FacultyDashboard from './pages/faculty/Dashboard';
import FacultyProfile from './pages/faculty/Profile';
import FacultyAttendance from './pages/faculty/Attendance';
import FacultyMaterials from './pages/faculty/Materials';
import FacultyEvents from './pages/faculty/Events';
import FacultySubmissions from './pages/faculty/Submissions';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminProfile from './pages/admin/Profile';
import AdminUsers from './pages/admin/Users';
import AdminCourses from './pages/admin/Courses';
import AdminEvents from './pages/admin/Events';
import AdminReports from './pages/admin/Reports';
import AdminSettings from './pages/admin/Settings';

// Landing Page
import LandingPage from './pages/LandingPage';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  if (!allowedRoles.includes(user?.role || '')) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Auth Routes */}
          <Route path="/student/login" element={<Login role="student" />} />
          <Route path="/faculty/login" element={<Login role="faculty" />} />
          <Route path="/admin/login" element={<Login role="admin" />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Student Routes */}
          <Route path="/student" element={
            <ProtectedRoute allowedRoles={['student']}>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="assignments" element={<StudentAssignments />} />
            <Route path="events" element={<StudentEvents />} />
            <Route path="leave" element={<StudentLeave />} />
            <Route path="library" element={<StudentLibrary />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>
          
          {/* Faculty Routes */}
          <Route path="/faculty" element={
            <ProtectedRoute allowedRoles={['faculty']}>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<FacultyDashboard />} />
            <Route path="profile" element={<FacultyProfile />} />
            <Route path="attendance" element={<FacultyAttendance />} />
            <Route path="materials" element={<FacultyMaterials />} />
            <Route path="events" element={<FacultyEvents />} />
            <Route path="submissions" element={<FacultySubmissions />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>
          
          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="courses" element={<AdminCourses />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
