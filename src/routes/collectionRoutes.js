const express = require("express");
const {
  listCollections,
  createCollection,
  updateCollection,
  deleteCollection
} = require("../controllers/collectionController");
const { requireAdmin, optionalAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/", optionalAdmin, listCollections);
router.post("/", requireAdmin, createCollection);
router.put("/:id", requireAdmin, updateCollection);
router.delete("/:id", requireAdmin, deleteCollection);

module.exports = router;
