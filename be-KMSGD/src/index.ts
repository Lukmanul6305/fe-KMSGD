import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connection } from "./database/connection";
import globalRouter from "./routes/route";

dotenv.config();

const app = express();

app.disable("x-powered-by");

app.use(
  cors({
    origin: (process.env.CORS_ORIGIN ?? "http://localhost:5173").split(",").map((origin) => origin.trim()),
    credentials: true,
  }),
);

app.use((_, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

app.use(express.json({ limit: "1mb" }));

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
