const mongoose = require("mongoose");
let URL ="mongodb://deepeshgodwani:deepesh@ac-bsuaopc-shard-00-00.dqej11g.mongodb.net:27017,ac-bsuaopc-shard-00-01.dqej11g.mongodb.net:27017,ac-bsuaopc-shard-00-02.dqej11g.mongodb.net:27017/?ssl=true&replicaSet=atlas-v5zo6j-shard-0&authSource=admin&retryWrites=true&w=majority";
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("CONNECTED TO DATABASE");
  } catch (error) {
    console.log("ERROR IN CONNECTING WITH DATABASE", error);
    process.exit();
  }
};

module.exports = connectDb;
