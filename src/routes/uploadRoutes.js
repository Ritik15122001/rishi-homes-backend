const express = require("express");
const { upload } = require("../middleware/upload");
const { requireAdmin } = require("../middleware/auth");
const { createUpload } = require("../controllers/uploadController");

const router = express.Router();

router.post("/", requireAdmin, upload.single("file"), createUpload);

module.exports = router;
