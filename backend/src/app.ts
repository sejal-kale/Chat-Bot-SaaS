import express from "express";
import { config } from "dotenv";
import morgan from "morgan"
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";

const app = express();
config();

// midddleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser(process.env.COOKIE_SECRET))

app.use('/api/v1',appRouter);



export default app;