const Consultation = require("../models/Consultation");

const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const RE_PHONE = /^(\+?\d{1,3}[\s-]?)?[6-9]\d{9}$/;

async function createConsultation(req, res, next) {
  try {
    const { name, phone, email, city, property, size, budget, message, source } = req.body;

    if (!name || String(name).trim().length < 2) {
      res.status(400);
      throw new Error("Please enter a valid name.");
    }
    if (!phone || !RE_PHONE.test(String(phone).replace(/[\s-]/g, ""))) {
      res.status(400);
      throw new Error("Please enter a valid 10-digit mobile number.");
    }
    if (!email || !RE_EMAIL.test(String(email))) {
      res.status(400);
      throw new Error("Please enter a valid email address.");
    }

    const consultation = await Consultation.create({
      name: String(name).trim(),
      phone: String(phone).trim(),
      email: String(email).trim().toLowerCase(),
      city: city || "",
      property: property || "",
      size: size || "",
      budget: budget || "",
      message: message || "",
      source: source || ""
    });

    res.status(201).json({ consultation: { id: consultation._id } });
  } catch (err) {
    next(err);
  }
}

async function listConsultations(req, res, next) {
  try {
    const { status } = req.query;
    const filter = {};
    if (status && status !== "All") filter.status = status;
    const consultations = await Consultation.find(filter).sort({ createdAt: -1 });
    res.json({ consultations });
  } catch (err) {
    next(err);
  }
}

async function updateConsultation(req, res, next) {
  try {
    const consultation = await Consultation.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!consultation) {
      res.status(404);
      throw new Error("Consultation not found");
    }
    res.json({ consultation });
  } catch (err) {
    next(err);
  }
}

async function deleteConsultation(req, res, next) {
  try {
    const consultation = await Consultation.findByIdAndDelete(req.params.id);
    if (!consultation) {
      res.status(404);
      throw new Error("Consultation not found");
    }
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}

module.exports = { createConsultation, listConsultations, updateConsultation, deleteConsultation };
