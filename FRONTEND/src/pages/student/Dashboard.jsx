import {
  BookOpen,
  Calendar,
  FileText,
  TrendingUp,
  Clock,
  Users,
} from "lucide-react";
import Card from "../../components/common/Card";
import {
  mockAttendance,
  mockGrades,
  mockSubjects,
  mockEvents,
} from "../../data/mockData";

const StudentDashboard = () => {
  // Calculate attendance percentage
  const totalClasses = mockAttendance.length;
  const presentClasses = mockAttendance.filter(
    (a) => a.status === "present"
  ).length;
  const attendancePercentage =
    totalClasses > 0 ? Math.round((presentClasses / totalClasses) * 100) : 0;

  // Calculate average grade
  const totalGrades = mockGrades.reduce(
    (sum, grade) => sum + (grade.score / grade.maxScore) * 100,
    0
  );
  const averageGrade =
    totalGrades > 0 ? Math.round(totalGrades / mockGrades.length) : 0;

  const upcomingEvents = mockEvents.slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
        <p className="text-gray-600">
          Welcome back! Here's your academic overview.
        </p>
      </div>

      {/*------------------------------------ Stats Grid ---------------------------------------*/}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Average Grade</p>
              <p className="text-2xl font-bold text-gray-900">
                {averageGrade}%
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Clock className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Attendance</p>
              <p className="text-2xl font-bold text-gray-900">
                {attendancePercentage}%
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BookOpen className="h-8 w-8 text-purple-600" />
            </div>
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
            <div className="flex-shrink-0">
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Events</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockEvents.length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ----------------------------------------------Recent Grades -------------------------------------*/}
        <Card title="Recent Grades" subtitle="Your latest assessment results">
          <div className="space-y-4">
            {mockGrades.slice(0, 4).map((grade) => {
              const subject = mockSubjects.find(
                (s) => s.id === grade.subjectId
              );
              const percentage = Math.round(
                (grade.score / grade.maxScore) * 100
              );
              return (
                <div
                  key={grade.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{subject?.name}</p>
                    <p className="text-sm text-gray-500 capitalize">
                      {grade.type}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-gray-900">
                      {percentage}%
                    </p>
                    <p className="text-sm text-gray-500">
                      {grade.score}/{grade.maxScore}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* ------------------------------------------------Upcoming Events----------------------------- */}
        <Card title="Upcoming Events" subtitle="Events you can participate in">
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-shrink-0 mt-1">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-grow">
                  <p className="font-medium text-gray-900">{event.title}</p>
                  <p className="text-sm text-gray-600">{event.description}</p>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <span>{event.date}</span>
                    <span className="mx-2">•</span>
                    <span>{event.time}</span>
                    <span className="mx-2">•</span>
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/*--------------------------------------- Attendance Overview -----------------------------------*/}
        <Card title="Attendance Overview" subtitle="Your attendance by subject">
          <div className="space-y-4">
            {mockSubjects.slice(0, 3).map((subject) => {
              const subjectAttendance = mockAttendance.filter(
                (a) => a.subjectId === subject.id
              );
              const present = subjectAttendance.filter(
                (a) => a.status === "present"
              ).length;
              const total = subjectAttendance.length;
              const percentage =
                total > 0 ? Math.round((present / total) * 100) : 0;

              return (
                <div key={subject.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">
                      {subject.name}
                    </span>
                    <span className="text-sm text-gray-600">{percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        percentage >= 75
                          ? "bg-green-600"
                          : percentage >= 50
                          ? "bg-yellow-600"
                          : "bg-red-600"
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    {present} present out of {total} classes
                  </p>
                </div>
              );
            })}
          </div>
        </Card>

        {/* ----------------------------------Quick Actions---------------------------------- */}
        <Card title="Quick Actions" subtitle="Common tasks you can perform">
          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <FileText className="h-8 w-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-blue-900">
                Submit Assignment
              </span>
            </button>
            <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <Calendar className="h-8 w-8 text-green-600 mb-2" />
              <span className="text-sm font-medium text-green-900">
                Register Event
              </span>
            </button>
            <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <BookOpen className="h-8 w-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-purple-900">
                Library Books
              </span>
            </button>
            <button className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
              <Users className="h-8 w-8 text-orange-600 mb-2" />
              <span className="text-sm font-medium text-orange-900">
                Request Leave
              </span>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
