const express = require("express");
const {
  listDesigns,
  getDesign,
  getDesignById,
  createDesign,
  updateDesign,
  deleteDesign
} = require("../controllers/designController");
const { requireAdmin, optionalAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/", optionalAdmin, listDesigns);
router.get("/id/:id", requireAdmin, getDesignById);
router.get("/:slug", optionalAdmin, getDesign);
router.post("/", requireAdmin, createDesign);
router.put("/:id", requireAdmin, updateDesign);
router.delete("/:id", requireAdmin, deleteDesign);

module.exports = router;
