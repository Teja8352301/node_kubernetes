require("dotenv").config();
let express = require("express");
const mongoose = require("mongoose");
let app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./routes")

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// configure the app to use bodyParser()
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.use(router)

const ACTIVE_PORT = process.env.ACTIVE_PORT;

// run express server on port 9000

let mongoConnectionUrl;

if(process.env.MODE === "k8"){
  mongoConnectionUrl = `mongodb://${process.env.ME_CONFIG_MONGODB_AUTH_USERNAME}:${process.env.ME_CONFIG_MONGODB_ADMINPASSWORD}@${process.env.ME_CONFIG_MONGODB_SERVER}/?authSource=admin`
}
else if(process.env.MODE==="production"){
  mongoConnectionUrl = "mongodb://mongodb:mongodb@mongo:27017/?authSource=admin"
}else{
  mongoConnectionUrl = "mongodb://localhost:27017/node-docker?retryWrites=true&w=majority"
}

mongoose
  .connect(
    mongoConnectionUrl
  )
  .then((result) => {
    let server = app.listen(ACTIVE_PORT, function () {
      let port = server.address().port;
      console.log("----mongo connection url-------")
      console.log(mongoConnectionUrl)
      console.log("----mongo connection url-------")
      console.log("Application listening at http://localhost:%s+Teja", port);
    });
  })
  .catch((err) => console.log(err));
