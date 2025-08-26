import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Plus,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import Card from "../../components/common/Card";
import Modal from "../../components/common/Modal";
import { Table, TableRow, TableCell } from "../../components/common/Table";
import { mockEvents } from "../../data/mockData";

const AdminEvents = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState(
    mockEvents.map((e) => ({
      ...e,
      status: "upcoming",
      createdBy: "Admin",
    }))
  );

  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    type: "workshop",
    maxParticipants: "",
  });

  const handleCreateEvent = () => {
    if (
      eventForm.title &&
      eventForm.date &&
      eventForm.time &&
      eventForm.location
    ) {
      const newEvent = {
        id: (events.length + 1).toString(),
        ...eventForm,
        maxParticipants: parseInt(eventForm.maxParticipants) || undefined,
        registeredCount: 0,
        status: "upcoming",
        createdBy: "Admin",
      };
      setEvents([...events, newEvent]);
      setEventForm({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        type: "workshop",
        maxParticipants: "",
      });
      setShowCreateModal(false);
    }
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter((e) => e.id !== eventId));
  };

  const handleViewEvent = (event) => {
    setSelectedEvent(event);
    setShowViewModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "ongoing":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "workshop":
        return "bg-blue-100 text-blue-800";
      case "seminar":
        return "bg-green-100 text-green-800";
      case "cultural":
        return "bg-purple-100 text-purple-800";
      case "sports":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalEvents = events.length;
  const upcomingEvents = events.filter((e) => e.status === "upcoming").length;
  const totalRegistrations = events.reduce(
    (sum, e) => sum + e.registeredCount,
    0
  );
  const completedEvents = events.filter((e) => e.status === "completed").length;

  return (
    <div className="space-y-6">
      {/* --------------------------------------Header -------------------------------------*/}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Event Management</h1>
          <p className="text-gray-600">
            Create and manage college events and activities
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Create Event</span>
        </button>
      </div>

      {/* --------------------------------------------Stats ------------------------------------*/}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Events</p>
              <p className="text-2xl font-bold text-gray-900">{totalEvents}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Upcoming</p>
              <p className="text-2xl font-bold text-gray-900">
                {upcomingEvents}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Total Registrations
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {totalRegistrations}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-gray-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {completedEvents}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* -------------------------------------Events Table -------------------------------*/}
      <Card title="All Events">
        <Table
          headers={[
            "Event",
            "Date & Time",
            "Location",
            "Type",
            "Registrations",
            "Status",
            "Actions",
          ]}
        >
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell>
                <div>
                  <p className="font-medium text-gray-900">{event.title}</p>
                  <p className="text-sm text-gray-500">{event.description}</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center mt-1">
                    <Clock className="h-4 w-4 mr-1 text-gray-400" />
                    {event.time}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                  {event.location}
                </div>
              </TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 text-xs rounded-full capitalize ${getTypeColor(
                    event.type
                  )}`}
                >
                  {event.type}
                </span>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  <span className="font-medium">{event.registeredCount}</span>
                  {event.maxParticipants && (
                    <span className="text-gray-500">
                      /{event.maxParticipants}
                    </span>
                  )}
                </div>
                {event.maxParticipants && (
                  <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${Math.min(
                          (event.registeredCount / event.maxParticipants) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                )}
              </TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 text-xs rounded-full capitalize ${getStatusColor(
                    event.status
                  )}`}
                >
                  {event.status}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleViewEvent(event)}
                    className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-green-600 hover:bg-green-100 rounded">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="p-1 text-red-600 hover:bg-red-100 rounded"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </Card>

      {/* -----------------------------------Create Event Modal -------------------------------------*/}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Event"
        className="sm:max-w-md"
      >
        {/*------------------------------------- Event Form------------------------------------- */}
        <div className="space-y-4">
          {/*--------------------------------------------- Title ------------------------------------------*/}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Title
            </label>
            <input
              type="text"
              value={eventForm.title}
              onChange={(e) =>
                setEventForm({ ...eventForm, title: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter event title"
            />
          </div>

          {/*------------------------------------ Description ------------------------------------*/}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={eventForm.description}
              onChange={(e) =>
                setEventForm({ ...eventForm, description: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter event description"
            />
          </div>

          {/*---------------------------------- Date & Time --------------------------------*/}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={eventForm.date}
                onChange={(e) =>
                  setEventForm({ ...eventForm, date: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <input
                type="time"
                value={eventForm.time}
                onChange={(e) =>
                  setEventForm({ ...eventForm, time: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/*------------------------------------- Location ----------------------------------*/}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              value={eventForm.location}
              onChange={(e) =>
                setEventForm({ ...eventForm, location: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter event location"
            />
          </div>

          {/*---------------------------- Type & Max Participants --------------------------------*/}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Type
              </label>
              <select
                value={eventForm.type}
                onChange={(e) =>
                  setEventForm({ ...eventForm, type: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="workshop">Workshop</option>
                <option value="seminar">Seminar</option>
                <option value="cultural">Cultural</option>
                <option value="sports">Sports</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Participants
              </label>
              <input
                type="number"
                value={eventForm.maxParticipants}
                onChange={(e) =>
                  setEventForm({
                    ...eventForm,
                    maxParticipants: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Optional"
              />
            </div>
          </div>

          {/*----------------------------- Buttons------------------------------- */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setShowCreateModal(false)}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateEvent}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Create Event
            </button>
          </div>
        </div>
      </Modal>

      {/* ------------------------------------View Event Modal--------------------------------- */}
      <Modal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        title="Event Details"
        className="sm:max-w-lg"
      >
        {selectedEvent && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedEvent.title}
              </h3>
              <p className="text-gray-600 mt-1">{selectedEvent.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Date
                </label>
                <p className="text-gray-900">
                  {new Date(selectedEvent.date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Time
                </label>
                <p className="text-gray-900">{selectedEvent.time}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Location
                </label>
                <p className="text-gray-900">{selectedEvent.location}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Type
                </label>
                <p className="text-gray-900 capitalize">{selectedEvent.type}</p>
              </div>
            </div>

            {selectedEvent.maxParticipants && (
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Registration Progress
                </label>
                <div className="mt-2">
                  <div className="flex justify-between text-sm">
                    <span>
                      {selectedEvent.registeredCount}/
                      {selectedEvent.maxParticipants} registered
                    </span>
                    <span>
                      {Math.round(
                        (selectedEvent.registeredCount /
                          selectedEvent.maxParticipants) *
                          100
                      )}
                      %
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${
                          (selectedEvent.registeredCount /
                            selectedEvent.maxParticipants) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminEvents;
