// routes/materialRoutes.js
import express from "express";
import multer from "multer";
import {
  getMaterials,
  uploadMaterial,
  deleteMaterial,
  downloadMaterial,
} from "../../controllers/faculity/materialController.js";

const router = express.Router();

// File upload configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Routes
router.get("/", getMaterials);                // Get all materials
router.post("/", upload.single("file"), uploadMaterial); // Upload new material
router.delete("/:id", deleteMaterial);       // Delete material
router.get("/download/:id", downloadMaterial); // Download file

export default router;
