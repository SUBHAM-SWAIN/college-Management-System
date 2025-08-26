import { useState } from "react";
import { FileText, Download, Upload, Calendar, Clock } from "lucide-react";
import Card from "../../components/common/Card";
import Modal from "../../components/common/Modal";
import { Table, TableRow, TableCell } from "../../components/common/Table";
import { mockAssignments, mockSubjects } from "../../data/mockData";

const StudentAssignments = () => {
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [file, setFile] = useState(null);

  const handleSubmissionClick = (assignment) => {
    setSelectedAssignment(assignment);
    setShowSubmissionModal(true);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    console.log(
      "Submitting assignment:",
      selectedAssignment.id,
      "with file:",
      file
    );
    setShowSubmissionModal(false);
    setFile(null);
  };

  const getSubjectName = (subjectId) => {
    const subject = mockSubjects.find((s) => s.id === subjectId);
    return subject ? subject.name : "Unknown Subject";
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Assignments & Notes
        </h1>
        <p className="text-gray-600">
          Submit assignments and download study materials
        </p>
      </div>

      {/*------------------------------------------------- Stats----------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Total Assignments
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {mockAssignments.length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-gray-900">2</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <Upload className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Submitted</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Overdue</p>
              <p className="text-2xl font-bold text-gray-900">1</p>
            </div>
          </div>
        </Card>
      </div>

      {/*----------------------------------------- Assignments Table ------------------------------------*/}
      <Card title="Current Assignments">
        <Table
          headers={["Assignment", "Subject", "Due Date", "Status", "Actions"]}
        >
          {mockAssignments.map((assignment) => (
            <TableRow key={assignment.id}>
              <TableCell>
                <div>
                  <p className="font-medium text-gray-900">
                    {assignment.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {assignment.description}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  {getSubjectName(assignment.subjectId)}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span
                    className={
                      isOverdue(assignment.dueDate)
                        ? "text-red-600"
                        : "text-gray-900"
                    }
                  >
                    {new Date(assignment.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                {isOverdue(assignment.dueDate) ? (
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                    Overdue
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                    Pending
                  </span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleSubmissionClick(assignment)}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                  >
                    Submit
                  </button>
                  {assignment.fileUrl && (
                    <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors flex items-center space-x-1">
                      <Download className="h-3 w-3" />
                      <span>Download</span>
                    </button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </Card>

      {/*----------------------------------- Notes and Materials---------------------------------- */}
      <Card title="Study Materials & Notes">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockSubjects.map((subject) => (
            <div
              key={subject.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900">{subject.name}</h3>
                <FileText className="h-5 w-5 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500 mb-3">
                Subject Code: {subject.code}
              </p>
              <div className="space-y-2">
                <button className="w-full px-3 py-2 bg-blue-50 text-blue-700 text-sm rounded hover:bg-blue-100 transition-colors flex items-center justify-center space-x-1">
                  <Download className="h-3 w-3" />
                  <span>Lecture Notes</span>
                </button>
                <button className="w-full px-3 py-2 bg-green-50 text-green-700 text-sm rounded hover:bg-green-100 transition-colors flex items-center justify-center space-x-1">
                  <Download className="h-3 w-3" />
                  <span>Reference Materials</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/*------------------------------- Submission Modal------------------------------- */}
      <Modal
        isOpen={showSubmissionModal}
        onClose={() => setShowSubmissionModal(false)}
        title="Submit Assignment"
      >
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900">
              {selectedAssignment?.title}
            </h4>
            <p className="text-sm text-gray-600">
              {selectedAssignment?.description}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload File
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.txt"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <p className="text-xs text-gray-500 mt-1">
              Accepted formats: PDF, DOC, DOCX, TXT (Max size: 10MB)
            </p>
          </div>

          {file && (
            <div className="p-3 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-700">
                Selected file: <span className="font-medium">{file.name}</span>
              </p>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setShowSubmissionModal(false)}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!file}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Submit Assignment
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default StudentAssignments;
