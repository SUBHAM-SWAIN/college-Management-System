import React, { useState } from "react";
import { Calendar, MapPin, Clock, Users, Star } from "lucide-react";
import Card from "../../components/common/Card";
import Modal from "../../components/common/Modal";
import { mockEvents } from "../../data/mockData";

const StudentEvents = () => {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState(["1"]);

  const handleRegisterClick = (event) => {
    setSelectedEvent(event);
    setShowRegistrationModal(true);
  };

  const handleRegistration = () => {
    setRegisteredEvents([...registeredEvents, selectedEvent.id]);
    setShowRegistrationModal(false);
  };

  const getEventTypeColor = (type) => {
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

  const isEventFull = (event) => {
    return (
      event.maxParticipants && event.registeredCount >= event.maxParticipants
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Events & Workshops</h1>
        <p className="text-gray-600">
          Discover and register for upcoming events
        </p>
      </div>

      {/*------------------------------------------- Stats ----------------------------------------*/}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Events</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockEvents.length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <Star className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Registered</p>
              <p className="text-2xl font-bold text-gray-900">
                {registeredEvents.length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Workshops</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockEvents.filter((e) => e.type === "workshop").length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">This Month</p>
              <p className="text-2xl font-bold text-gray-900">
                {
                  mockEvents.filter(
                    (e) => new Date(e.date).getMonth() === new Date().getMonth()
                  ).length
                }
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/*------------------------------------- Events Grid -----------------------------------------*/}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockEvents.map((event) => {
          const isRegistered = registeredEvents.includes(event.id);
          const isFull = isEventFull(event);

          return (
            <Card key={event.id} className="h-full">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {event.title}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs rounded-full capitalize ${getEventTypeColor(
                      event.type
                    )}`}
                  >
                    {event.type}
                  </span>
                </div>

                <p className="text-gray-600 text-sm">{event.description}</p>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  {event.maxParticipants && (
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-2" />
                      <span>
                        {event.registeredCount}/{event.maxParticipants}{" "}
                        registered
                      </span>
                    </div>
                  )}
                </div>

                {event.maxParticipants && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Registration Progress</span>
                      <span>
                        {Math.round(
                          (event.registeredCount / event.maxParticipants) * 100
                        )}
                        %
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{
                          width: `${
                            (event.registeredCount / event.maxParticipants) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="pt-4">
                  {isRegistered ? (
                    <button
                      disabled
                      className="w-full px-4 py-2 bg-green-100 text-green-800 rounded-md cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      <Star className="h-4 w-4" />
                      <span>Registered</span>
                    </button>
                  ) : isFull ? (
                    <button
                      disabled
                      className="w-full px-4 py-2 bg-gray-100 text-gray-500 rounded-md cursor-not-allowed"
                    >
                      Event Full
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRegisterClick(event)}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Register Now
                    </button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* -------------------------------Registration Modal-------------------------------- */}
      <Modal
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
        title="Event Registration"
      >
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900">
              {selectedEvent?.title}
            </h4>
            <p className="text-sm text-gray-600 mt-1">
              {selectedEvent?.description}
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
              <span>
                {selectedEvent &&
                  new Date(selectedEvent.date).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-2 text-gray-500" />
              <span>{selectedEvent?.time}</span>
            </div>
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-2 text-gray-500" />
              <span>{selectedEvent?.location}</span>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> By registering for this event, you confirm
              your attendance. Please make sure you're available on the
              scheduled date and time.
            </p>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setShowRegistrationModal(false)}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleRegistration}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Confirm Registration
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default StudentEvents;
