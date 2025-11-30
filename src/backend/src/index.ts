import express from "express";
import { resolve } from "path";
import dotenv from "dotenv";
import steamRouter from "./services/steam";
dotenv.config({ path: resolve(__dirname, "../.env") });

const app = express();
const port = Number(process.env.PORT) || 4000;

// cors
app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/api/steam", steamRouter);
app.get("/", (_, res) => res.json({ ok: true }));

app.listen(port, () => {
  console.log(`Server is running  ${port}`);
});
