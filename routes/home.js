const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("welcome in CRUD APP");
});

module.exports = router;
