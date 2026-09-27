const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const { UPLOAD_DIR } = require("./middleware/upload");

const app = express();

// Reflects whatever Origin the request came from (works with any domain,
// including credentialed requests, since Access-Control-Allow-Origin can't
// be a literal "*" when credentials are involved).
app.use(
  cors({
    origin: true,
    credentials: true
  })
);
app.use(express.json({ limit: "2mb" }));
if (process.env.NODE_ENV !== "test") app.use(morgan("dev"));

app.get("/api/health", (req, res) => res.json({ ok: true }));
app.use("/uploads", express.static(UPLOAD_DIR));
app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
