import express from "express";
import dotenv from "dotenv";

const app = express();

const HOST = process.env.HOST;
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is running ${HOST}:${PORT}`);
});