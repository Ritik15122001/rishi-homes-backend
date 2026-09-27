const Design = require("../models/Design");

async function listDesigns(req, res, next) {
  try {
    const isAdmin = !!req.admin;
    const { category, style, q, featured, trending, editorsPick, limit, page, sort, slugs } = req.query;

    const filter = isAdmin ? {} : { active: true };
    if (category && category !== "All") filter.category = category;
    if (style && style !== "All") filter.style = style;
    if (featured === "true") filter.featured = true;
    if (trending === "true") filter.trending = true;
    if (editorsPick === "true") filter.editorsPick = true;
    if (slugs) filter.slug = { $in: String(slugs).split(",").map((s) => s.trim()) };
    if (q && q.trim()) {
      const rx = new RegExp(q.trim().split(/\s+/).join("|"), "i");
      filter.$or = [
        { title: rx },
        { category: rx },
        { style: rx },
        { palette: rx },
        { desc: rx },
        { materials: rx }
      ];
    }

    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const pageSize = Math.min(Math.max(parseInt(limit, 10) || 100, 1), 200);

    let sortBy = { order: 1, createdAt: 1 };
    if (sort === "recent") sortBy = { createdAt: -1 };

    const [designs, total] = await Promise.all([
      Design.find(filter)
        .sort(sortBy)
        .skip((pageNum - 1) * pageSize)
        .limit(pageSize),
      Design.countDocuments(filter)
    ]);

    res.json({ designs, total, page: pageNum, pageSize });
  } catch (err) {
    next(err);
  }
}

async function getDesign(req, res, next) {
  try {
    const design = await Design.findOne({ slug: req.params.slug, ...(req.admin ? {} : { active: true }) });
    if (!design) {
      res.status(404);
      throw new Error("Design not found");
    }
    const related = await Design.find({
      slug: { $ne: design.slug },
      active: true,
      $or: [{ category: design.category }, { style: design.style }]
    })
      .sort({ order: 1 })
      .limit(4);

    let relatedList = related;
    if (relatedList.length < 4) {
      const extra = await Design.find({
        slug: { $ne: design.slug, $nin: relatedList.map((r) => r.slug) },
        active: true
      }).limit(4 - relatedList.length);
      relatedList = relatedList.concat(extra);
    }

    res.json({ design, related: relatedList });
  } catch (err) {
    next(err);
  }
}

async function getDesignById(req, res, next) {
  try {
    const design = await Design.findById(req.params.id);
    if (!design) {
      res.status(404);
      throw new Error("Design not found");
    }
    res.json({ design });
  } catch (err) {
    next(err);
  }
}

async function createDesign(req, res, next) {
  try {
    const design = await Design.create(req.body);
    res.status(201).json({ design });
  } catch (err) {
    next(err);
  }
}

async function updateDesign(req, res, next) {
  try {
    const design = await Design.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!design) {
      res.status(404);
      throw new Error("Design not found");
    }
    res.json({ design });
  } catch (err) {
    next(err);
  }
}

async function deleteDesign(req, res, next) {
  try {
    const design = await Design.findByIdAndDelete(req.params.id);
    if (!design) {
      res.status(404);
      throw new Error("Design not found");
    }
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}

module.exports = { listDesigns, getDesign, getDesignById, createDesign, updateDesign, deleteDesign };
