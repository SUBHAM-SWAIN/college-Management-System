import React, { useState } from "react";
import {
  FileText,
  Download,
  Eye,
  CheckCircle,
  Clock,
  Star,
} from "lucide-react";
import Card from "../../components/common/Card";
import Modal from "../../components/common/Modal";
import { Table, TableRow, TableCell } from "../../components/common/Table";
import {
  mockStudents,
  mockSubjects,
  mockAssignments,
} from "../../data/mockData";

const FacultySubmissions = () => {
  const [selectedAssignment, setSelectedAssignment] = useState(
    mockAssignments[0].id
  );
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [gradeForm, setGradeForm] = useState({ grade: "", feedback: "" });

  const [submissions] = useState([
    {
      id: "1",
      studentId: "1",
      assignmentId: "1",
      submittedAt: "2024-02-10 14:30:00",
      status: "graded",
      grade: 85,
      maxGrade: 100,
      feedback: "Good implementation, but could improve documentation.",
    },
    {
      id: "2",
      studentId: "2",
      assignmentId: "1",
      submittedAt: "2024-02-12 09:15:00",
      status: "submitted",
      maxGrade: 100,
    },
  ]);

  const handleGradeSubmission = (submission) => {
    setSelectedSubmission(submission);
    setGradeForm({
      grade: submission.grade?.toString() || "",
      feedback: submission.feedback || "",
    });
    setShowGradeModal(true);
  };

  const handleSaveGrade = () => {
    console.log(
      "Saving grade for submission:",
      selectedSubmission?.id,
      gradeForm
    );
    setShowGradeModal(false);
    setSelectedSubmission(null);
    setGradeForm({ grade: "", feedback: "" });
  };

  const getStudentName = (studentId) => {
    const student = mockStudents.find((s) => s.id === studentId);
    return student ? student.name : "Unknown Student";
  };

  const getAssignmentTitle = (assignmentId) => {
    const assignment = mockAssignments.find((a) => a.id === assignmentId);
    return assignment ? assignment.title : "Unknown Assignment";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "submitted":
        return "bg-yellow-100 text-yellow-800";
      case "graded":
        return "bg-green-100 text-green-800";
      case "late":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredSubmissions = submissions.filter(
    (s) => s.assignmentId === selectedAssignment
  );
  const totalSubmissions = filteredSubmissions.length;
  const gradedSubmissions = filteredSubmissions.filter(
    (s) => s.status === "graded"
  ).length;
  const avgGrade =
    filteredSubmissions.length > 0
      ? Math.round(
          filteredSubmissions.reduce((sum, s) => sum + (s.grade || 0), 0) /
            filteredSubmissions.filter((s) => s.grade).length
        ) || 0
      : 0;
  const pendingSubmissions = filteredSubmissions.filter(
    (s) => s.status === "submitted"
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Student Submissions
        </h1>
        <p className="text-gray-600">
          Review and grade student assignment submissions
        </p>
      </div>

      {/* --------------------------------Assignment Selector----------------------------------------- */}
      <Card title="Select Assignment">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">
            Assignment:
          </label>
          <select
            value={selectedAssignment}
            onChange={(e) => setSelectedAssignment(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {mockAssignments.map((assignment) => (
              <option key={assignment.id} value={assignment.id}>
                {assignment.title}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/*------------------------------------------------Stats------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Total Submissions
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {totalSubmissions}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Graded</p>
              <p className="text-2xl font-bold text-gray-900">
                {gradedSubmissions}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <Star className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Average Grade</p>
              <p className="text-2xl font-bold text-gray-900">{avgGrade}%</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-gray-900">
                {pendingSubmissions}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/*-------------------------------- Submissions Table --------------------------------------------*/}
      <Card
        title={`Submissions for: ${getAssignmentTitle(selectedAssignment)}`}
      >
        <Table
          headers={["Student", "Submitted At", "Status", "Grade", "Actions"]}
        >
          {filteredSubmissions.map((submission) => (
            <TableRow key={submission.id}>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {getStudentName(submission.studentId)[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {getStudentName(submission.studentId)}
                    </p>
                    <p className="text-sm text-gray-500">
                      ID: {submission.studentId}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  <div>
                    {new Date(submission.submittedAt).toLocaleDateString()}
                  </div>
                  <div className="text-gray-500">
                    {new Date(submission.submittedAt).toLocaleTimeString()}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 text-xs rounded-full capitalize ${getStatusColor(
                    submission.status
                  )}`}
                >
                  {submission.status}
                </span>
              </TableCell>
              <TableCell>
                {submission.grade ? (
                  <div>
                    <span className="font-medium">{submission.grade}</span>
                    <span className="text-gray-500">
                      /{submission.maxGrade}
                    </span>
                    <div className="text-sm text-gray-500">
                      {Math.round(
                        (submission.grade / submission.maxGrade) * 100
                      )}
                      %
                    </div>
                  </div>
                ) : (
                  <span className="text-gray-400">Not graded</span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <button className="flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </button>
                  <button className="flex items-center px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors">
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </button>
                  <button
                    onClick={() => handleGradeSubmission(submission)}
                    className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                  >
                    {submission.grade ? "Edit Grade" : "Grade"}
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </Card>

      {/*------------------------------------ Grade Modal-------------------------------------- */}
      <Modal
        isOpen={showGradeModal}
        onClose={() => setShowGradeModal(false)}
        title="Grade Submission"
      >
        <div className="space-y-4">
          {selectedSubmission && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900">
                {getStudentName(selectedSubmission.studentId)}
              </h4>
              <p className="text-sm text-gray-600">
                {getAssignmentTitle(selectedSubmission.assignmentId)}
              </p>
              <p className="text-sm text-gray-500">
                Submitted:{" "}
                {new Date(selectedSubmission.submittedAt).toLocaleString()}
              </p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Grade (out of {selectedSubmission?.maxGrade})
            </label>
            <input
              type="number"
              max={selectedSubmission?.maxGrade}
              min="0"
              value={gradeForm.grade}
              onChange={(e) =>
                setGradeForm({ ...gradeForm, grade: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter grade"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Feedback
            </label>
            <textarea
              rows={4}
              value={gradeForm.feedback}
              onChange={(e) =>
                setGradeForm({ ...gradeForm, feedback: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Provide feedback for the student..."
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setShowGradeModal(false)}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveGrade}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Save Grade
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FacultySubmissions;
