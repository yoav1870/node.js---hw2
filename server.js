const express = require("express");
const logger = require("morgan");
const fs = require("fs");
const path = require("path");
const { planRouter } = require("./router/plan.router");
const { NotFoundUrlError } = require("./errors/errors");
const AllLogs = fs.createWriteStream(path.join(__dirname, "logs.log"), {
  flags: "a",
});
const app = express();
const port = process.env.PORT || 3000;
module.exports = app;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  logger("common", {
    stream: AllLogs,
  })
);
app.use("/api/plans", planRouter);
app.use((req, res, next) => {
  next(new NotFoundUrlError());
});
app.use((err, req, res) => {
  res.status(err?.status || 500).json(err.message);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
