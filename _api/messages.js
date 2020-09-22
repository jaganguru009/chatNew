const express = require("express");
const Message = require("../models/messageModel");
const router = express.Router();
const http = require("http");
const events = require("events");
const emitter = new events.EventEmitter();

const io = require("socket.io")(http);
router.get("/", (req, res) => {
  Message.find({}, (err, msgs) => {
    if (err) {
      res.sendStatus(500);
    }
    res.send(msgs);
  });
});
router.post("/", (req, res) => {
  console.log(`body   ${JSON.stringify(req.body)}`);
  var message = new Message(req.body);
  message
    .save()
    .then(() => {
      console.log("called post");
      emitter.emit("message", req.body);
      res.sendStatus(200);
    })
    .catch((err) => {
      res.send(err.message);
    });
});

module.exports = router;
module.exports.emitter = emitter;
