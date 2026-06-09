import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connection } from "./database/connection";
import globalRouter from "./routes/route";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

const PORT = process.env.PORT ?? 3000;
const HOST = process.env.HOST;

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server Running ");
});

app.use("/api", globalRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${HOST}:${PORT}`);
  connection();
});
