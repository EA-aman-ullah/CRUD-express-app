const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const home = require("./routes/home");
const user = require("./routes/user");
const app = express();

mongoose
  .connect("mongodb://localhost/exercise-crud")
  .then(() => console.log("Connected to MongoDB...."))
  .catch((err) => console.log("Could not Connect to MongoDB", err));

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use("/", home);
app.use("/user", user);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));
