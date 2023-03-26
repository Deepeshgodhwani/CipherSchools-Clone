const dotenv = require("dotenv").config();
const express=require("express");
const connectDb = require("./config/mongoose");
const app=express();
const PORT=7000;
const cors = require("cors");
const userRouter=require("./router/userRoute");
connectDb();


app.use(cors());
app.use(express.json());

app.use('/api/user',userRouter)

app.listen(PORT,(err)=>{
     if(err){
        console.log("ERROR IN RUNNING SERVER",err)   
     } 

     console.log("SERVER IS RUNNING SUCCESSFULLY ON PORT : "+PORT);
})