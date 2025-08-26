import React from "react";
import {
  Users,
  BookOpen,
  Calendar,
  TrendingUp,
  GraduationCap,
  Building,
  FileText,
  AlertTriangle,
} from "lucide-react";
import Card from "../../components/common/Card";
import {
  mockStudents,
  mockFaculty,
  mockCourses,
  mockSubjects,
  mockEvents,
} from "../../data/mockData";

const AdminDashboard = () => {
  const totalUsers = mockStudents.length + mockFaculty.length;

  const recentActivities = [
    { action: "New student registered", user: "John Doe", time: "2 hours ago" },
    { action: "Course updated", user: "Dr. Smith", time: "4 hours ago" },
    { action: "Event created", user: "Admin", time: "6 hours ago" },
  ];

  const systemAlerts = [
    {
      type: "warning",
      message: "Server maintenance scheduled for tonight",
      time: "1 hour ago",
    },
    {
      type: "info",
      message: "New semester registration opens tomorrow",
      time: "2 hours ago",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">
          Welcome to the system administration panel
        </p>
      </div>

      {/*--------------------------------------- Main Stats Grid----------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <GraduationCap className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Students</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockStudents.length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <Building className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Faculty</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockFaculty.length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Courses</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockCourses.length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/*----------------------------------------- Secondary Stats--------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-indigo-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Subjects</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockSubjects.length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-teal-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Events</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockEvents.length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-pink-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">System Usage</p>
              <p className="text-2xl font-bold text-gray-900">94%</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/*------------------------------------ Recent Activities--------------------------------------- */}
        <Card title="Recent Activities" subtitle="Latest system activities">
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div className="flex-grow">
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">by {activity.user}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
            <div className="text-center pt-4">
              <button className="text-blue-600 text-sm hover:text-blue-800">
                View all activities →
              </button>
            </div>
          </div>
        </Card>

        {/*--------------------------------------- System Alerts -------------------------------------*/}
        <Card title="System Alerts" subtitle="Important notifications">
          <div className="space-y-4">
            {systemAlerts.map((alert, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
              >
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div className="flex-grow">
                  <p className="text-sm text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-500">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/*---------------------------------------- Quick Stats-------------------------------------- */}
        <Card title="Department Overview" subtitle="Users by department">
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Computer Science</span>
              <span className="text-gray-600">
                {mockStudents.length} students
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Information Technology</span>
              <span className="text-gray-600">0 students</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Faculty Members</span>
              <span className="text-gray-600">{mockFaculty.length} active</span>
            </div>
          </div>
        </Card>

        {/* -------------------------------Quick Actions---------------------------------- */}
        <Card title="Quick Actions" subtitle="Common administrative tasks">
          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <Users className="h-8 w-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-blue-900">
                Add User
              </span>
            </button>
            <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <BookOpen className="h-8 w-8 text-green-600 mb-2" />
              <span className="text-sm font-medium text-green-900">
                Create Course
              </span>
            </button>
            <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <Calendar className="h-8 w-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-purple-900">
                Schedule Event
              </span>
            </button>
            <button className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
              <TrendingUp className="h-8 w-8 text-orange-600 mb-2" />
              <span className="text-sm font-medium text-orange-900">
                View Reports
              </span>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
