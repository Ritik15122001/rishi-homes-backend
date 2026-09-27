function createUpload(req, res, next) {
  try {
    if (!req.file) {
      res.status(400);
      throw new Error("No file uploaded.");
    }
    const url = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(201).json({ url });
  } catch (err) {
    next(err);
  }
}

module.exports = { createUpload };
