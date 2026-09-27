const mongoose = require("mongoose");

const colorSchema = new mongoose.Schema(
  { name: { type: String, required: true }, hex: { type: String, required: true } },
  { _id: false }
);

const designSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, index: true }, // Category.name
    style: { type: String, required: true, index: true },
    img: { type: String, required: true },
    palette: { type: String, required: true },
    colors: { type: [colorSchema], default: [] },
    materials: { type: [String], default: [] },
    desc: { type: String, required: true },
    gallery: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
    trending: { type: Boolean, default: false },
    editorsPick: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

designSchema.index({ title: "text", desc: "text", palette: "text", materials: "text" });

module.exports = mongoose.model("Design", designSchema);
