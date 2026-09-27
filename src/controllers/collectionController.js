const Collection = require("../models/Collection");

async function listCollections(req, res, next) {
  try {
    const isAdmin = !!req.admin;
    const filter = isAdmin ? {} : { active: true };
    const collections = await Collection.find(filter).sort({ order: 1, createdAt: 1 });
    res.json({ collections });
  } catch (err) {
    next(err);
  }
}

async function createCollection(req, res, next) {
  try {
    const collection = await Collection.create(req.body);
    res.status(201).json({ collection });
  } catch (err) {
    next(err);
  }
}

async function updateCollection(req, res, next) {
  try {
    const collection = await Collection.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!collection) {
      res.status(404);
      throw new Error("Collection not found");
    }
    res.json({ collection });
  } catch (err) {
    next(err);
  }
}

async function deleteCollection(req, res, next) {
  try {
    const collection = await Collection.findByIdAndDelete(req.params.id);
    if (!collection) {
      res.status(404);
      throw new Error("Collection not found");
    }
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}

module.exports = { listCollections, createCollection, updateCollection, deleteCollection };
