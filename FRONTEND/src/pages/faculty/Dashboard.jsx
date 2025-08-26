import React from "react";
import {
  Users,
  BookOpen,
  Calendar,
  TrendingUp,
  Clock,
  FileText,
} from "lucide-react";
import Card from "../../components/common/Card";
import { mockStudents, mockSubjects } from "../../data/mockData";

const FacultyDashboard = () => {
  const mySubjects = mockSubjects.slice(0, 3);
  const upcomingClasses = [
    { subject: "Data Structures", time: "09:00 AM", students: 45 },
    { subject: "Algorithms", time: "11:00 AM", students: 40 },
    { subject: "Database Systems", time: "02:00 PM", students: 38 },
  ];

  const recentSubmissions = [
    {
      student: "Alex Johnson",
      assignment: "Binary Search Tree Implementation",
      submitted: "2 hours ago",
    },
    {
      student: "Sarah Williams",
      assignment: "Sorting Algorithms Analysis",
      submitted: "5 hours ago",
    },
  ];

  const attendanceStats = {
    totalClasses: 15,
    avgAttendance: 87,
    highAttendance: 12,
    lowAttendance: 3,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Faculty Dashboard</h1>
        <p className="text-gray-600">
          Welcome back! Here's your teaching overview.
        </p>
      </div>

      {/* ---------------------------------------Stats Grid --------------------------------------*/}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">My Subjects</p>
              <p className="text-2xl font-bold text-gray-900">
                {mySubjects.length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Total Students
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {mockStudents.length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Avg Attendance
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {attendanceStats.avgAttendance}%
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Classes Today</p>
              <p className="text-2xl font-bold text-gray-900">
                {upcomingClasses.length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/*---------------------------------- Today's Schedule -------------------------------------*/}
        <Card
          title="Today's Classes"
          subtitle="Your scheduled classes for today"
        >
          <div className="space-y-4">
            {upcomingClasses.map((cls, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-900">{cls.subject}</p>
                    <p className="text-sm text-gray-500">
                      {cls.students} students enrolled
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{cls.time}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/*------------------------------- Recent Submissions ---------------------------------------*/}
        <Card
          title="Recent Submissions"
          subtitle="Latest assignment submissions"
        >
          <div className="space-y-4">
            {recentSubmissions.map((submission, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg"
              >
                <FileText className="h-5 w-5 text-green-600 mt-1" />
                <div className="flex-grow">
                  <p className="font-medium text-gray-900">
                    {submission.student}
                  </p>
                  <p className="text-sm text-gray-600">
                    {submission.assignment}
                  </p>
                  <p className="text-xs text-gray-500">
                    {submission.submitted}
                  </p>
                </div>
                <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                  Review
                </button>
              </div>
            ))}
            <div className="text-center">
              <button className="text-blue-600 text-sm hover:text-blue-800">
                View all submissions →
              </button>
            </div>
          </div>
        </Card>

        {/*--------------------------------- My Subjects--------------------------------- */}
        <Card
          title="My Subjects"
          subtitle="Subjects you're teaching this semester"
        >
          <div className="space-y-3">
            {mySubjects.map((subject) => (
              <div
                key={subject.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">{subject.name}</p>
                  <p className="text-sm text-gray-500">
                    {subject.code} • {subject.credits} credits • Semester{" "}
                    {subject.semester}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors">
                    Attendance
                  </button>
                  <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                    Materials
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/*--------------------------------- Quick Actions---------------------------------- */}
        <Card title="Quick Actions" subtitle="Common tasks you can perform">
          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <Users className="h-8 w-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-blue-900">
                Mark Attendance
              </span>
            </button>
            <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <FileText className="h-8 w-8 text-green-600 mb-2" />
              <span className="text-sm font-medium text-green-900">
                Upload Materials
              </span>
            </button>
            <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <TrendingUp className="h-8 w-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-purple-900">
                Grade Assignments
              </span>
            </button>
            <button className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
              <Calendar className="h-8 w-8 text-orange-600 mb-2" />
              <span className="text-sm font-medium text-orange-900">
                Schedule Event
              </span>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FacultyDashboard;
