require("dotenv").config();
let express = require("express");
let app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

const ACTIVE_PORT = process.env.ACTIVE_PORT;

// run express server on port 9000
mongoose
  .connect(
    "mongodb+srv://Teja:Teja%408352@cluster.g8ppzhd.mongodb.net/node-docker?retryWrites=true&w=majority"
  )
  .then((result) => {
    let server = app.listen(ACTIVE_PORT, function () {
      let port = server.address().port;
      console.log("Application listening at http://localhost:%s", port);
    });
  })
  .catch((err) => console.log(err));
