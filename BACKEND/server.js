import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./utils/db.js";

import attendanceRoutes from "./routes/student/attendanceRoutes.js";
import gradeRoutes from "./routes/student/gradeRoutes.js";
import subjectRoutes from "./routes/student/subjectRoutes.js";
import eventRoutes from "./routes/student/eventRoutes.js";
import studentRoutes from "./routes/student/studentRoutes.js";
import leaveRoutes from "./routes/student/leaveRoutes.js";
import assignmentRoutes from "./routes/student/assignmentRoutes.js"; // new
import libraryRoutes from "./routes/student/libraryRoutes.js";

//Faculty Routes

import facultyRoutes from "./routes/faculity/facultyRoutes.js";


dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/students", studentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/grades", gradeRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/library", libraryRoutes);

//Faculty Routes
app.use("/api/faculty", facultyRoutes);


// Default route
app.get("/", (req, res) => res.send("API is running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
