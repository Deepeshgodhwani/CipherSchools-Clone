const dotenv = require("dotenv").config();
const express = require("express");
const connectDb = require("./config/mongoose");
const app = express();
const PORT = 7000;
const cors = require("cors");
const userAccount = require("./router/userAccountRoute");
const userUpdate=require('./router/userUpdate');

connectDb();

app.use(cors());
app.use(express.json());

app.use("/api/userAccount",userAccount );
app.use("/api/userUpdate", userUpdate);

app.listen(PORT, (err) => {
  if (err) {
    console.log("ERROR IN RUNNING SERVER", err);
  }

  console.log("SERVER IS RUNNING SUCCESSFULLY ON PORT : " + PORT);
});
