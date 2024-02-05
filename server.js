const express = require("express");
const { planRouter } = require("./router/plan.router");

const app = express();
const port = process.env.PORT || 3000;
module.exports = app;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/plans", planRouter);
app.all("*", (req, res) => res.status(404).json("Not Found"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});