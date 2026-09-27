const express = require("express");
const {
  createConsultation,
  listConsultations,
  updateConsultation,
  deleteConsultation
} = require("../controllers/consultationController");
const { requireAdmin } = require("../middleware/auth");

const router = express.Router();

router.post("/", createConsultation);
router.get("/", requireAdmin, listConsultations);
router.put("/:id", requireAdmin, updateConsultation);
router.delete("/:id", requireAdmin, deleteConsultation);

module.exports = router;
