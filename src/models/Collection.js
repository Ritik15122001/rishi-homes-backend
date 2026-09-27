const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, lowercase: true, trim: true },
    label: { type: String, required: true },
    img: { type: String, required: true },
    cat: { type: String, default: "" }, // reference category name shown as caption
    style: { type: String, default: "" }, // style used for the "view collection" filter link
    text: { type: String, required: true },
    tags: { type: [String], default: [] },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Collection", collectionSchema);
