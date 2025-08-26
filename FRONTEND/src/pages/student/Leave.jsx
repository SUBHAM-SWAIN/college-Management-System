import { useState } from "react";
import {
  Calendar,
  Clock,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import Card from "../../components/common/Card";
import Modal from "../../components/common/Modal";
import { Table, TableRow, TableCell } from "../../components/common/Table";

const StudentLeave = () => {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: "1",
      type: "Medical Leave",
      startDate: "2024-01-20",
      endDate: "2024-01-22",
      reason: "Fever and flu symptoms",
      status: "approved",
      submittedAt: "2024-01-18",
    },
    {
      id: "2",
      type: "Personal Leave",
      startDate: "2024-02-05",
      endDate: "2024-02-05",
      reason: "Family function",
      status: "pending",
      submittedAt: "2024-01-30",
    },
  ]);

  const [formData, setFormData] = useState({
    type: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRequest = {
      id: (leaveRequests.length + 1).toString(),
      ...formData,
      status: "pending",
      submittedAt: new Date().toISOString().split("T")[0],
    };
    setLeaveRequests([...leaveRequests, newRequest]);
    setFormData({ type: "", startDate: "", endDate: "", reason: "" });
    setShowRequestModal(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-600" />;
      case "pending":
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const approvedRequests = leaveRequests.filter(
    (req) => req.status === "approved"
  ).length;
  const pendingRequests = leaveRequests.filter(
    (req) => req.status === "pending"
  ).length;
  const rejectedRequests = leaveRequests.filter(
    (req) => req.status === "rejected"
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leave Requests</h1>
          <p className="text-gray-600">Manage your leave applications</p>
        </div>
        <button
          onClick={() => setShowRequestModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <FileText className="h-4 w-4" />
          <span>Request Leave</span>
        </button>
      </div>

      {/* -----------------------------------------Stats--------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Total Requests
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {leaveRequests.length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Approved</p>
              <p className="text-2xl font-bold text-gray-900">
                {approvedRequests}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <AlertCircle className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-gray-900">
                {pendingRequests}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <XCircle className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Rejected</p>
              <p className="text-2xl font-bold text-gray-900">
                {rejectedRequests}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* -------------------------------Leave Requests Table -------------------------------*/}
      <Card title="Your Leave Requests">
        <Table
          headers={[
            "Type",
            "Dates",
            "Duration",
            "Reason",
            "Status",
            "Submitted",
          ]}
        >
          {leaveRequests.map((request) => {
            const startDate = new Date(request.startDate);
            const endDate = new Date(request.endDate);
            const duration =
              Math.ceil(
                (endDate.getTime() - startDate.getTime()) /
                  (1000 * 60 * 60 * 24)
              ) + 1;

            return (
              <TableRow key={request.id}>
                <TableCell>
                  <span className="font-medium text-gray-900">
                    {request.type}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{startDate.toLocaleDateString()}</div>
                    {request.startDate !== request.endDate && (
                      <div className="text-gray-500">
                        to {endDate.toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-gray-900">
                    {duration} day{duration > 1 ? "s" : ""}
                  </span>
                </TableCell>
                <TableCell>
                  <p className="text-sm text-gray-600 max-w-xs">
                    {request.reason}
                  </p>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(request.status)}
                    <span
                      className={`px-2 py-1 text-xs rounded-full capitalize ${getStatusColor(
                        request.status
                      )}`}
                    >
                      {request.status}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-gray-500">
                    {new Date(request.submittedAt).toLocaleDateString()}
                  </span>
                </TableCell>
              </TableRow>
            );
          })}
        </Table>
      </Card>

      {/*---------------------------------- Request Leave Modal --------------------------*/}
      <Modal
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        title="Request Leave"
        className="sm:max-w-md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Leave Type
            </label>
            <select
              name="type"
              required
              value={formData.type}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select leave type</option>
              <option value="Medical Leave">Medical Leave</option>
              <option value="Personal Leave">Personal Leave</option>
              <option value="Emergency Leave">Emergency Leave</option>
              <option value="Family Leave">Family Leave</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                required
                value={formData.startDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                required
                value={formData.endDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason for Leave
            </label>
            <textarea
              name="reason"
              required
              rows={3}
              value={formData.reason}
              onChange={handleInputChange}
              placeholder="Please provide a reason for your leave request..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setShowRequestModal(false)}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Submit Request
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default StudentLeave;
