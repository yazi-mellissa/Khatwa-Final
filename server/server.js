/*    UPLOADS    */

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import parent from "./routes/parent.js"
import admin from "./routes/admin.js";
import kindergarten from './routes/Kindergarten.js'
import Pusher from "pusher";
import serverlessHttp from 'serverless-http';

/*       CONFIGURATIONS           */

dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use('/uploads', express.static('uploads'));

app.use(
  cors({origin: ['http://localhost:3000', 'http://192.168.56.1:3000','https://khatwa.onrender.com']})
  );

app.get("/", (req,res )=> {
  res.send("hello world");
});

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: "eu",
  useTLS: true,
});
app.use((req, res, next) => {
  req.pusher = pusher;
  next();
});
app.use("/admin", admin);
app.use("/Parent", parent);
app.use("/kindergarten",kindergarten)



/*    MONGODB SETUP    */


const connect = async ()=>{
try{
  await mongoose.connect(process.env.MONGO_URL);
  console.log(`connection to ${mongoose.connection.name} is successful`);
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
catch (error) {
    console.log(error);
  } 

};
connect();  
export default serverlessHttp(app);
