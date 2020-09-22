const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const validate = require("./middlewares/requestValidator").validate;
const PORT = process.env.PORT || 3000;

const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
try {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  //app.all("*", validate);
  app.use("/api", validate, require("./routes/routes"));
  const emitter = require("./_api/messages")(emitter);
  emitter.on("message", (message) => {
    console.log(`EMiiter response ${JSON.stringify(message)} `);
    io.emit();
  });
} catch (e) {
  console.log("Eror occucered " + e.message);
}

var dbURL =
  "mongodb+srv://reset123:reset123@jjmongo.siabv.mongodb.net/localDB?retryWrites=true&w=majority";

//commented code using callbacks
/*
app.get("/messages", (req, res) => {
  Message.find({}, (err, msgs) => {
    if (err) {
      res.sendStatus(500);
    }
    res.send(msgs);
  });
});*/
/*app.post("/messages", (req, res) => {
  var message = new Message(req.body);
  message.save(message, (err) => {
    if (err) {
      res.sendStatus(500);
    }
    console.log("called post");
    io.emit("message", req.body);
    res.sendStatus(200);
  });
});*/

app.use(express.static(__dirname));
mongoose.connect(
  dbURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) console.log(`Error while connecting DB ${err}`);
  }
);
http.listen(3000);
io.on("connection", (socket) => {
  console.log("User connected...");
});
