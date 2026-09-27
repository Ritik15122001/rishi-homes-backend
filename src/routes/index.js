const express = require("express");
const router = express.Router();

router.use("/auth", require("./authRoutes"));
router.use("/categories", require("./categoryRoutes"));
router.use("/designs", require("./designRoutes"));
router.use("/collections", require("./collectionRoutes"));
router.use("/consultations", require("./consultationRoutes"));
router.use("/uploads", require("./uploadRoutes"));

router.get("/meta", (req, res) => {
  res.json({
    styles: ["Modern", "Minimal", "Contemporary", "Scandinavian", "Luxury", "Indian", "Japandi", "Industrial", "Classic"]
  });
});

module.exports = router;
