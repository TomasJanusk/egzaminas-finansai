const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const incomeRouter = require("./routes/incomeRoutes");

app.use(express.json());
app.use(cors());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/incomes", incomeRouter);

module.exports = app;