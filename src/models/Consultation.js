const mongoose = require("mongoose");

const consultationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    city: { type: String, default: "" },
    property: { type: String, default: "" },
    size: { type: String, default: "" },
    budget: { type: String, default: "" },
    message: { type: String, default: "" },
    source: { type: String, default: "" }, // e.g. design slug the enquiry came from
    status: { type: String, enum: ["new", "contacted", "closed"], default: "new" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Consultation", consultationSchema);
