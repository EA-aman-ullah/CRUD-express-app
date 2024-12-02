require("express-async-errors");
const error = require("./middleware/error");
const mongoose = require("mongoose");
const users = require("./routes/users");
const cors = require("cors");
const express = require("express");
const app = express();

mongoose
  .connect("mongodb://localhost/exercise-crud")
  .then(() => console.log("Connected to MongoDb..."))
  .catch((err) => console.log("Could not connect to MongoDb..." + err));

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use("/api/users", users);
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));
