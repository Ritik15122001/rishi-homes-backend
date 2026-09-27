const Category = require("../models/Category");

async function listCategories(req, res, next) {
  try {
    const isAdmin = !!req.admin;
    const filter = isAdmin ? {} : { active: true };
    const categories = await Category.find(filter).sort({ order: 1, createdAt: 1 });
    res.json({ categories });
  } catch (err) {
    next(err);
  }
}

async function getCategory(req, res, next) {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) {
      res.status(404);
      throw new Error("Category not found");
    }
    res.json({ category });
  } catch (err) {
    next(err);
  }
}

async function createCategory(req, res, next) {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({ category });
  } catch (err) {
    next(err);
  }
}

async function updateCategory(req, res, next) {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!category) {
      res.status(404);
      throw new Error("Category not found");
    }
    res.json({ category });
  } catch (err) {
    next(err);
  }
}

async function deleteCategory(req, res, next) {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      res.status(404);
      throw new Error("Category not found");
    }
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}

module.exports = { listCategories, getCategory, createCategory, updateCategory, deleteCategory };
