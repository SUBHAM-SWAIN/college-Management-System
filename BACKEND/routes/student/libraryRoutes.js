import express from "express";
import { protect } from "../../middleware/authMiddleware.js";
import {
  getBooks,
  getBorrowedBooks,
  reserveBook,
} from "../../controllers/student/libraryController.js";

const router = express.Router();

router.use(protect);

// Get all books (with optional search & category query)
router.get("/books", getBooks);

// Get borrowed books for student
router.get("/borrowed", getBorrowedBooks);

// Reserve a book
router.post("/reserve/:bookId", reserveBook);

export default router;
