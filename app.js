const dotenv = require("dotenv").config();
const express = require("express");
const connectDb = require("./config/mongoose");
const app = express();
const PORT = 7000;
const cors = require("cors");
const userAccount = require("./router/userAccountRoute");
const userUpdate=require('./router/userUpdate');
const path=require('path');

connectDb();

app.use(cors());
app.use(express.json());

app.use("/api/userAccount",userAccount );
app.use("/api/userUpdate", userUpdate);




// ------------------------Deployment---------------

const __dirname1 = path.resolve();
 

app.use(express.static(path.join(__dirname1,'frontend','build')))

app.get('/',(req,res)=>{
  res.sendFile(path.resolve(__dirname1,"frontend","build","index.html"))
});

// ------------------------------------------------------


app.all("*", (req, res) => {
  res.status(404).send("404 NOT FOUND");
});






app.listen(PORT, (err) => {
  if (err) {
    console.log("ERROR IN RUNNING SERVER", err);
  }

  console.log("SERVER IS RUNNING SUCCESSFULLY ON PORT : " + PORT);
});
 