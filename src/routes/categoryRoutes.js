const express = require("express");
const {
  listCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} = require("../controllers/categoryController");
const { requireAdmin, optionalAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/", optionalAdmin, listCategories);
router.get("/:slug", getCategory);
router.post("/", requireAdmin, createCategory);
router.put("/:id", requireAdmin, updateCategory);
router.delete("/:id", requireAdmin, deleteCategory);

module.exports = router;
