import React, { useState } from "react";
import { BookOpen, Plus, Edit, Trash2, FileText } from "lucide-react";
import Card from "../../components/common/Card";
import Modal from "../../components/common/Modal";
import { Table, TableRow, TableCell } from "../../components/common/Table";
import { mockCourses, mockSubjects } from "../../data/mockData";

const AdminCourses = () => {
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [activeTab, setActiveTab] = useState("courses");

  const [courseForm, setCourseForm] = useState({
    name: "",
    code: "",
    duration: "",
    description: "",
  });

  const [subjectForm, setSubjectForm] = useState({
    name: "",
    code: "",
    credits: "",
    semester: "",
    courseId: "",
  });

  const [courses, setCourses] = useState(mockCourses);
  const [subjects, setSubjects] = useState(mockSubjects);

  const handleAddCourse = () => {
    if (courseForm.name && courseForm.code) {
      const newCourse = {
        id: (courses.length + 1).toString(),
        ...courseForm,
        duration: parseInt(courseForm.duration),
      };
      setCourses([...courses, newCourse]);
      setCourseForm({ name: "", code: "", duration: "", description: "" });
      setShowCourseModal(false);
    }
  };

  const handleAddSubject = () => {
    if (subjectForm.name && subjectForm.code && subjectForm.courseId) {
      const newSubject = {
        id: (subjects.length + 1).toString(),
        ...subjectForm,
        credits: parseInt(subjectForm.credits),
        semester: parseInt(subjectForm.semester),
      };
      setSubjects([...subjects, newSubject]);
      setSubjectForm({
        name: "",
        code: "",
        credits: "",
        semester: "",
        courseId: "",
      });
      setShowSubjectModal(false);
    }
  };

  const handleDeleteCourse = (courseId) => {
    setCourses(courses.filter((c) => c.id !== courseId));
  };

  const handleDeleteSubject = (subjectId) => {
    setSubjects(subjects.filter((s) => s.id !== subjectId));
  };

  const getCourseName = (courseId) => {
    const course = courses.find((c) => c.id === courseId);
    return course ? course.name : "Unknown Course";
  };

  const totalCourses = courses.length;
  const totalSubjects = subjects.length;
  const avgSubjectsPerCourse =
    totalCourses > 0 ? Math.round(totalSubjects / totalCourses) : 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Course Management
          </h1>
          <p className="text-gray-600">
            Manage courses, subjects, and curriculum
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowCourseModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Course</span>
          </button>
          <button
            onClick={() => setShowSubjectModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Subject</span>
          </button>
        </div>
      </div>

      {/*--------------------------- Stats----------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Courses</p>
              <p className="text-2xl font-bold text-gray-900">{totalCourses}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Total Subjects
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {totalSubjects}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Avg Subjects/Course
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {avgSubjectsPerCourse}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/*-------------------------------------- Tabs --------------------------------------------*/}
      <Card>
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab("courses")}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "courses"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Courses
          </button>
          <button
            onClick={() => setActiveTab("subjects")}
            className={`px-4 py-2 font-medium text-sm ml-8 ${
              activeTab === "subjects"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Subjects
          </button>
        </div>

        {activeTab === "courses" && (
          <Table
            headers={["Course", "Code", "Duration", "Description", "Actions"]}
          >
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                    <span className="font-medium text-gray-900">
                      {course.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                    {course.code}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-gray-600">{course.duration} years</span>
                </TableCell>
                <TableCell>
                  <p className="text-gray-600 text-sm max-w-xs">
                    {course.description}
                  </p>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <button className="p-1 text-blue-600 hover:bg-blue-100 rounded">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteCourse(course.id)}
                      className="p-1 text-red-600 hover:bg-red-100 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        )}

        {activeTab === "subjects" && (
          <Table
            headers={[
              "Subject",
              "Code",
              "Course",
              "Credits",
              "Semester",
              "Actions",
            ]}
          >
            {subjects.map((subject) => (
              <TableRow key={subject.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <FileText className="h-6 w-6 text-green-600" />
                    <span className="font-medium text-gray-900">
                      {subject.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                    {subject.code}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-gray-600">
                    {getCourseName(subject.courseId)}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-gray-600">{subject.credits}</span>
                </TableCell>
                <TableCell>
                  <span className="text-gray-600">Sem {subject.semester}</span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <button className="p-1 text-blue-600 hover:bg-blue-100 rounded">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteSubject(subject.id)}
                      className="p-1 text-red-600 hover:bg-red-100 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        )}
      </Card>

      {/*-------------------------------------- Add Course Modal------------------------------------- */}
      <Modal
        isOpen={showCourseModal}
        onClose={() => setShowCourseModal(false)}
        title="Add New Course"
        className="sm:max-w-md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Name
            </label>
            <input
              type="text"
              value={courseForm.name}
              onChange={(e) =>
                setCourseForm({ ...courseForm, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter course name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Code
              </label>
              <input
                type="text"
                value={courseForm.code}
                onChange={(e) =>
                  setCourseForm({ ...courseForm, code: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., CS"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration (Years)
              </label>
              <input
                type="number"
                value={courseForm.duration}
                onChange={(e) =>
                  setCourseForm({ ...courseForm, duration: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="4"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={courseForm.description}
              onChange={(e) =>
                setCourseForm({ ...courseForm, description: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Course description"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setShowCourseModal(false)}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddCourse}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Course
            </button>
          </div>
        </div>
      </Modal>

      {/* -----------------------------------Add Subject Modal------------------------------- */}
      <Modal
        isOpen={showSubjectModal}
        onClose={() => setShowSubjectModal(false)}
        title="Add New Subject"
        className="sm:max-w-md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject Name
            </label>
            <input
              type="text"
              value={subjectForm.name}
              onChange={(e) =>
                setSubjectForm({ ...subjectForm, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter subject name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject Code
              </label>
              <input
                type="text"
                value={subjectForm.code}
                onChange={(e) =>
                  setSubjectForm({ ...subjectForm, code: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., CS301"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Credits
              </label>
              <input
                type="number"
                value={subjectForm.credits}
                onChange={(e) =>
                  setSubjectForm({ ...subjectForm, credits: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="3"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course
              </label>
              <select
                value={subjectForm.courseId}
                onChange={(e) =>
                  setSubjectForm({ ...subjectForm, courseId: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Semester
              </label>
              <select
                value={subjectForm.semester}
                onChange={(e) =>
                  setSubjectForm({ ...subjectForm, semester: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Semester</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <option key={sem} value={sem}>
                    {sem}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setShowSubjectModal(false)}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddSubject}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Add Subject
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminCourses;
