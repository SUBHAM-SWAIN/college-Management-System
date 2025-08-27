import Book from "../../models/Book.js";
import BorrowedBook from "../../models/BorrowedBook.js";

// @desc    Get all books (with optional search & category filter)
// @route   GET /api/library/books
// @access  Private
export const getBooks = async (req, res) => {
  try {
    const { search, category } = req.query;

    let query = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
      ];
    }
    if (category && category !== "all") {
      query.category = category;
    }

    const books = await Book.find(query).sort({ title: 1 });
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get borrowed books for logged-in student
// @route   GET /api/library/borrowed
// @access  Private
export const getBorrowedBooks = async (req, res) => {
  try {
    const borrowed = await BorrowedBook.find({ studentId: req.user._id })
      .populate("bookId")
      .sort({ dueDate: 1 });

    const result = borrowed.map((b) => ({
      id: b._id,
      bookId: b.bookId._id,
      title: b.bookId.title,
      author: b.bookId.author,
      issueDate: b.issueDate,
      dueDate: b.dueDate,
      status: b.status,
    }));

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Reserve a book
// @route   POST /api/library/reserve/:bookId
// @access  Private
export const reserveBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.availability !== "available")
      return res.status(400).json({ message: "Book not available" });

    book.availability = "reserved";
    book.issuedTo = req.user._id;
    // optional: set reservation due date 3 days ahead
    book.dueDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

    await book.save();

    res.json({ message: "Book reserved successfully", book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
