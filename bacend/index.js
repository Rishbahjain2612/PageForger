const express = require("express");
const app = express();
const db = require("./config/db");
const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use("/api/users", userRoutes);
app.listen(process.env.port, () => {
  console.log(`server is running on ${process.env.port}`);
});
