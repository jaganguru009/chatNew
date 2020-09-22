const mongoose = require("mongoose");
var MessageScema = mongoose.Schema({
  name: String,
  message: String,
});

module.exports = mongoose.model("Message", MessageScema);
