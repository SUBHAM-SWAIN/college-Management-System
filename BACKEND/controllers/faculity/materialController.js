// controllers/materialController.js
import Material from "../../models/Material.js";
import path from "path";
import fs from "fs";

// Get all materials
export const getMaterials = async (req, res) => {
  try {
    const materials = await Material.find().sort({ uploadDate: -1 });
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ message: "Error fetching materials", error });
  }
};

// Upload new material
export const uploadMaterial = async (req, res) => {
  try {
    const { title, type, subjectId, uploadedBy } = req.body;

    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const fileSize = `${(req.file.size / (1024 * 1024)).toFixed(1)} MB`;

    const material = await Material.create({
      title,
      type,
      subjectId,
      uploadedBy,
      fileName: req.file.filename,
      fileSize,
    });

    res.status(201).json(material);
  } catch (error) {
    res.status(500).json({ message: "Error uploading material", error });
  }
};

// Delete material
export const deleteMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const material = await Material.findById(id);
    if (!material) return res.status(404).json({ message: "Material not found" });

    // Delete file from uploads folder
    const filePath = path.join(process.cwd(), "uploads", material.fileName);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await material.remove();
    res.status(200).json({ message: "Material deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting material", error });
  }
};

// Download material
export const downloadMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const material = await Material.findById(id);
    if (!material) return res.status(404).json({ message: "Material not found" });

    const filePath = path.join(process.cwd(), "uploads", material.fileName);
    if (!fs.existsSync(filePath)) return res.status(404).json({ message: "File not found" });

    // Increment download count
    material.downloads += 1;
    await material.save();

    res.download(filePath, material.fileName);
  } catch (error) {
    res.status(500).json({ message: "Error downloading material", error });
  }
};
