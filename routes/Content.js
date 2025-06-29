import express from "express";
import Content from "../model/Content";

const router = express.Router();

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
};

// Apply authentication middleware to all routes
router.use(isAuthenticated);

// Get all content for the authenticated user
router.get("/", async (req, res) => {
  try {
    const content = await Content.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get content by ID
router.get("/:id", async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content || content.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new content
router.post("/", async (req, res) => {
  try {
    const content = new Content({
      ...req.body,
      user: req.user._id, // Assuming req.user is set by authentication middleware
    });
    await content.save();
    res.status(201).json(content);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update content by ID
router.put("/:id", async (req, res) => {
  try {
    const content = await Content.findByIdAndUpdate(
      req.params.id,
      { ...req.body, user: req.user._id }, // Ensure the user ID is set
      { new: true, runValidators: true }
    );
    if (!content || content.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.json(content);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete content by ID
router.delete("/:id", async (req, res) => {
  try {
    const content = await Content.findByIdAndDelete(req.params.id);
    if (!content || content.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.json({ message: "Content deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
