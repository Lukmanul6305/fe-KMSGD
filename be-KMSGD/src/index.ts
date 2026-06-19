import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connection } from "./database/connection";
import globalRouter from "./routes/route";
import { PORT, HOST, CORS_ORIGIN } from "./config/environment";

const app = express();

app.disable("x-powered-by");

app.use(
  cors({
    origin: CORS_ORIGIN.split(",").map((origin) => origin.trim()),
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

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server Running ");
});

app.use("/api", globalRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${HOST}:${PORT}`);
  connection();
});
