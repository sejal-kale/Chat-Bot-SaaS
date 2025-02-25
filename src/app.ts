import express from "express";
import { config } from "dotenv";
import morgan from "morgan"
import appRouter from "./routes/index.js";

const app = express();

// midddleware
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1',appRouter);

app.get('/',(req,res)=>{
  console.log("i got youu")
  res.send("Hii i am get")
})


export default app;