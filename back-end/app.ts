import express from "express";
import { config } from "dotenv";
import cors from "cors";
import appRouter from "./src/routes"


config();
const app = express();
const cors_port = process.env.CORS_PORT


app.use(cors({ origin: cors_port, credentials: true }));
app.use(express.json());


app.use("/api", appRouter);


export default app;