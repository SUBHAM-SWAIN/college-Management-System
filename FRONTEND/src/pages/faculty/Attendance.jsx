import React, { useState } from "react";
import { Calendar, Users, CheckCircle, XCircle, Clock } from "lucide-react";
import Card from "../../components/common/Card";
import { Table, TableRow, TableCell } from "../../components/common/Table";
import { mockStudents, mockSubjects } from "../../data/mockData";

const FacultyAttendance = () => {
  const [selectedSubject, setSelectedSubject] = useState(mockSubjects[0].id);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [attendance, setAttendance] = useState(
    mockStudents.map((student) => ({
      studentId: student.id,
      status: "present",
    }))
  );

  const handleAttendanceChange = (studentId, status) => {
    setAttendance((prev) =>
      prev.map((record) =>
        record.studentId === studentId ? { ...record, status } : record
      )
    );
  };

  const handleSubmitAttendance = () => {
    console.log("Submitting attendance for:", {
      subjectId: selectedSubject,
      date: selectedDate,
      attendance,
    });
    alert("Attendance saved successfully!");
  };

  const getSelectedSubject = () =>
    mockSubjects.find((s) => s.id === selectedSubject);
  const presentCount = attendance.filter((a) => a.status === "present").length;
  const absentCount = attendance.filter((a) => a.status === "absent").length;
  const lateCount = attendance.filter((a) => a.status === "late").length;
  const attendancePercentage = Math.round(
    (presentCount / attendance.length) * 100
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mark Attendance</h1>
        <p className="text-gray-600">
          Record student attendance for your classes
        </p>
      </div>

      {/* ---------------------------------------Controls------------------------------------------ */}
      <Card title="Class Details">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {mockSubjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name} ({subject.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={handleSubmitAttendance}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Save Attendance
            </button>
          </div>
        </div>
      </Card>

      {/*------------------------------------------ Stats ----------------------------------------*/}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Total Students
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {attendance.length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Present</p>
              <p className="text-2xl font-bold text-gray-900">{presentCount}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <XCircle className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Absent</p>
              <p className="text-2xl font-bold text-gray-900">{absentCount}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Late</p>
              <p className="text-2xl font-bold text-gray-900">{lateCount}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* ---------------------------------Attendance Summary ------------------------------------*/}
      <Card
        title="Today's Attendance Summary"
        subtitle={`${getSelectedSubject()?.name} - ${new Date(
          selectedDate
        ).toLocaleDateString()}`}
      >
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Attendance Rate</span>
            <span className="text-sm text-gray-600">
              {attendancePercentage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${attendancePercentage}%` }}
            />
          </div>
        </div>
      </Card>

      {/* --------------------------------Student Attendance Table -------------------------------*/}
      <Card title="Mark Student Attendance">
        <Table
          headers={["Student", "Student ID", "Attendance Status", "Actions"]}
        >
          {mockStudents.map((student) => {
            const studentAttendance = attendance.find(
              (a) => a.studentId === student.id
            );
            return (
              <TableRow key={student.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    {student.avatar ? (
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <Users className="h-4 w-4 text-gray-400" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-gray-900">
                        {student.name}
                      </p>
                      <p className="text-sm text-gray-500">{student.course}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-mono text-sm">{student.studentId}</span>
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${
                      studentAttendance?.status === "present"
                        ? "bg-green-100 text-green-800"
                        : studentAttendance?.status === "late"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {studentAttendance?.status || "present"}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <button
                      onClick={() =>
                        handleAttendanceChange(student.id, "present")
                      }
                      className={`px-3 py-1 text-sm rounded transition-colors ${
                        studentAttendance?.status === "present"
                          ? "bg-green-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-green-100"
                      }`}
                    >
                      Present
                    </button>
                    <button
                      onClick={() => handleAttendanceChange(student.id, "late")}
                      className={`px-3 py-1 text-sm rounded transition-colors ${
                        studentAttendance?.status === "late"
                          ? "bg-yellow-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-yellow-100"
                      }`}
                    >
                      Late
                    </button>
                    <button
                      onClick={() =>
                        handleAttendanceChange(student.id, "absent")
                      }
                      className={`px-3 py-1 text-sm rounded transition-colors ${
                        studentAttendance?.status === "absent"
                          ? "bg-red-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-red-100"
                      }`}
                    >
                      Absent
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </Table>
      </Card>
    </div>
  );
};

export default FacultyAttendance;
