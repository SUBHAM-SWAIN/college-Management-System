import React, { useState } from "react";
import {
  Book,
  Search,
  Filter,
  Calendar,
  Clock,
  Download,
  BookOpen,
} from "lucide-react";
import Card from "../../components/common/Card";
import Modal from "../../components/common/Modal";
import { Table, TableRow, TableCell } from "../../components/common/Table";

const StudentLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showReserveModal, setShowReserveModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const [libraryBooks] = useState([
    {
      id: "1",
      title: "Introduction to Algorithms",
      author: "Thomas H. Cormen",
      isbn: "978-0262033848",
      category: "Computer Science",
      availability: "available",
    },
    {
      id: "2",
      title: "Clean Code",
      author: "Robert C. Martin",
      isbn: "978-0132350884",
      category: "Programming",
      availability: "issued",
      issuedTo: "Current User",
      dueDate: "2024-02-15",
    },
    {
      id: "3",
      title: "Design Patterns",
      author: "Gang of Four",
      isbn: "978-0201633612",
      category: "Software Engineering",
      availability: "available",
    },
    {
      id: "4",
      title: "Database System Concepts",
      author: "Abraham Silberschatz",
      isbn: "978-0073523323",
      category: "Database",
      availability: "reserved",
    },
    {
      id: "5",
      title: "Computer Networks",
      author: "Andrew S. Tanenbaum",
      isbn: "978-0132126953",
      category: "Networking",
      availability: "available",
    },
  ]);

  const [borrowedBooks] = useState([
    {
      id: "1",
      bookId: "2",
      title: "Clean Code",
      author: "Robert C. Martin",
      issueDate: "2024-01-15",
      dueDate: "2024-02-15",
      status: "active",
    },
    {
      id: "2",
      bookId: "6",
      title: "JavaScript: The Good Parts",
      author: "Douglas Crockford",
      issueDate: "2024-01-10",
      dueDate: "2024-02-10",
      status: "overdue",
    },
  ]);

  const categories = [
    "all",
    "Computer Science",
    "Programming",
    "Software Engineering",
    "Database",
    "Networking",
  ];

  const filteredBooks = libraryBooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleReserveBook = (book) => {
    setSelectedBook(book);
    setShowReserveModal(true);
  };

  const handleConfirmReservation = () => {
    console.log("Reserving book:", selectedBook?.title);
    setShowReserveModal(false);
    setSelectedBook(null);
  };

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case "available":
        return "bg-green-100 text-green-800";
      case "issued":
        return "bg-yellow-100 text-yellow-800";
      case "reserved":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      case "returned":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalBorrowed = borrowedBooks.filter(
    (book) => book.status !== "returned"
  ).length;
  const overdueBooksCount = borrowedBooks.filter(
    (book) => book.status === "overdue"
  ).length;
  const availableBooksCount = libraryBooks.filter(
    (book) => book.availability === "available"
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Library Management</h1>
        <p className="text-gray-600">
          Browse books, track borrowings, and manage your library account
        </p>
      </div>

      {/*------------------------------------------ Stats ----------------------------------------------*/}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Books Borrowed
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {totalBorrowed}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Overdue</p>
              <p className="text-2xl font-bold text-gray-900">
                {overdueBooksCount}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <Book className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Available Books
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {availableBooksCount}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Reserved</p>
              <p className="text-2xl font-bold text-gray-900">1</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* -----------------------------------Book Search and Catalog ----------------------------------*/}
        <div className="lg:col-span-2">
          <Card title="Book Catalog">
            {/*-------------------------------- Search and Filter --------------------------------------*/}
            <div className="mb-6 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search books by title or author..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center space-x-4">
                <Filter className="h-5 w-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/*------------------------------------ Books Grid ----------------------------------------*/}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {book.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-1">
                        by {book.author}
                      </p>
                      <p className="text-xs text-gray-500">ISBN: {book.isbn}</p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getAvailabilityColor(
                        book.availability
                      )}`}
                    >
                      {book.availability}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {book.category}
                    </span>

                    <div className="space-x-2">
                      {book.availability === "available" && (
                        <button
                          onClick={() => handleReserveBook(book)}
                          className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                        >
                          Reserve
                        </button>
                      )}
                      {book.availability === "issued" &&
                        book.issuedTo === "Current User" &&
                        book.dueDate && (
                          <div className="text-xs text-gray-500">
                            Due: {new Date(book.dueDate).toLocaleDateString()}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/*--------------------------------------- My Books -------------------------------------*/}
        <div>
          <Card title="My Borrowed Books">
            <div className="space-y-4">
              {borrowedBooks.map((book) => (
                <div
                  key={book.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {book.title}
                      </h4>
                      <p className="text-sm text-gray-600">{book.author}</p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                        book.status
                      )}`}
                    >
                      {book.status}
                    </span>
                  </div>

                  <div className="text-xs text-gray-500 space-y-1">
                    <p>
                      Issued: {new Date(book.issueDate).toLocaleDateString()}
                    </p>
                    <p>Due: {new Date(book.dueDate).toLocaleDateString()}</p>
                    {book.status === "overdue" && (
                      <p className="text-red-600 font-medium">
                        Overdue by{" "}
                        {Math.ceil(
                          (Date.now() - new Date(book.dueDate).getTime()) /
                            (1000 * 60 * 60 * 24)
                        )}{" "}
                        days
                      </p>
                    )}
                  </div>

                  <div className="mt-3 flex space-x-2">
                    <button className="flex-1 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors">
                      Renew
                    </button>
                    <button className="flex-1 px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors">
                      Return
                    </button>
                  </div>
                </div>
              ))}

              {borrowedBooks.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Book className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No borrowed books</p>
                </div>
              )}
            </div>
          </Card>

          {/*--------------------------------------- Digital Resources ------------------------------------*/}
          <Card title="Digital Resources" className="mt-6">
            <div className="space-y-3">
              {[
                { name: "IEEE Digital Library", type: "Database" },
                { name: "ACM Digital Library", type: "Database" },
                { name: "Springer eBooks", type: "eBooks" },
                { name: "O'Reilly Learning", type: "Learning Platform" },
              ].map((resource, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{resource.name}</p>
                    <p className="text-sm text-gray-500">{resource.type}</p>
                  </div>
                  <button className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                    <Download className="h-3 w-3" />
                    <span>Access</span>
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* ----------------------------------Reservation Modal --------------------------------------*/}
      <Modal
        isOpen={showReserveModal}
        onClose={() => setShowReserveModal(false)}
        title="Reserve Book"
      >
        <div className="space-y-4">
          {selectedBook && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900">
                {selectedBook.title}
              </h4>
              <p className="text-sm text-gray-600">by {selectedBook.author}</p>
              <p className="text-sm text-gray-500">ISBN: {selectedBook.isbn}</p>
              <p className="text-sm text-gray-500">
                Category: {selectedBook.category}
              </p>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Reservation Policy:</strong> Reserved books are held for 3
              days. Please collect the book within this period, or the
              reservation will be cancelled.
            </p>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setShowReserveModal(false)}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmReservation}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Confirm Reservation
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default StudentLibrary;
