const express = require("express");
const router = express.Router();

router.use("/messages", require("../_api/messages"));

module.exports = router;
